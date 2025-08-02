'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { TaskData } from "@/interface/task"
import { createContext, useContext, useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";
import toast, { Toaster } from "react-hot-toast";

type tasksContextProps = {
    tasks: TaskData[];
    addNewTask: (newTask: TaskData) => void;
    updateTask: (id: string, data: TaskData) => void;
    deleteTask: (id: string, user: string) => void;
    loading: boolean;
}


export const TasksContext = createContext({} as tasksContextProps)

export function useTasks() {
  return useContext(TasksContext);
}

export default function TasksProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [tasks, setTasks] = useLocalStorage("tasks", [])
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false)

    async function init() {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID || "",
            [Query.orderDesc("$createdAt"), Query.limit(10)]
        );
        setTasks(response.documents);
    }

    async function addNewTask(task: TaskData) {
        setLoading(true)
        const response = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID || "",
            ID.unique(),
            {...task, priority: 'low', createdAt: new Date()}
        );
        setTasks((tasks: TaskData[]) => [response, ...tasks].slice(0, 10));
        setPopup({ type: "success", msg: "Task added successfully" })
        setLoading(false)
    }
        
    async function updateTask(id: string, data: TaskData) {
        setLoading(true)
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID || "",
            process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID || "",
            id,
            { status: data }
        );
        console.log(response)
        setPopup({ type: "success", msg: "Task updated successfully" })
        init()
        setLoading(false)
    }


    const deleteTask = async (id: string) => {
        setLoading(true)
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID || "", 
            process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID || "", 
            id
        );
        setTasks((tasks: TaskData[]) => tasks.filter((idea) => idea.$id !== id));
        await init();
        setLoading(false)
    }

    
      
    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(popup.type === "success") {
            toast.success(popup.msg)
        }
        else if(popup.type === "error") {
            toast.error(popup.msg)
        }
    }, [popup])

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, updateTask, deleteTask, loading }}>
            <Toaster containerClassName="p-8" />
            {children}
        </TasksContext.Provider>
    )
}