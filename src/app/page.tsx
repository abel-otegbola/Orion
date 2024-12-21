'use client'

import Button from "@/components/button/button";
import NoteCard from "@/components/cards/noteCard";
import Search from "@/components/search/search";
import { CheckCircle, Circle, Plus } from "@phosphor-icons/react";
import { CircleHalf } from "@phosphor-icons/react/dist/ssr";


export default function Home() {
  
  return (
    <main className="grid md:grid-cols-2 md:px-[8%] px-4 w-full gap-6">
      <div className="md:sticky top-0 left-0 md:h-screen pt-[60px]">
        <Search placeholder="Search notes, todos and flashcards" className="bg-gray-500/[0.05] border-gray-500/[0.1]" />

        <div className="flex gap-6 mt-6">
          {
            [
              { id: 0, title: "All" },
              { id: 1, title: "Important" },
              { id: 2, title: "Todos" },
              { id: 3, title: "Flashnotes" },
            ].map(cat => (
              <Button key={cat.id} variant="tetiary" className="rounded-[40px] bg-transparent" >{cat.title}</Button>
            ))
          }
        </div>

        <header className="grid grid-cols-2 md:gap-6 gap-4 justify-center items-start py-6">

          <div className="flex flex-col gap-6 md:p-6 p-5 rounded-[12px] border border-gray-500/[0.2] bg-primary text-white">
            <div className="flex justify-between">
              <h1 className="font-medium text-md">Today&apos;s work</h1>
              <button><Plus size={16}/></button>
            </div>

            <div className="flex flex-col gap-1">
              {
                [ 
                  {id: 0, text: "Design Signoff", createdAt: "", updatedAt: "", status: "completed", duration: "" },
                  {id: 1, text: "Development", createdAt: "", updatedAt: "", status: "in progress", duration: "" },
                  {id: 2, text: "User Research", createdAt: "", updatedAt: "", status: "pending", duration: "" },
                ].map(todo => (
                  <div key={todo.id} className="flex gap-2 items-center p-1 rounded-full w-full bg-dark/[0.09]">
                    { todo.status === "completed" ? <CheckCircle size={24} /> : todo.status === "in progress" ? <CircleHalf size={24} /> : <Circle size={24} /> }
                    <p>{todo.text}</p>
                  </div>
                  ))
              }
            </div>

            <p className="opacity-[0.7] text-[12px] flex-1 flex items-end">Sun 20th Dec 2024</p>
          </div>

          <div className="flex flex-col gap-6 md:p-6 p-5 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06]">
            <div className="flex justify-between">
              <h1 className="font-medium text-md font-medium">Flashcards</h1>
              <button><Plus size={16}/></button>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-[12px] h-[150px] border border-gray-500/[0.2] bg-primary text-white">
                <p>What is KISS</p>
              </div>
            </div>
            
            <p className="opacity-[0.7] text-[12px] flex-1 flex items-end">20 Cards</p>

          </div>
        </header>
      </div>

      <section className="grid grid-cols-2 md:gap-6 gap-4 justify-center items-start pt-[60px]">
        {
          [
            { id: "0", title: "Design Signoff", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
            { id: "1", title: "Development", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
            { id: "2", title: "Development", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
            { id: "3", title: "Development", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
            { id: "4", title: "Development", text: "Design principles: color theory, typography, layout, and composition. Practice with basic design exercises...", createdAt: "Sun Dec 10 2024", user: "admin", updatedAt: "" },
          ].map(note => (
            <NoteCard key={note.id} note={note} />
          ))
        }

      </section>
      
    </main>
  );
}
