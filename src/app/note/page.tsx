'use client'
import Input from "@/components/input/input";
import { AuthContext } from "@/context/authContext";
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const TextEditor = dynamic(() => import("@/components/editor/quillEditor"),  { ssr: false });

export default function NewNotePage () {
  const [note, setNote] = useState<INote>({} as INote)
  const { updateNote, notes } = useContext(NotesContext)
  const { user } = useContext(AuthContext)
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  useEffect(() => {
    updateNote(note.id, note, user?.email || "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  useEffect(() => {
    setNote(notes.filter((note: INote) => note.id === id)[0])
  }, [id, notes])

  return (
      <div className="md:px-[8%] px-6 grid md:grid-cols-2 gap-6 py-[60px]">
          <div className="flex flex-col gap-4 items-center">
            <Input onBlur={(e) => setNote({ ...note, title: e.target.value })} value={note.title} placeholder="Title" className="border-gray-500/[0.09] rounded"/>
            
            <TextEditor text={note.text} setText={(value: string) => setNote({ ...note, text: value })} />
          </div>
      </div>
  )
}