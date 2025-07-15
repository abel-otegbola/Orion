'use client'
import { useContext, useEffect, useState } from "react";
import Input from "../input/input";
import Dropdown from "../dropdown/dropdown";
import { Spinner, X } from "@phosphor-icons/react";
import { TaskData } from "@/interface/task";
import Button from "../button/button";
import { AuthContext } from "@/context/authContext";
import { TasksContext } from "@/context/tasksContext";


export default function NewTask({ Task, setClose }: { Task?: TaskData, doctor: string, setClose: (aug0: boolean) => void}) {
  const { user } = useContext(AuthContext);
  const { addNewTask, updateTask, loading } = useContext(TasksContext);
  const [data, setData] = useState<TaskData>({ id: "", title: "", date: "", durationStart: "", durationEnd: "", status: "Upcoming", description: "", type: "", })



  useEffect(() => {
    if(Task) {
        setData(Task)
    //   setTitle(Task.title)
    //   setDate(Task.date.split("T")[0])
    //   setStatus(Task.status)
    //   setType(Task.type)
    //   setDescription(Task.description)
    //   setDurationStart(Task.duration.split(",")[0])
    //   setDurationEnd(Task.duration.split(",")[1])
    }
  }, [Task])

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-dark/[0.6] flex items-center justify-center z-[100]">        
        <div className="flex flex-col p-4 gap-4 max-w-[300px] bg-white dark:bg-black w-full">
            <Button className="px-2 py-1 mb-4" variant="tetiary" onClick={() => setClose(false)}><X /></Button>
            <Input label={"title"} onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} type={"text"} />
            <Input label={"Date"} onChange={(e) => setData({ ...data, date: e.target.value })} value={data.date} type={"date"} />

            <div className="grid grid-cols-2 gap-2">
                <Input label={"Start Time"} onChange={(e) => setData({ ...data, durationStart: e.target.value })} value={data.durationStart} type={"time"} />
                <Input label={"End Time"} onChange={(e) => setData({ ...data, durationEnd: e.target.value })} value={data.durationEnd} type={"time"} />
            </div>

            <Dropdown
              label={"Status"} 
              onChange={(value) => setData({ ...data, status: value })} 
              value={data.status} 
              options={[
                {id: 0, title: "Pending"}, {id: 1, title: "Upcoming"},{id: 2, title: "On-hold"}, {id: 3, title: "Completed"}
              ]} 
            />

            <Dropdown
              label={"Category"} 
              onChange={(value) => setData({ ...data, type: value })} 
              value={data.type || "General"} 
              options={[
                {id: 0, title: "General"}, {id: 1, title: "Study"},{id: 2, title: "Checkup"}, {id: 3, title: "Fitness"}, {id: 4, title: "Meal"}, {id: 5, title: "Others"}
              ]} 
            />

            <Input label={"Description"} onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} type={"text"} />

            <Button type="button" className="p-2 w-full bg-purple text-white rounded"
                onClick={() => 
                    Task ?
                    updateTask(Task.id, { ...data, patient: Task.patient, doctor: Task.doctor }, user.email || "")
                    :
                    addNewTask({...data }, user.email || "")
                }
            >
                {loading ? <Spinner className="animate-spin text-[20px]" /> : "Submit"}
            </Button>

        </div>
      
    </div>
  );
}