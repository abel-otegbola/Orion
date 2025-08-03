import CalendarIcon from "@/assets/icons/calendar";
import { TaskData } from "@/interface/task";
import { useEffect, useState } from "react";
import Button from "../button/button";
import Input from "../input/input";
import toast, { Toaster } from "react-hot-toast";
import { Star, X } from "@phosphor-icons/react";
import TaskList from "./prioritySection";
import Table from "../table/table";

export default function TasksFlow() {
    const [tasks, setTasks] = useState<TaskData[]>([])
    const [flow, setFlow] = useState(0)
    const [taskInput, setTaskInput] = useState<string>("")
    const [popup, setPopup] = useState({ type: "", msg: "" });

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

    return (
    <div className="w-full h-full fixed top-0 left-0 bg-dark/[0.6] text-[12px] backdrop-blur-sm flex items-center justify-center z-[100]">        
        <div className="flex flex-col p-6 px-6 gap-4 sm:max-w-[400px] shadow-lg border border-gray-500/[0.2] rounded-lg w-full overflow-auto bg-white dark:bg-dark dark:bg-gradient-to-tr from-dark via-[#552B2620] to-dark w-full">
        
            <Toaster containerClassName="p-8" />
            {/* <div
                className="animate-rotate absolute inset-0 h-full w-full bg-[conic-gradient(#E334A140_20deg,transparent_120deg)]"
            ></div>
            <div
                className="absolute inset-0 h-full top-[0.5%] w-[99%] left-[0.5%] bg-white dark:bg-dark rounded-lg"
            ></div> */}

            <div className="flex items-center gap-4">
                <CalendarIcon className="rounded-full p-1 w-[32px] h-[32px] bg-gray-200/[0.2]" />
                <div className="text-start">
                <h2 className="font-medium text-[16px]">Today&apos;s tasks</h2>
                <p className="text-[10px]">Within few minutes, let&apos;s get your tasks started.</p>
                </div>
            </div>

            <div className="relative flex overflow-hidden py-8 min-h-[300px]">
                <div className={`absolute top-0 left-0 flex flex-col gap-2 w-full duration-500 ${flow === 0 ? "translate-x-[0%]" : "translate-x-[-100%]"}`}>
                    
                    <div className="flex flex-col p-4 gap-1 rounded bg-gray-700/[0.09] overflow-y-auto h-[230px]">
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

                    <div className="flex p-2 rounded shadow-lg bg-dark border border-gray-500/[0.2]">
                        <Input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Write a task, idea, or goal…" className="p-[2px] border-transparent"/>
                        <Button size="sm" variant="secondary" className="w-full" onClick={() => handleAddTask()}>Add</Button>
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
                    <div className="flex flex-col rounded bg-gray-700/[0.09] overflow-y-auto h-[230px]">
                        {/* {
                            tasks.map(task => (
                                <div key={task.id} className="flex items-center justify-between gap-8 rounded shadow-lg border border-gray-500/[0.2] p-2">
                                    <p className="flex gap-2 items-center w-[100%]">
                                        {task.title}
                                    </p>
                                    <Input type="number" className="w-[30px] py-0" onChange={() => {}}/>
                                </div>
                            ))
                        } */}
                        <Table data={tasks} fields={["title", "durationStart", "durationEnd"]} />
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-between">
                <Button size="sm" onClick={() => setFlow(flow-1)}>Back</Button>
                <Button size="sm" variant="secondary" className="bg-primary" onClick={() => tasks.length > 0 ? setFlow(flow+1): setPopup({ type: "error", msg: "Please add a task to continue" })}>Save and Continue</Button>
            </div>

        </div>
    </div>
    )
}