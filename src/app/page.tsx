'use client'

import Button from "@/components/button/button";
import NoteCard from "@/components/cards/noteCard";
import Search from "@/components/search/search";
import { NotesContext } from "@/context/noteContext";
import { TodosContext } from "@/context/todoContext";
import { CheckCircle, Circle, Plus, X } from "@phosphor-icons/react";
import { CircleHalf } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useContext } from "react";


export default function Home() {
  const { todos, handleComplete, handleDelete } = useContext(TodosContext)
  const { notes } = useContext(NotesContext)
  
  return (
    <main className="grid md:grid-cols-2 md:px-[8%] px-4 w-full gap-6">
      <div className="md:sticky top-0 left-0 md:h-screen pt-[60px]">
        <Search placeholder="Search notes, todos and flashcards" className="bg-gray-500/[0.05] border-gray-500/[0.1]" />

        <div className="hidden w-full overflow-x-auto gap-2 justify-between mt-6">
          {
            [
              { id: 0, title: "All" },
              { id: 1, title: "Important" },
              { id: 2, title: "Todos" },
              { id: 3, title: "Flashnotes" },
            ].map(cat => (
              <Button key={cat.id} variant="tetiary" className="rounded-[40px] bg-transparent max-[400px]:text-[10px]" >{cat.title}</Button>
            ))
          }
        </div>

        <header className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 max-[350px]:grid-cols-1 md:gap-6 gap-4 justify-center items-start py-6">

          <div className="flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] bg-primary text-white">
            <div className="flex justify-between p-1">
              <Link href="/todos" className="font-semibold text-md">Today&apos;s work</Link>
              <button><Plus size={16}/></button>
            </div>

            <div className="flex flex-col gap-1">
              {
                todos.slice(0, 5).map(todo => (
                  <div key={todo.id} className={`flex gap-1 items-center justify-between p-1 rounded-full w-full bg-black/[0.09] max-[400px]:text-[10px] cursor-pointer ${ todo.status === "completed" ? "" : ""}`}>
                  <div className="flex gap-1 items-center w-[80%]">
                    <button>{ todo.status === "completed" ? <CheckCircle size={24}  onClick={() => handleComplete(todo.id, "pending")} /> : todo.status === "in progress" ? <CircleHalf size={24} onClick={() => handleComplete(todo.id, "completed")} /> : <Circle size={24} onClick={() => handleComplete(todo.id, "in progress")}  /> }</button>
                    <p className="truncate">{todo.text}</p>
                  </div>
                  <button onClick={() => handleDelete(todo.id)} className="text-white-400 p-2" ><X /></button>
                </div>
                  ))
              }
            </div>

            <p className="opacity-[0.7] text-[12px] p-1 flex-1 flex items-end">Sun 20th Dec 2024</p>
          </div>

          <div className="flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06]">
            <div className="flex justify-between p-1">
              <Link href={"/flashcards"} className="font-medium text-md font-semibold">Flashcards</Link>
              <button><Plus size={16}/></button>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-[12px] h-[150px] border border-gray-500/[0.2] bg-primary text-white">
                <p>What is KISS</p>
              </div>
            </div>
            
            <p className="opacity-[0.7] text-[12px] p-1 flex-1 flex items-end">20 Cards</p>

          </div>
        </header>
      </div>

      <section className="lg:columns-2 md:columns-1 columns-2 max-[350px]:columns-1 md:gap-6 gap-4 justify-center items-start pt-[60px]">
        {
         notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))
        }

      </section>
      
    </main>
  );
}
