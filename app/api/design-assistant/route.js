import { NextResponse } from "next/server"

const systemPrompt = `You are Verde AI, a precise and warm interior design collaborator. Help users make practical, elegant decisions for a living room. Respond in concise, actionable language. Consider circulation, scale, light, material balance, and budget. Do not invent measurements. Treat the supplied room state as the source of truth. Never claim you changed the room yourself; instead, recommend a specific next edit the user can approve.`

export async function POST(request) {
  const apiKey = process.env.ZHIPUAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "ZHIPUAI_API_KEY is not configured. Add it to .env.local and restart the dev server." },
      { status: 503 }
    )
  }

  try {
    const { message, room } = await request.json()
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "A design question is required." }, { status: 400 })
    }

    const baseUrl = (process.env.ZHIPUAI_BASE_URL || "https://open.bigmodel.cn/api/paas/v4/").replace(/\/$/, "")
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
      body: JSON.stringify({
        model: "glm-4.5-flash",
        temperature: 0.65,
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "system", content: `Current room state: ${JSON.stringify(room || {})}` },
          { role: "user", content: message.trim().slice(0, 2000) }
        ]
      })
    })
    clearTimeout(timeout)
    const data = await upstream.json()
    if (!upstream.ok) {
      return NextResponse.json({ error: data?.error?.message || "Zhipu AI could not process this request." }, { status: upstream.status })
    }

    const reply = data?.choices?.[0]?.message?.content
    if (!reply) return NextResponse.json({ error: "Zhipu AI returned an empty response." }, { status: 502 })
    return NextResponse.json({ reply })
  } catch (error) {
    const message = error.name === "AbortError" ? "The design assistant took too long to respond. Please try again." : "The design assistant is temporarily unavailable. Please try again."
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
