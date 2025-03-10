'use client'
// import { TodosContext } from "@/context/todoContext";
import { ITodo } from "@/interface/note";
// import { Trash } from "@phosphor-icons/react";
import Link from "next/link";
// import { useContext } from "react";

export default function TodoCard({ todo, i }: { todo: ITodo, i: number }) {
    // const { deleteTodo } = useContext(TodosContext)
    

    return (
      <div key={todo.id} className={`flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] ${i === 0 ? "text-white bg-gradient-to-tr from-primary to-fuchsia-600" : "bg-white dark:bg-dark shadow-md"}`}>
      <p className="text-[8px]">{todo.createdAt}</p>
      <div className="flex flex-col gap-4 py-1">
        <Link href="/todos" className="font-semibold text-md">{todo.title}</Link>
        <div className="flex justify-between items-center">
          <p className="opacity-[0.7] text-[10px] py-1 flex-1 flex items-end">1245</p>
          <p className="opacity-[0.7] text-[10px] py-1 flex-1 flex items-end">10 Flashcards</p>
        </div>
        <Link href="/todos" className="font-semibold text-[10px]">{todo.description}</Link>
      </div>
      <div className="flex flex-1 items-end">
        <span className={`w-[24px] h-[24px] rounded-full border-2 ${i === 0 ? "border-white bg-primary" : "border-black dark:border-gray-500 bg-white"}`}></span>
        <span className={`w-[24px] h-[24px] rounded-full border-2 ${i === 0 ? "border-white bg-primary" : "border-black dark:border-gray-500 bg-white"} -ml-[6px]`}></span>
        <span className={`w-[24px] h-[24px] rounded-full border-2 ${i === 0 ? "border-white bg-primary" : "border-black dark:border-gray-500 bg-white"} -ml-[6px]`}></span>
      </div>
    </div>
    )
}