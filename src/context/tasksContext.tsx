'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { TaskData } from "@/interface/task"
import { createContext, useContext, useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";

type tasksContextProps = {
    tasks: TaskData[];
    addNewTask: (newTask: TaskData, user: string) => void;
    updateTask: (id: string, data: TaskData) => void;
    deleteTask: (id: string, user: string) => void;
    loading: boolean;
}


export const schedules_DATABASE_ID = "66303297001afa9a6892"; // Replace with your database ID
export const schedules_COLLECTION_ID = "663032af0038121a83d2"; // Replace with your collection ID

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
    const [loading, setLoading] = useState(false)

    async function init() {
        const response = await databases.listDocuments(
            schedules_DATABASE_ID,
            schedules_COLLECTION_ID,
            [Query.orderDesc("$createdAt"), Query.limit(10)]
        );
        setTasks(response.documents);
    }

    async function addNewTask(task: TaskData) {
        const response = await databases.createDocument(
            schedules_DATABASE_ID,
            schedules_COLLECTION_ID,
            ID.unique(),
            task
        );
        setTasks((tasks: TaskData[]) => [response, ...tasks].slice(0, 10));
    }
        
    async function updateTask(id: string, data: TaskData) {
        const response = await databases.updateDocument(
            schedules_DATABASE_ID,
            schedules_COLLECTION_ID,
            id,
            { status: data }
        );
        console.log(response)
        init()
    }


    const deleteTask = async (id: string) => {
        setLoading(true)
        await databases.deleteDocument(schedules_DATABASE_ID, schedules_COLLECTION_ID, id);
        setTasks((tasks: TaskData[]) => tasks.filter((idea) => idea.$id !== id));
        await init();
    }
      
    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, updateTask, deleteTask, loading }}>
            {children}
        </TasksContext.Provider>
    )
}