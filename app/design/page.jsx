"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { ArrowLeft, Box, ChevronDown, ChevronRight, Command, LampFloor, Layers3, MoreHorizontal, MousePointer2, PanelRight, Plus, Rotate3D, Send, Sparkles, Sofa, Undo2, Redo2, WandSparkles, ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const RoomCanvas = dynamic(() => import("@/components/room-canvas"), { ssr: false })

const palettes = [
  { name: "Sage morning", wall: "#dce9d9", sofa: "#7c947f", dots: ["#dce9d9", "#7c947f", "#c9b397"] },
  { name: "Clay study", wall: "#ead9cc", sofa: "#a7654e", dots: ["#ead9cc", "#a7654e", "#c9b397"] },
  { name: "Cloud room", wall: "#e9e8e1", sofa: "#596a72", dots: ["#e9e8e1", "#596a72", "#bfaa89"] },
]

const layers = [
  ["Sofa", Sofa, "sage"], ["Coffee table", Box, "oak"], ["Floor lamp", LampFloor, "sand"], ["Abstract art", Layers3, "clay"]
]

export default function DesignPage() {
  const [activePalette, setActivePalette] = useState(0)
  const [messages, setMessages] = useState([{ role: "ai", text: "I’ve set up a calm, light-filled living room. The current layout keeps a clear path to the balcony and gives the seating area a strong centre." }])
  const [prompt, setPrompt] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [selected, setSelected] = useState("sofa")
  const [positions, setPositions] = useState({ sofa:{x:0,z:0}, table:{x:0,z:0}, lamp:{x:0,z:0}, art:{x:0,z:0} })
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const palette = palettes[activePalette]
  const labels = { sofa: "Sofa", table: "Coffee table", lamp: "Floor lamp", art: "Abstract art" }
  const moveSelected = (x, z) => { const snapshot = structuredClone(positions); const next = structuredClone(positions); next[selected] = { x: +(next[selected].x + x).toFixed(2), z: +(next[selected].z + z).toFixed(2) }; setHistory(h => [...h, snapshot]); setFuture([]); setPositions(next) }
  const undo = () => { if (!history.length) return; const previous = history[history.length - 1]; setFuture(f => [structuredClone(positions), ...f]); setHistory(h => h.slice(0, -1)); setPositions(previous) }
  const redo = () => { if (!future.length) return; const next = future[0]; setHistory(h => [...h, structuredClone(positions)]); setFuture(f => f.slice(1)); setPositions(next) }
  const send = async () => {
    if (!prompt.trim()) return
    const request = prompt.trim()
    setMessages(m => [...m, { role: "user", text: request }]); setPrompt(""); setIsThinking(true)
    try {
      const response = await fetch("/api/design-assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: request, room: { palette: palette.name, selectedObject: labels[selected], positions } }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setMessages(m => [...m, { role: "ai", text: data.reply }])
    } catch (error) {
      setMessages(m => [...m, { role: "error", text: error.message || "Something went wrong. Please try again." }])
    } finally { setIsThinking(false) }
  }
  return <main className="min-h-screen bg-[#f4f7f1] text-[#1d3024]">
    <header className="flex h-16 items-center justify-between border-b border-[#1d3024]/10 bg-white/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3"><a href="/" className="grid h-9 w-9 place-items-center rounded-full border border-[#1d3024]/10 bg-white transition hover:bg-[#e9f0e8]"><ArrowLeft className="h-4 w-4"/></a><div className="h-6 w-px bg-[#1d3024]/10"/><div><p className="font-display text-lg leading-4 tracking-[-.05em]">The Light House</p><p className="mt-1 text-[9px] font-medium uppercase tracking-[.14em] text-[#6c8b72]">Living room · Draft</p></div></div>
      <div className="hidden items-center gap-1 rounded-full border border-[#1d3024]/10 bg-[#f4f7f1] p-1 sm:flex"><button className="rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm">Design</button><button className="px-3 py-1.5 text-xs text-[#1d3024]/55">Plan</button><button className="px-3 py-1.5 text-xs text-[#1d3024]/55">Present</button></div>
      <div className="flex items-center gap-2"><button onClick={undo} disabled={!history.length} className="hidden h-9 w-9 place-items-center rounded-full border border-[#1d3024]/10 bg-white disabled:opacity-30 md:grid"><Undo2 className="h-3.5 w-3.5"/></button><button onClick={redo} disabled={!future.length} className="hidden h-9 w-9 place-items-center rounded-full border border-[#1d3024]/10 bg-white disabled:opacity-30 md:grid"><Redo2 className="h-3.5 w-3.5"/></button><Button size="sm">Share space</Button></div>
    </header>

    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[280px_minmax(0,1fr)_350px]">
      <aside className="hidden border-r border-[#1d3024]/10 bg-white/65 p-4 lg:block">
        <div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#1d3024]/45">Room layers</p><button className="grid h-7 w-7 place-items-center rounded-md hover:bg-[#e9f0e8]"><Plus className="h-4 w-4"/></button></div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#1d3024]/9 bg-white"><button className="flex w-full items-center gap-2 border-b border-[#1d3024]/7 px-3 py-2.5 text-left text-xs font-medium"><ChevronDown className="h-3.5 w-3.5 text-[#6c8b72]"/><Box className="h-3.5 w-3.5 text-[#6c8b72]"/> Living room</button>{layers.map(([name, Icon, tint]) => { const id = name.toLowerCase().replace("coffee table","table").replace("floor lamp","lamp").replace("abstract art","art"); return <button key={name} onClick={() => setSelected(id)} className={`group flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs transition ${selected === id ? "bg-[#edf4ec] text-[#23412b]" : "hover:bg-[#f2f7f1]"}`}><ChevronRight className="h-3 w-3 text-[#1d3024]/30"/><span className={`grid h-6 w-6 place-items-center rounded-md ${tint === "sage" ? "bg-[#e3eee2] text-[#53745a]" : tint === "clay" ? "bg-[#f1e1d8] text-[#9d6148]" : "bg-[#f4ebdd] text-[#937551]"}`}><Icon className="h-3.5 w-3.5"/></span><span className="flex-1">{name}</span>{selected === id ? <span className="h-1.5 w-1.5 rounded-full bg-[#6c8b72]"/> : <MoreHorizontal className="h-3.5 w-3.5 text-[#1d3024]/20 opacity-0 group-hover:opacity-100"/>}</button>})}</div>
        <div className="mt-4 rounded-xl border border-[#1d3024]/9 bg-[#f8fbf6] p-3"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#6c8b72]">Position · {labels[selected]}</p><div className="mt-3 grid grid-cols-3 gap-1"><span/><button onClick={() => moveSelected(0,-.15)} className="grid h-8 place-items-center rounded-lg bg-white hover:bg-[#e4eee2]"><ArrowUp className="h-3.5 w-3.5"/></button><span/><button onClick={() => moveSelected(-.15,0)} className="grid h-8 place-items-center rounded-lg bg-white hover:bg-[#e4eee2]"><ArrowLeftRight className="h-3.5 w-3.5"/></button><span className="grid h-8 place-items-center rounded-lg bg-[#e4eee2]"><MousePointer2 className="h-3.5 w-3.5 text-[#527158]"/></span><button onClick={() => moveSelected(.15,0)} className="grid h-8 place-items-center rounded-lg bg-white hover:bg-[#e4eee2]"><ArrowLeftRight className="h-3.5 w-3.5 rotate-180"/></button><span/><button onClick={() => moveSelected(0,.15)} className="grid h-8 place-items-center rounded-lg bg-white hover:bg-[#e4eee2]"><ArrowDown className="h-3.5 w-3.5"/></button><span/></div><p className="mt-2 text-[10px] text-[#1d3024]/45">Nudge in 15cm increments</p></div>
        <div className="mt-7"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#1d3024]/45">Room direction</p><div className="mt-3 space-y-2">{palettes.map((item,index) => <button key={item.name} onClick={() => setActivePalette(index)} className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition ${activePalette === index ? "border-[#6c8b72] bg-[#edf4ec]" : "border-[#1d3024]/8 bg-white hover:border-[#1d3024]/20"}`}><span className="flex -space-x-1">{item.dots.map(dot => <i key={dot} className="h-5 w-5 rounded-full border-2 border-white" style={{background:dot}}/>)}</span><span className="text-xs font-medium">{item.name}</span>{activePalette===index&&<span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6c8b72]"/>}</button>)}</div></div>
        <button className="mt-7 flex w-full items-center gap-2 rounded-xl border border-dashed border-[#1d3024]/15 px-3 py-3 text-xs text-[#1d3024]/55 transition hover:bg-white"><Plus className="h-4 w-4"/> Add furniture or object</button>
      </aside>

      <section className="relative flex min-w-0 flex-col bg-[radial-gradient(circle_at_center,#edf5ec_0%,#e1ebdf_48%,#d4e2d2_100%)]">
        <div className="absolute left-4 top-4 z-10 flex gap-2"><button className="grid h-9 w-9 place-items-center rounded-lg border border-white/60 bg-white/70 shadow-sm backdrop-blur"><MousePointer2 className="h-4 w-4"/></button><button className="grid h-9 w-9 place-items-center rounded-lg border border-white/60 bg-white/40 text-[#1d3024]/50 backdrop-blur"><Rotate3D className="h-4 w-4"/></button></div>
        <div className="absolute right-4 top-4 z-10 hidden rounded-full border border-white/60 bg-white/70 px-3 py-2 text-[10px] font-medium uppercase tracking-[.12em] text-[#45614d] shadow-sm backdrop-blur sm:block">3D spatial view</div>
        <div className="min-h-[490px] flex-1 lg:min-h-0"><RoomCanvas wallColor={palette.wall} sofaColor={palette.sofa} selectedObject={selected} objectPositions={positions}/></div>
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-xl border border-white/60 bg-white/75 p-1 shadow-lg backdrop-blur"><button className="rounded-lg bg-[#1d3024] px-3 py-2 text-[10px] font-medium uppercase tracking-[.1em] text-white">Perspective</button><button className="px-3 py-2 text-[10px] font-medium uppercase tracking-[.1em] text-[#1d3024]/55">Top view</button></div>
        <div className="absolute bottom-5 right-5 hidden max-w-[230px] rounded-xl border border-white/60 bg-white/75 p-3 shadow-sm backdrop-blur md:block"><p className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#6c8b72]">Selected · {labels[selected]}</p><p className="mt-1.5 text-xs leading-5 text-[#1d3024]/65">Use the nudge control to reposition this item. Every move is reversible.</p></div>
      </section>

      <aside className="flex min-h-[520px] flex-col border-l border-[#1d3024]/10 bg-white lg:min-h-0">
        <div className="flex items-center justify-between border-b border-[#1d3024]/10 px-5 py-4"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e4eee2] text-[#527158]"><Sparkles className="h-3.5 w-3.5"/></span><div><p className="text-sm font-semibold">Verde AI</p><p className="text-[10px] text-[#6c8b72]">Your design collaborator</p></div></div><PanelRight className="h-4 w-4 text-[#1d3024]/35"/></div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message, i) => <div key={i} className={`max-w-[92%] rounded-2xl px-3.5 py-3 text-xs leading-5 ${message.role === "ai" ? "rounded-tl-sm bg-[#eef4ed] text-[#294131]" : message.role === "error" ? "rounded-tl-sm border border-[#d88e78]/35 bg-[#fdf0ec] text-[#91482f]" : "ml-auto rounded-tr-sm bg-[#1d3024] text-white"}`}>{message.text}</div>)}{isThinking && <div className="flex w-fit items-center gap-2 rounded-2xl rounded-tl-sm bg-[#eef4ed] px-3.5 py-3 text-xs text-[#47654d]"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c8b72] [animation-delay:-.2s]"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c8b72] [animation-delay:-.1s]"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c8b72]"/></span>Verde is thinking</div>}<div className="rounded-xl border border-[#1d3024]/8 bg-[#fafcf9] p-3"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#6c8b72]">Try asking</p><div className="mt-2 flex flex-wrap gap-1.5">{["Make it warmer", "Add storage", "Try a rug"].map(q => <button key={q} onClick={() => setPrompt(q)} className="rounded-full border border-[#1d3024]/10 bg-white px-2.5 py-1.5 text-[10px] text-[#1d3024]/60 transition hover:border-[#6c8b72] hover:text-[#47654d]">{q}</button>)}</div></div></div>
        <div className="border-t border-[#1d3024]/10 p-4"><div className="flex items-end gap-2 rounded-2xl border border-[#1d3024]/12 bg-[#fbfdf9] p-2 focus-within:border-[#6c8b72]"><Command className="mb-1.5 ml-1 h-4 w-4 shrink-0 text-[#6c8b72]"/><textarea disabled={isThinking} value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>{if(e.key === "Enter" && !e.shiftKey){e.preventDefault();send()}}} rows="2" placeholder="Tell me what to change…" className="min-h-[36px] flex-1 resize-none bg-transparent pt-1 text-xs outline-none placeholder:text-[#1d3024]/35 disabled:opacity-50"/><button disabled={isThinking} onClick={send} className="grid h-8 w-8 place-items-center rounded-xl bg-[#1d3024] text-white transition hover:bg-[#48664f] disabled:opacity-50"><Send className="h-3.5 w-3.5"/></button></div><p className="mt-2 text-center text-[9px] text-[#1d3024]/35"><WandSparkles className="mr-1 inline h-3 w-3"/> AI suggestions are editable and reversible</p></div>
      </aside>
    </div>
  </main>
}
