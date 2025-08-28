'use client'
import CalendarIcon from "@/assets/icons/calendar";
import { TaskData } from "@/interface/task";
import { useContext, useEffect, useState } from "react";
import Button from "../button/button";
import toast, { Toaster } from "react-hot-toast";
import { Star, X } from "@phosphor-icons/react";
import TaskList from "./prioritySection";
import { useRouter } from "next/navigation";
import { TasksContext } from "@/context/tasksContext";
import { AuthContext } from "@/context/authContext";

export default function TasksFlow() {
    const {addNewTask} = useContext(TasksContext)
      const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState<TaskData[]>([])
    const [flow, setFlow] = useState(0)
    const [taskInput, setTaskInput] = useState<string>("")
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const router = useRouter();

    const handleAddTask = () => {
        if(taskInput === "") {
            setPopup({ type: "error", msg: "Task entry field is empty" })
        }
        else {
            setTasks([...tasks, { 
                id: (tasks.length + 1).toString(), 
                title: taskInput, 
                priority: "low", 
                date: new Date().toString(), 
                durationStart: "", 
                durationEnd: "", 
                status: "Pending", 
                description: "",
                category: ""
            }])
            setTaskInput("")
        }
    }

    useEffect(() => {
        if(popup.type === "success") {
            toast.success(popup.msg)
        }
        else if(popup.type === "error") {
            toast.error(popup.msg)
        }
    }, [popup])

    const finishOnboarding = () => {
        if(user?.email) {
            tasks.map(task => (
                addNewTask({...task, user: user?.email || ""})
            ))
            router.push("/account/tasks") 
        }
    }

    return (
        <>
            <Toaster containerClassName="p-8" />
            {/* <div
                className="animate-rotate absolute inset-0 h-full w-full bg-[conic-gradient(#E334A140_20deg,transparent_120deg)]"
            ></div>
            <div
                className="absolute inset-0 h-full top-[0.5%] w-[99%] left-[0.5%] bg-white dark:bg-dark rounded-lg"
            ></div> */}

            <div className="flex items-center gap-4 mb-4">
                <CalendarIcon className="rounded-full p-1 w-[32px] h-[32px] bg-gray-200/[0.2]" />
                <div className="text-start">
                <h2 className="font-medium text-[16px]">Today&apos;s tasks</h2>
                <p className="text-[10px]">Within few minutes, let&apos;s get your tasks started.</p>
                </div>
            </div>

            <div className="relative flex overflow-hidden py-8 min-h-[300px]">
                <div className={`absolute top-0 left-0 flex flex-col gap-2 w-full duration-500 ${flow === 0 ? "translate-x-[0%]" : "translate-x-[-100%]"}`}>
                    
                    <div className="flex flex-col p-4 gap-1 rounded bg-gray-700/[0.09] overflow-y-auto h-[210px] border border-gray-500/[0.2]">
                        {
                            tasks.map(task => (
                                <div key={task.id} className="flex items-center justify-between gap-8 rounded shadow-lg border border-gray-500/[0.2] p-2">
                                    <p className="flex gap-2 items-center">
                                        {task.title}
                                    </p>
                                    <button onClick={() => setTasks(tasks.filter(item => item.id !== task.id))}><X/></button>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex p-2 rounded-lg shadow-lg bg-white dark:bg-[#232328] border border-gray-500/[0.2]">
                        <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Write a task, idea, or goal…" className="flex-1 w-full p-[2px] px-2 bg-transparent outline-none border-none"/>
                        <Button size="sm" className="" onClick={() => handleAddTask()}>Add</Button>
                    </div>
                    <p className="text-[8px] justify-end py-0 flex items-center gap-1">
                        <Star className="text-fuchsia-500" />
                        Goal: Make it short, frictionless, and focused.
                    </p>

                </div>

                <div className={`absolute top-0 left-0 flex flex-col gap-4 w-full duration-500 ${flow === 1 ? "translate-x-[0%]" : flow === 0 ? "translate-x-[100%]" : "translate-x-[-100%]"}`}>
                    <h2 className="py-2">Arrange in terms of importance and priority</h2>
                    <TaskList tasks={tasks} setTasks={setTasks} />
                </div>
                
                <div className={`absolute top-0 left-0 flex flex-col gap-4 w-full duration-500 ${flow === 2 ? "translate-x-[0%]" : flow < 2 ? "translate-x-[100%]" : "translate-x-[-100%]"}`}>
                    <h2 className="py-2 border-b border-gray-500/[0.2]">Add start and end time for each tasks</h2>
                    <div className="flex flex-col rounded bg-gray-700/[0.09] overflow-y-auto h-[230px] p-2 border border-gray-500/[0.2]">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 p-2">
                                <p>Title</p>
                                <p>Start time</p>
                                <p>End time</p>
                            </div>
                            {
                            tasks.map((task, i) => (
                                <div key={task.id} className={`text-[10px] grid grid-cols-3 p-2 ${i%2 === 0 ? "border border-primary/[0.08]" : "bg-primary/[0.04] border border-primary/[0.1]"}`}>
                                    <p className="flex gap-2 items-center">
                                        {task.title}
                                    </p>
                                    <input type="time" className="w-[60px] p-[2px] border border-gray-500/[0.2] outline-primary bg-transparent" />
                                    <input type="time" className="w-[60px] p-[2px] border border-gray-500/[0.2] outline-primary bg-transparent" />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 left-0 flex flex-col items-center justify-center h-full gap-4 w-full duration-500 ${flow === 3 ? "translate-x-[0%]" : flow < 3 ? "translate-x-[100%]" : "translate-x-[-100%]"}`}>
                    <h2 className="py-2 text-[14px]">Congratulations</h2>
                    <p>Now you can start tracking your tasks</p>                    
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                {flow < 1 ?  <span></span> : <Button size="sm" className={`flex`} onClick={() => setFlow(flow-1)}>Back</Button>}
                <Button size="sm" variant="secondary" className="bg-primary" onClick={() => flow === 3 ? finishOnboarding() : tasks.length > 0 ? setFlow(flow+1) : setPopup({ type: "error", msg: "Please add a task to continue" })}>{flow < 3 ? "Save and Continue" : "Finish"}</Button>
            </div>
        </>
    )
}