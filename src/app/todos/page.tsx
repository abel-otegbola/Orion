'use client'
import Button from "@/components/button/button";
import Search from "@/components/search/search";
import Textarea from "@/components/textarea/textarea";
import Todo from "@/components/todo/todo";
import { AuthContext } from "@/context/authContext";
import { TodosContext } from "@/context/todoContext";
import { ITodo } from "@/interface/note";
import { useContext, useEffect, useState } from "react";

export default function TodosPage () {
  const { todos, addNewTodo, getAllTodos } = useContext(TodosContext)
  const [search, setSearch] = useState<ITodo[]>(todos)
  const [newTodo, setNewTodo] = useState("")
  const { user } = useContext(AuthContext)

  const handleSearch = (query: string) => {
    setSearch(todos.filter(todo => todo.text.toUpperCase().indexOf(query.toUpperCase()) !== -1))
  }

  useEffect(() => {
    setSearch(todos)
  }, [todos])

  useEffect(() => {
    getAllTodos(user?.email || "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email])

  return (
      <div className="md:px-[8%] px-6 grid md:grid-cols-2 gap-6 py-[60px]">

          <div className="flex flex-col gap-2">
            <Search placeholder="Search todos" onChange={(e) => handleSearch(e)} className="bg-gray-500/[0.05] border-gray-500/[0.1] mb-4" />
            {
              search.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))
            }
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Textarea onChange={(e) => setNewTodo(e.target.value)} value={newTodo} placeholder="Add new todo" />
            <Button className="rounded-[30px]" onClick={() => {addNewTodo(newTodo, user?.email || ""); setNewTodo("")}}>Click to add</Button>
          </div>
      </div>
  )
}