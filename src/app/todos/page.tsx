'use client'
import Button from "@/components/button/button";
import Search from "@/components/search/search";
import Textarea from "@/components/textarea/textarea";
import { ITodo } from "@/interface/note";
import { CheckCircle, Circle, CircleHalf, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function TodosPage () {
  const [todos, setTodos] = useState<ITodo[]>([ 
    {id: "0", text: "Design Signoff", createdAt: "", updatedAt: "", status: "completed", duration: "", user: "" },
    {id: "1", text: "Development", createdAt: "", updatedAt: "", status: "in progress", duration: "", user: "" },
    {id: "2", text: "User Research", createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" },
  ])
  const [search, setSearch] = useState<ITodo[]>(todos)
  const [newTodo, setNewTodo] = useState("")

  const addNewTodo = () => {
    setTodos([ ...todos, { id: todos.length.toString(), text: newTodo, createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" } ])
  }

  const handleSearch = (query: string) => {
    setSearch(todos.filter(todo => todo.text.toUpperCase().indexOf(query.toUpperCase()) !== -1))
  }

  useEffect(() => {
    setSearch(todos)
  }, [todos])

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleComplete = (id: string, status: string) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return { ...todo, status: status }
      }
      else return todo
    }))
  }

  return (
      <div className="md:px-[8%] px-6 grid md:grid-cols-2 gap-6 py-[60px]">

          <div className="flex flex-col gap-2">
            <Search placeholder="Search todos" onChange={(e) => handleSearch(e)} className="bg-gray-500/[0.05] border-gray-500/[0.1] mb-4" />
            {
              search.map(todo => (
                <div key={todo.id} className={`flex gap-2 items-center justify-between p-2 rounded-full w-full bg-gray-500/[0.09] cursor-pointer ${ todo.status === "completed" ? "text-green-600 border border-green-400" : ""}`}>
                  <div className="flex gap-2 items-center">
                    <button>{ todo.status === "completed" ? <CheckCircle size={24}  onClick={() => handleComplete(todo.id, "pending")} color="green" /> : todo.status === "in progress" ? <CircleHalf size={24} onClick={() => handleComplete(todo.id, "completed")} /> : <Circle size={24} onClick={() => handleComplete(todo.id, "in progress")}  /> }</button>
                    <p>{todo.text}</p>
                  </div>
                  <button onClick={() => handleDelete(todo.id)} className="text-red-500 p-2" ><Trash /></button>
                </div>
                ))
            }
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Textarea onChange={(e) => setNewTodo(e.target.value)} placeholder="Add new todo" />
            <Button className="rounded-[30px]" onClick={() => addNewTodo()}>Click to add</Button>
          </div>
      </div>
  )
}