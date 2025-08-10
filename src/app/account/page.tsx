'use client'

import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import TasksFlow from "@/components/flows/tasksFlow";
import ThemeSelector from "@/components/themeSelector/themeSelector";
import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";


export default function Home() {
  const { user } = useContext(AuthContext)
  const [taskFlow, setTaskFlow] = useState(false)

  
  return (
    <main className="w-full gap-6">

        <div className="grid xl:grid-cols-3 grid-cols-2 items-center w-full gap-2 justify-between p-4 border-b border-gray-500/[0.1] bg-white md:dark:bg-black/[0.3] dark:bg-[#131318]">
          
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="font-bold text-[18px]">Welcome</h1>
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

        <div className="flex items-center justify-center h-[80vh]">
          <div className="md:w-[500px]">
            <TasksFlow />
          </div>
        </div>
        

    </main>
  );
}
