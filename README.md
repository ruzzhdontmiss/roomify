# Roomify

Roomify is an interactive interior-design concept built with Next.js. It pairs a polished studio landing page with a 3D living-room workspace, so a user can explore a room direction and ask an AI design collaborator for practical suggestions.

## What it does

- Presents a responsive interior-studio website with featured projects and a simple design process.
- Opens a 3D living-room editor from **Design my space**.
- Lets users select a sofa, coffee table, floor lamp, or artwork and nudge it in 15 cm increments.
- Offers three editable room palettes and reversible undo/redo position changes.
- Sends the current palette, selected object, and object positions to Verde AI for contextual interior-design guidance.

AI suggestions are advisory: they recommend a next edit rather than changing the room automatically.

## Stack

- Next.js 15 and React 18
- Tailwind CSS
- React Three Fiber, Drei, and Three.js
- Framer Motion
- Zhipu AI (`glm-4.5-flash`) for the design assistant

## Run locally

Prerequisites: Node.js 18.18 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Add a `ZHIPUAI_API_KEY` to `.env.local` to enable the AI assistant; the 3D workspace works without it, but assistant requests will return a configuration message.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `ZHIPUAI_API_KEY` | For AI chat | API key for Zhipu AI. |
| `ZHIPUAI_BASE_URL` | No | API base URL; defaults to the Zhipu Open Platform endpoint. |

Do not commit `.env.local` or a real API key.

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Create production build
npm run start  # Serve production build
```
