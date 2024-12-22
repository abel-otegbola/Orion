'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { ITodo } from "@/interface/note"
import { createContext } from "react"

type todosContextProps = {
    todos: ITodo[];
    addNewTodo: (newTodo: string) => void;
    handleComplete: (id: string, status: string) => void;
    handleDelete: (id: string) => void
}

export const TodosContext = createContext({} as todosContextProps)

export default function TodosProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [todos, setTodos] = useLocalStorage("todos", [ 
        {id: "0", text: "Design Signoff", createdAt: "", updatedAt: "", status: "completed", duration: "", user: "" },
        {id: "1", text: "Development", createdAt: "", updatedAt: "", status: "in progress", duration: "", user: "" },
        {id: "2", text: "User Research", createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" },
    ])

    const addNewTodo = (newTodo: string) => {
        setTodos([ ...todos, { id: todos.length.toString(), text: newTodo, createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" } ])
    }
    
    const handleComplete = (id: string, status: string) => {
        setTodos(todos.map((todo: ITodo) => {
            if(todo.id === id) {
            return { ...todo, status: status }
            }
            else return todo
        }))
    }
    
    const handleDelete = (id: string) => {
        setTodos(todos.filter((todo: ITodo) => todo.id !== id))
    }


    return (
        <TodosContext.Provider value={{ todos, addNewTodo, handleComplete, handleDelete }}>
            {children}
        </TodosContext.Provider>
    )
}