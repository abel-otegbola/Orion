'use client'
import { AuthContext } from "@/context/authContext";
import { TodosContext } from "@/context/todoContext";
import { ITodo } from "@/interface/note";
import { CheckCircle, Circle, CircleHalf, X } from "@phosphor-icons/react";
import { useContext } from "react";

export default function Todo({ todo }: { todo: ITodo }) {
    const { updateTodo, deleteTodo } = useContext(TodosContext)
      const { user } = useContext(AuthContext)


    return (
        <div key={todo.id} className={`flex gap-2 items-center justify-between p-2 rounded-full w-full bg-gray-500/[0.06] cursor-pointer ${ todo.status === "completed" ? "text-green-300 border border-green-300" : ""}`}>
            <div className="flex gap-2 items-center w-[85%]">
                <button>{ todo.status === "completed" ? <CheckCircle size={24}  onClick={() => updateTodo(todo.id, { ...todo, status: "pending" }, user?.email || "")} /> : todo.status === "in progress" ? <CircleHalf size={24}  onClick={() => updateTodo(todo.id, { ...todo, status: "completed" }, user?.email || "")} /> : <Circle size={24}  onClick={() => updateTodo(todo.id, { ...todo, status: "in progress" }, user?.email || "")} /> }</button>
                <input className="bg-transparent outline-none truncate flex-1" defaultValue={todo.text} onBlur={(e) => updateTodo(todo.id, { ...todo, text: e.target.value }, user?.email || "")} />
            </div>
            <button onClick={() => deleteTodo(todo.id, user?.email || "")} className="text-red-300 p-2" ><X /></button>
        </div>
    )
}