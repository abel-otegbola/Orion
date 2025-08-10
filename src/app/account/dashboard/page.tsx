'use client'

import CalendarIcon from "@/assets/icons/calendar";
import FileIcon from "@/assets/icons/file";
import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import TaskCard from "@/components/cards/taskCard";
import TasksFlow from "@/components/flows/tasksFlow";
import TasksLayout from "@/components/modals/tasks";
import Table from "@/components/table/table";
import ThemeSelector from "@/components/themeSelector/themeSelector";
import { AuthContext } from "@/context/authContext";
import { useTasks } from "@/context/tasksContext";
import Link from "next/link";
import { useContext, useState } from "react";


export default function Home() {
  const { user } = useContext(AuthContext)
  const [taskFlow, setTaskFlow] = useState(false)
  const tasks = useTasks().tasks
  
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
            <Button onClick={() => setTaskFlow(!taskFlow)} >Get started</Button>
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
          <div>
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-[16px]">Welcome, {user?.email?.split("@")[0]}</h2>
              <p>These are your recent spaces</p>
              <div className="flex mt-2 gap-2">
                <Link href={"/tasks"} className="text-primary border border-primary/[0.5] p-1 px-2 rounded-lg">Create space</Link>
                <Link href={"/tasks"} className="text-primary border border-primary/[0.5] p-1 px-2 rounded-lg">Create task</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">

              { taskFlow ? 
                <div className="w-full h-full fixed top-0 left-0 bg-dark/[0.6] text-[12px] backdrop-blur-sm flex items-center justify-center z-[100]">        
                    <div className="flex flex-col p-6 px-6 gap-4 sm:max-w-[400px] shadow-lg border border-gray-500/[0.2] rounded-lg w-full overflow-auto bg-white dark:bg-dark dark:bg-gradient-to-tr from-dark via-[#552B2620] to-dark w-full">
                      <TasksFlow /> 
                    </div>
                </div>
              : "" }

              {
                tasks.map((todo, i) => (
                  <TaskCard key={todo.id} todo={todo} i={i} />
                  ))
              }

            </div>
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

              <Link href={"/dashboard/tasks"} className="text-primary">View details</Link>
            </div>

            <div className="border border-gray-500/[0.1] rounded-lg flex-1 max-h-[300px] overflow-y-auto">
                <TasksLayout tasks={tasks} value={new Date()} layout={"Calendar"} />
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
            <Table data={tasks} fields={["title", "date", "durationStart", "durationEnd", "status"]}  />
        </div>

      </section>
      
    </main>
  );
}
