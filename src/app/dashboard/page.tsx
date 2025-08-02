'use client'

import BellIcon from "@/assets/icons/bell";
import CalendarIcon from "@/assets/icons/calendar";
import FileIcon from "@/assets/icons/file";
import Avatar from "@/components/avatar/avatar";
import TaskCard from "@/components/cards/taskCard";
import TasksLayout from "@/components/modals/tasks";
import { NotesTable } from "@/components/table/notesTable";
import ThemeSelector from "@/components/themeSelector/themeSelector";
import { AuthContext } from "@/context/authContext";
// import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";


export default function Home() {
  const { user } = useContext(AuthContext)
  
  return (
    <main className="w-full gap-6">
      <div className="">

        <div className="grid xl:grid-cols-3 grid-cols-2 items-center w-full gap-2 justify-between p-4 border-b border-gray-500/[0.1] bg-white md:dark:bg-black/[0.3] dark:bg-[#131318]">
          
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="font-bold text-[18px]">Overview</h1>
            <p>Stay productive and organized</p>
          </div>
          <h1 className="xl:block text-center hidden font-bold text-[20px]">{new Date().getUTCHours() + ":" + new Date().getUTCMinutes()}</h1>
          <div className="flex gap-6 justify-end items-center">
            <p><BellIcon /></p>
            <ThemeSelector />
            <button className="flex gap-2">
                <Avatar user={{id: "0", email: user?.email || "", fullname: user?.email || "user" }} />
                <div className="text-start">
                  <h2 className="font-medium md:block hidden">{user?.email?.split("@")[0]}</h2>
                  <p className="text-[10px] md:block hidden">{user?.email}</p>
                </div>
            </button>
          </div>
        </div>

        <section className="grid xl:grid-cols-2 md:grid-cols-1 max-[480px]:grid-cols-1 md:gap-6 gap-4 justify-center items-start p-4">

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="flex flex-col gap-6 p-2 md:px-3 rounded-[12px] border border-gray-500/[0.2] bg-white md:dark:bg-black/[0.3] dark:bg-[#131318] border border0gray-500/[0.1]">
              <div className="flex justify-between p-1">
                <Link href="/todos" className="text-md">Investment</Link>
                <button><ArrowRight size={16}/></button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[20px] font-medium p-1 flex-1 flex items-end">24</p>
                <p className="opacity-[0.7] text-[10px] p-1 flex-1 flex items-end">Sun 20th Dec 2024</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-2 md:px-3 rounded-[12px] border border-gray-500/[0.2] bg-white md:dark:bg-black/[0.3] dark:bg-[#131318] border border0gray-500/[0.1]">
              <div className="flex justify-between p-1">
                <Link href="/todos" className="text-md">Todo-list</Link>
                <button><ArrowRight size={16}/></button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[20px] font-medium p-1 flex-1 flex items-end">12</p>
                <p className="opacity-[0.7] text-[10px] p-1 flex-1 flex items-end">Sun 20th Dec 2024</p>
              </div>
            </div> */}

            {
              [
                {id: "0", createdAt: "Sun 25th, Jan 2025", title: "Design and development of flashnotes", description: "Project management dashboard for a crypto exchange platform. Highlights of feature" },
                {id: "1", createdAt: "Mon 15th, Jan 2025", title: "Paystack Developers Meeting", description: "Project management dashboard for a crypto exchange platform. Highlights of feature" },
              ].map((todo, i) => (
                 <TaskCard key={todo.id} todo={todo} i={i} />
                ))
            }

          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CalendarIcon className="rounded-full p-1 w-[32px] h-[32px] bg-gray-200/[0.2]" />
                <div className="text-start">
                  <h2 className="font-medium">Schedules</h2>
                  <p className="text-[10px]">tasks available for the day</p>
                </div>
              </div>

              <Link href={"/todos"} className="text-primary">View details</Link>
            </div>

            <div className="border border-gray-500/[0.1] rounded-lg flex-1 max-h-[340px] overflow-y-auto">
                <TasksLayout tasks={[]} value={new Date()} layout={"Calendar"} />
            </div>
          </div>

        </section>
      </div>

      <section className="mt-2 p-4">
        <div className="h-full">
            <h2 className="flex items-center gap-1 font-medium">
                <FileIcon width={24} />
                <p>Tasks</p>
            </h2>
            <NotesTable data={[]} fields={["Title", "Due date", "Assigned to"]} />
        </div>

      </section>
      
    </main>
  );
}
