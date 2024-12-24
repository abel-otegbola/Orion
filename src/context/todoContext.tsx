'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { db } from "@/firebase/firebase"
import { ITodo } from "@/interface/note"
import { addDoc, AddPrefixToKeys, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { createContext } from "react"
import { v7 } from "uuid"

type todosContextProps = {
    todos: ITodo[];
    addNewTodo: (newTodo: string, user: string) => void;
    updateTodo: (id: string, data: ITodo, user: string) => void;
    deleteTodo: (id: string, user: string) => void;
    getAllTodos: (user: string) => void;
}

export const TodosContext = createContext({} as todosContextProps)

export default function TodosProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [todos, setTodos] = useLocalStorage("todos", [])

    const addNewTodo = async (newTodo: string, user: string) => {
        if(user === "") {
            console.log(user)
            setTodos([ ...todos, { id: v7(), text: newTodo, createdAt: new Date(), updatedAt: new Date(), status: "pending", duration: "", user } ])
        }
        else {
            try {
                const docRef = await addDoc(collection(db, "todos"), { id: v7(), text: newTodo, createdAt: new Date(), updatedAt: new Date(), status: "pending", duration: "", user });
                console.log(docRef)
                getAllTodos(user)
            }
            catch(e) {
                console.log(e)
            }
        }
    }
        
    const updateTodo = async (id: string, data: AddPrefixToKeys<string, ITodo>, user: string) => {
        if(user === "") {
            setTodos(todos.map((todo: ITodo) => {
                if(todo.id === id) {
                    return data
                }
                else return todo
            }))
        }
        else {
            try {
                const docRef = await updateDoc(doc(db, "todos", id), data);
                console.log(docRef)
                getAllTodos(user)
            }
            catch(e) {
                console.log(e)
            }
        }
        
    }

    const deleteTodo = async (id: string, user: string) => {
        if(user === "") {
            setTodos(todos.filter((todo: ITodo) => todo.id !== id))
        }
        else {
            try {
                const docRef = await deleteDoc(doc(db, "todos", id));
                console.log(docRef)
                getAllTodos(user)
            }
            catch(e) {
                console.log(e)
            }
        }
        
    }

    const getAllTodos = async (user: string) => {
        try {
            const arr: {id: string}[] = []
            const querySnapshot = await getDocs(query(collection(db, "todos"), where("user", "==", user)));
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.id})
            })
            console.log(arr)
            setTodos(arr)
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <TodosContext.Provider value={{ todos, getAllTodos, addNewTodo, updateTodo, deleteTodo }}>
            {children}
        </TodosContext.Provider>
    )
}