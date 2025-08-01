'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { db } from "@/firebase/firebase"
import { TaskData } from "@/interface/task"
import { addDoc, AddPrefixToKeys, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { createContext, useState } from "react"

type tasksContextProps = {
    tasks: TaskData[];
    addNewTask: (newTask: TaskData, user: string) => void;
    updateTask: (id: string, data: TaskData, user: string) => void;
    deleteTask: (id: string, user: string) => void;
    getAllTasks: (user: string) => void;
    loading: boolean;
}

export const TasksContext = createContext({} as tasksContextProps)

export default function TasksProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [tasks, setTasks] = useLocalStorage("tasks", [])
    const [loading, setLoading] = useState(false)

    const addNewTask = async (newTask: TaskData, user: string) => {
        setLoading(true)
        if(user === "") {
            setTasks([ ...tasks, { ...newTask, createdAt: new Date(), updatedAt: new Date(), status: "pending", duration: "", user } ])
        }
        else {
            try {
                console.log(newTask)
                const docRef = await addDoc(collection(db, "tasks"), { ...newTask, createdAt: new Date(), updatedAt: new Date(), status: "pending", duration: "", user });
                console.log(docRef)
                getAllTasks(user)
                setLoading(false)
            }
            catch(e) {
                console.log(e)
                setLoading(false)
            }
        }
    }
        
    const updateTask = async (id: string, data: AddPrefixToKeys<string, TaskData>, user: string) => {
        setLoading(true)
        if(user === "") {
            setTasks(tasks.map((task: TaskData) => {
                if(task.id === id) {
                    return data
                }
                else return task
            }))
        }
        else {
            try {
                const docRef = await updateDoc(doc(db, "tasks", id), data);
                console.log(docRef)
                getAllTasks(user)
                setLoading(false)
            }
            catch(e) {
                console.log(e)
                setLoading(false)
            }
        }
        
    }

    const deleteTask = async (id: string, user: string) => {
        setLoading(true)
        if(user === "") {
            setTasks(tasks.filter((task: TaskData) => task.id !== id))
        }
        else {
            try {
                const docRef = await deleteDoc(doc(db, "tasks", id));
                console.log(docRef)
                getAllTasks(user)
                setLoading(false)
            }
            catch(e) {
                console.log(e)
                setLoading(false)
            }
        }
        
    }

    const getAllTasks = async (user: string) => {
        try {
            const arr: {id: string}[] = []
            const querySnapshot = await getDocs(query(collection(db, "tasks"), where("user", "==", user)));
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.id})
            })
            console.log(arr)
            setTasks(arr)
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <TasksContext.Provider value={{ tasks, getAllTasks, addNewTask, updateTask, deleteTask, loading }}>
            {children}
        </TasksContext.Provider>
    )
}