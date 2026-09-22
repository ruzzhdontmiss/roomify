"use client"

import { motion } from "framer-motion"
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Menu, MoveUpRight, Sparkles, X } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"

const RoomCanvas = dynamic(() => import("@/components/room-canvas"), { ssr: false })

const projects = [
  { title: "The Light House", type: "Calm minimalism", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80", cls: "md:col-span-7" },
  { title: "Mango House", type: "Warm modern", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80", cls: "md:col-span-5" },
  { title: "A quiet corner", type: "Designed to linger", image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1000&q=80", cls: "md:col-span-5" },
  { title: "Courtyard home", type: "Softly sculptural", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80", cls: "md:col-span-7" },
]

export default function Home() {
  const [open, setOpen] = useState(false)
  return <main className="overflow-hidden bg-[#f7faf5] text-[#1d3024]">
    <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-10">
      <a className="font-display text-2xl font-semibold tracking-[-.08em]" href="#">verde<span className="ml-0.5 text-[9px] align-top font-sans tracking-normal">®</span></a>
      <div className="hidden items-center gap-8 text-sm text-[#1d3024]/70 md:flex"><a href="#work" className="hover:text-[#1d3024]">Our work</a><a href="#process" className="hover:text-[#1d3024]">How it works</a><a href="#about" className="hover:text-[#1d3024]">About Verde</a></div>
      <div className="hidden md:block"><Button size="sm" onClick={() => window.location.href = "/design"}>Start your project <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></Button></div>
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
      {open && <div className="absolute inset-x-4 top-16 z-20 rounded-3xl border border-[#1d3024]/10 bg-white p-6 shadow-xl md:hidden"><a className="block py-3" href="#work">Our work</a><a className="block py-3" href="#process">How it works</a><Button className="mt-3 w-full">Start your project</Button></div>}
    </nav>

    <section className="relative mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-16 pt-10 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:pb-28 lg:pt-20">
      <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="relative z-10">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7c947f]/25 bg-[#e9f0e8] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[.14em] text-[#46604c]"><Sparkles className="h-3 w-3"/> Room to feel good in</div>
        <h1 className="max-w-[680px] font-display text-[clamp(3.9rem,7.2vw,7.2rem)] leading-[.88] tracking-[-.065em]">Build a home<br/><em className="font-normal text-[#789179]">you can exhale</em> in.</h1>
        <p className="mt-7 max-w-md text-base leading-7 text-[#1d3024]/65">Personal, full-service interiors for people who want their home to work beautifully — and feel unmistakably like them.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Button size="lg" onClick={() => window.location.href = "/design"}>Design my space <ArrowRight className="ml-2 h-4 w-4"/></Button><Button size="lg" variant="outline">See our work <ArrowDownRight className="ml-2 h-4 w-4"/></Button></div>
        <div className="mt-14 flex items-center gap-4"><div className="flex -space-x-3">{["https://i.pravatar.cc/100?img=32","https://i.pravatar.cc/100?img=47","https://i.pravatar.cc/100?img=45"].map(src => <img className="h-9 w-9 rounded-full border-2 border-[#f7faf5]" src={src} key={src}/>)}</div><p className="text-xs leading-4 text-[#1d3024]/55"><b className="font-medium text-[#1d3024]">100+ happy homes</b><br/>across 12 cities</p></div>
      </motion.div>
      <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.9,delay:.12}} className="relative h-[450px] overflow-hidden rounded-[2.25rem] border border-white bg-[#dce9d9] shadow-[0_30px_80px_rgba(45,72,51,.13)] sm:h-[570px]">
        <div className="absolute left-6 top-6 z-10 rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.12em] backdrop-blur">Interactive room study</div>
        <RoomCanvas />
        <div className="absolute bottom-5 left-6 rounded-2xl border border-white/50 bg-white/70 p-3.5 backdrop-blur"><p className="text-[10px] uppercase tracking-[.12em] text-[#1d3024]/50">Mood</p><p className="mt-1 font-display text-lg">Stillness & sun</p></div>
      </motion.div>
    </section>

    <section className="border-y border-[#1d3024]/8 bg-white/50 py-5"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-7 overflow-hidden px-5 text-[11px] font-medium uppercase tracking-[.16em] text-[#1d3024]/45 sm:px-10"><span>Thoughtful planning</span><i className="h-1 w-1 shrink-0 rounded-full bg-[#9aab9b]"/><span>Personal selections</span><i className="h-1 w-1 shrink-0 rounded-full bg-[#9aab9b]"/><span>Finished beautifully</span></div></section>

    <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:py-36"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-[#6c8b72]">Selected work</p><h2 className="mt-4 font-display text-5xl tracking-[-.055em] sm:text-6xl">Everyday, elevated.</h2></div><Button variant="ghost">Browse all spaces <MoveUpRight className="ml-2 h-4 w-4"/></Button></div><div className="grid gap-8 md:grid-cols-12">{projects.map((project, i) => <motion.article initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:i*.08}} className={project.cls} key={project.title}><div className="group relative h-[360px] overflow-hidden rounded-[1.7rem] bg-[#dce9d9] md:h-[440px]"><img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#193022]/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"/><span className="absolute right-5 top-5 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-[#1d3024] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4"/></span></div><div className="flex items-center justify-between px-1 pt-4"><div><h3 className="font-display text-2xl tracking-[-.04em]">{project.title}</h3><p className="mt-1 text-sm text-[#1d3024]/55">{project.type}</p></div><span className="text-sm text-[#1d3024]/40">0{i+1}</span></div></motion.article>)}</div></section>

    <section id="process" className="bg-[#e4eee2] px-5 py-24 sm:px-10 lg:py-32"><div className="mx-auto max-w-[1260px]"><p className="text-center text-xs font-medium uppercase tracking-[.16em] text-[#6c8b72]">Simple by design</p><h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-5xl tracking-[-.055em] sm:text-6xl">Good design begins with a good conversation.</h2><div className="mt-16 grid gap-4 md:grid-cols-3">{[["01","Tell us your story","Share your space, your style and how you want to live."],["02","Watch it take shape","Receive your custom vision, clear plan and every detail."],["03","Come home to it","We bring it all together, so you can just walk in and breathe."]].map(([number,title,copy])=><div key={number} className="group rounded-[1.5rem] border border-[#1d3024]/8 bg-[#f8fbf7] p-7 transition hover:-translate-y-1 hover:shadow-lg"><span className="text-xs font-medium text-[#6c8b72]">{number}</span><h3 className="mt-12 font-display text-3xl tracking-[-.045em]">{title}</h3><p className="mt-3 max-w-[260px] text-sm leading-6 text-[#1d3024]/60">{copy}</p><div className="mt-8 flex h-8 w-8 items-center justify-center rounded-full bg-[#e4eee2] text-[#48664f] transition group-hover:bg-[#1d3024] group-hover:text-white"><ArrowRight className="h-4 w-4"/></div></div>)}</div></div></section>

    <section id="about" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:items-center lg:py-36"><div className="relative"><img className="h-[520px] w-full rounded-[2rem] object-cover" alt="Textured material palette" src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85"/><div className="absolute -bottom-5 -right-2 rounded-2xl border border-[#1d3024]/10 bg-white p-4 shadow-sm sm:right-7"><p className="text-[10px] uppercase tracking-[.13em] text-[#1d3024]/45">We believe in</p><p className="mt-1 font-display text-xl">spaces with soul</p></div></div><div className="lg:pl-14"><p className="text-xs font-medium uppercase tracking-[.16em] text-[#6c8b72]">The verde promise</p><h2 className="mt-5 font-display text-5xl leading-[.94] tracking-[-.055em] sm:text-6xl">A softer way to make a home.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#1d3024]/60">You don't need more choices. You need a clear direction and someone who sees what your home could become. That is what we are here for.</p><div className="mt-8 space-y-3">{["Design that fits real life","A team that handles the details","An experience with room to breathe"].map(text=><div key={text} className="flex items-center gap-3 text-sm"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#dce9d9]"><Check className="h-3 w-3 text-[#48664f]"/></span>{text}</div>)}</div><Button className="mt-9" variant="outline">Meet the studio <ArrowUpRight className="ml-2 h-4 w-4"/></Button></div></section>

    <footer className="mx-3 mb-3 rounded-[2rem] bg-[#1d3024] px-6 py-16 text-[#f7faf5] sm:mx-5 sm:px-10 lg:px-16 lg:py-20"><div className="mx-auto max-w-[1320px]"><p className="text-xs uppercase tracking-[.16em] text-[#b7cbb8]">Have a space in mind?</p><div className="mt-5 flex flex-wrap items-end justify-between gap-8"><h2 className="max-w-3xl font-display text-5xl leading-[.9] tracking-[-.06em] sm:text-7xl">Let's make it <em className="font-normal text-[#b7cbb8]">yours.</em></h2><Button className="bg-[#e4eee2] text-[#1d3024] hover:bg-white">Start a project <ArrowUpRight className="ml-2 h-4 w-4"/></Button></div><div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-5 text-xs text-white/45"><span>© 2025 Verde Studio</span><span>Instagram &nbsp;&nbsp; Pinterest &nbsp;&nbsp; Contact</span></div></div></footer>
  </main>
}
