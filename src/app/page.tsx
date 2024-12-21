'use client'

import NoteCard from "@/components/cards/noteCard";
import { ArrowRight, CheckCircle, Circle, Plus, Robot } from "@phosphor-icons/react";
import Link from "next/link";


export default function Home() {
  
  return (
    <main>
      <header className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-4 md:px-[8%] px-4 justify-center pt-[60px]">

        <div className="flex flex-col gap-6 md:p-6 p-5 rounded-[12px] border border-gray-500/[0.2] bg-primary text-white">
          <div className="flex justify-between">
            <h1 className="md:text-lg text-md">Today&apos;s work</h1>
            <button><Plus size={16}/></button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center p-1 rounded-full w-full bg-dark/[0.09]">
              <CheckCircle size={24} />
              <p>Design signoff</p>
            </div>
            <div className="flex gap-2 items-center p-1 rounded-full w-full bg-dark/[0.09]">
              <Circle size={24} />
              <p>Development</p>
            </div>
            <div className="flex gap-2 items-center p-1 rounded-full w-full bg-dark/[0.09]">
              <Circle size={24} />
              <p>User Research</p>
            </div>
          </div>

          <p className="opacity-[0.7] text-[12px] flex-1 flex items-end">Sun 20th Dec 2024</p>
        </div>

        <div className="flex flex-col gap-6 md:p-6 p-5 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06]">
          <div className="flex justify-between">
            <h1 className="md:text-lg text-md font-medium">Flashcards</h1>
            <button><Plus size={16}/></button>
          </div>

          <div>
            <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-[12px] h-[150px] border border-gray-500/[0.2] bg-primary text-white">
              <p>What is KISS</p>
            </div>
          </div>
          
          <p className="opacity-[0.7] text-[12px] flex-1 flex items-end">20 Cards</p>

        </div>

        <div className="flex flex-col gap-6 md:p-6 p-5 grid-cols-subgrid md:col-span-1 col-span-2 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06]">
          <div className="flex justify-between">
            <h1 className="md:text-lg text-md font-medium">FlashBot</h1>
            <button><Robot size={16}/></button>
          </div>

          <div className="flex flex-col gap-1">
            <Link href="/" className="flex justify-between gap-2 items-center p-4 rounded w-full bg-gray-200/[0.08] border border-gray-500/[0.1]">
              <p>Create Automatic Flashcards</p>
              <ArrowRight />
            </Link>
            <Link href="/" className="flex justify-between gap-2 items-center p-4 rounded w-full bg-gray-200/[0.08] border border-gray-500/[0.1]">
              <p>Generate note summaries</p>
              <ArrowRight />
            </Link>
            <Link href="/" className="flex justify-between gap-2 items-center p-4 rounded w-full bg-gray-200/[0.08] border border-gray-500/[0.1]">
              <p>Create Quiz from note</p>
              <ArrowRight />
            </Link>
          </div>

          <p className="opacity-[0.7] text-[12px]">3 Resources</p>

        </div>

      </header>

      <section className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-4 md:px-[8%] px-4 justify-center items-start pt-[60px]">
        {
          [
            { id: "0", title: "Design Signoff", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
            { id: "1", title: "Development", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
          ].map(note => (
            <NoteCard key={note.id} note={note} />
          ))
        }

      </section>
      
    </main>
  );
}
