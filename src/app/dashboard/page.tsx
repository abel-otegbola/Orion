'use client'

import Avatar from "@/components/avatar/avatar";
// import NoteCard from "@/components/cards/noteCard";
import TodoCard from "@/components/cards/todoCard";
import { NotesTable } from "@/components/table/notesTable";
import { AuthContext } from "@/context/authContext";
// import Slider from "@/components/slider/slider";
// import { flashcardsContext } from "@/context/flashcardContext";
import { NotesContext } from "@/context/noteContext";
// import { TodosContext } from "@/context/todoContext";
import { ArrowRight, Bell, Calendar, File } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";


export default function Home() {
  // const { todos } = useContext(TodosContext)
  // const { flashcards } = useContext(flashcardsContext)
  const { user } = useContext(AuthContext)
  const { notes } = useContext(NotesContext)
  
  return (
    <main className="w-full gap-6">
      <div className="">

        <div className="grid xl:grid-cols-3 grid-cols-2 items-center w-full gap-2 justify-between pb-4 border-b border-gray-500/[0.1]">
          
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="font-bold text-[20px]">Overview</h1>
            <p>Stay productive and organized</p>
          </div>
          <h1 className="xl:block text-center hidden font-bold text-[20px]">{new Date().getUTCHours() + ":" + new Date().getUTCMinutes()}</h1>
          <div className="flex gap-6 justify-end items-center">
            <Link href={"/help"}>Need help?</Link>
            <p><Bell size={24} /></p>
            <button className="flex gap-2">
                <Avatar user={{id: "0", email: user?.email || "", fullname: user?.email || "user" }} />
                <div className="text-start">
                  <h2 className="font-medium md:block hidden">{user?.email?.split("@")[0]}</h2>
                  <p className="text-[10px] md:block hidden">{user?.email}</p>
                </div>
            </button>
          </div>
        </div>

        <section className="grid xl:grid-cols-2 md:grid-cols-1 max-[480px]:grid-cols-1 md:gap-6 gap-4 justify-center items-start py-6">

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] bg-white dark:bg-dark border border0gray-500/[0.1]">
              <div className="flex justify-between p-1">
                <Link href="/todos" className="font-semibold text-md">Notes</Link>
                <button><ArrowRight size={16}/></button>
              </div>

              <div className="flex justify-between items-end">
                <p className="opacity-[0.7] text-[20px] p-1 flex-1 flex items-end">24</p>
                <p className="opacity-[0.7] text-[10px] p-1 flex-1 flex items-end">Sun 20th Dec 2024</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] bg-white dark:bg-dark border border0gray-500/[0.1]">
              <div className="flex justify-between p-1">
                <Link href="/todos" className="font-semibold text-md">Todo-list</Link>
                <button><ArrowRight size={16}/></button>
              </div>

              <div className="flex justify-between items-end">
                <p className="opacity-[0.7] text-[20px] p-1 flex-1 flex items-end">12</p>
                <p className="opacity-[0.7] text-[10px] p-1 flex-1 flex items-end">Sun 20th Dec 2024</p>
              </div>
            </div>

            {
              [
                {id: "0", createdAt: "Sun 25th, Jan 2025", title: "Design and development of flashnotes", description: "Project management dashboard for a crypto exchange platform. Highlights of feature" },
                {id: "1", createdAt: "Mon 15th, Jan 2025", title: "Paystack Developers Meeting", description: "Project management dashboard for a crypto exchange platform. Highlights of feature" },
              ].map((todo, i) => (
                 <TodoCard key={todo.id} todo={todo} i={i} />
                ))
            }

          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar size={28} className="rounded-full p-1 bg-gray-200/[0.4]" />
                <div className="text-start">
                  <h2 className="font-medium">Schedules</h2>
                  <p className="text-[10px]">tasks available for the month</p>
                </div>
              </div>

              <Link href={"/todos"} className="text-primary">View details</Link>
            </div>

            <div className="border border-gray-500/[0.1] rounded-lg flex-1">

            </div>
          </div>

        </section>
      </div>

      <section className="mt-12">
        <div className="bg-white dark:bg-dark h-full">
            <h2 className="flex items-center gap-3 font-bold text-[20px]">
                <p className={``}><File width={24} /> </p>
                Notes
            </h2>
            <NotesTable data={notes} fields={["Title", "Date", "Text", "Word Count"]} />
        </div>

      </section>
      
    </main>
  );
}
