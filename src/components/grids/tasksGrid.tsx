import { tasksLayout } from "@/helpers/tasksLayout"
import { useOutsideClick } from "@/helpers/useClickOutside"
import { useState } from "react"
import Button from "../button/button"
import NewTask from "../modals/createTask"
import { TaskData } from "@/interface/task"

export default function TaskGrid({element, layout}: { element: TaskData, layout: string }) {
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const taskRef = useOutsideClick(setOpen, false)

    return (
        <>
        <div 
            ref={taskRef} 
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => e.key === "Enter" ? setOpen(!open) : ""}
            style={{ top: tasksLayout(element.durationStart + "," + element.durationEnd).top, height: !open ? tasksLayout(element.durationStart + "," + element.durationEnd).height : "auto" }} 
            className={`${layout === "Calendar" ? `absolute text-[10px] w-[97%]` : `${!open ? "max-h-[150px] min-h-[80px]" : ""} text-[12px]`} 
            left-0 border duration-500 rounded px-2 py-1 pb-2 break-inside-avoid min-h-[65px] z-[1]
            ${element.status === "Completed" ? "border-green-400/[0.2]" 
            : element.status === "Upcoming" ? "border-orange-400/[0.2]" 
            : element.status === "On-hold" ? "border-red/[0.2]" 
            : "border-primary/[0.2]"} `}>          
            
            <button className="font-medium mt-1 text-start">{element.title}</button>  
            <p className="text-[10px] mt-1">{element.doctor}</p>  
            <p className="text-[10px] mt-1">{element.durationStart + " - " + element.durationEnd}</p>  
            <p className="text-[10px] mt-1">{element.date}</p>  

            <div className={`p-2 rounded bg-slate-100/[0.09] mt-2 ${open ? "block" : "hidden"}`}>
                <p className="mb-2">Description: {element.description}</p>
                <div className="flex gap-2">
                    <Button variant="secondary" className="px-2 py-[2px] h-[28px] bg-gray-500/[0.2] rounded text-[10px]" onClick={() => setOpenEdit(true)}>Edit</Button>
                </div>
            </div>


        </div>

        {
            openEdit ?
            <NewTask setClose={setOpenEdit} />
            :""
        }
    </>
    )
}