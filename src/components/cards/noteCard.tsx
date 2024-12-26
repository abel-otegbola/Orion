'use client'
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import { Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";

export default function NoteCard({ note }: { note: INote }) {
    const { deleteNote } = useContext(NotesContext)
    

    return (
        <div className="flex flex-col gap-6 md:p-4 p-3 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06] mb-4 break-inside-avoid">
          <div className="relative flex justify-between">
            <Link href={`/note/?id=${note.id}`}  className="text-[14px] font-semibold">{note.title}</Link>
            <button onClick={() => deleteNote(note.id)} className="opacity-[0.6]"><Trash size={16} /></button>
          </div>

          <Link href={`/note/?id=${note.id}`} className="flex justify-between">
            <div className="text-[12px]" dangerouslySetInnerHTML={{ __html: note.text }} ></div>
          </Link>
          
          <Link href={`/note/?id=${note.id}`} className="flex justify-between p-1">
            <p className="opacity-[0.7] text-[12px]">{note.createdAt.toLocaleString()}</p>
          </Link>

        </div>
    )
}