'use client'
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import { DotsThreeVertical, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext, useState } from "react";

export default function NoteCard({ note }: { note: INote }) {
    const { handleDelete } = useContext(NotesContext)
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-6 p-6 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06] mb-4 break-inside-avoid">
          <div className="relative flex justify-between">
            <Link href={`/note/?id=${note.id}`}  className="text-md font-medium">{note.title}</Link>
            <button onClick={() => setOpen(!open)} className="opacity-[0.6]"><DotsThreeVertical size={16} /></button>
            <div className={`bg-white dark:bg-dark border border-gray-500/[0.09] rounded absolute right-4 bottom-0 flex flex-col gap-1 w-[100px] overflow-hidden duration-500 ${!open ? "h-[0px] opacity-0" : "h-[40px] opacity-1"}`}>
                
                <button onClick={() => handleDelete(note.id)} className="flex gap-2 items-center text-[12px] opacity-[0.6] p-2 px-4 hover:bg-primary hover:text-white">
                    <Trash size={16} />
                    <span>Delete</span>
                </button>
            </div>
          </div>

          <Link href={`/note/?id=${note.id}`} className="flex justify-between">
            <p className="text-[12px]">{note.text}</p>
          </Link>
          
          <Link href={`/note/?id=${note.id}`} className="flex justify-between">
            <p className="opacity-[0.7] text-[12px]">{note.createdAt.toLocaleString()}</p>
          </Link>

        </div>
    )
}