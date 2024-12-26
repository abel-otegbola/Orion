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
  const [newNote, setNewNote] = useState<INote>({} as INote)
  const { notes, addNote, updateNote } = useContext(NotesContext)
  const { user } = useContext(AuthContext)
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || ""
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if(!saved) {
      addNote({ id, title: "", text: "" } as INote, user?.email || "")
      setSaved(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(newNote?._id) {
      updateNote(newNote?._id, newNote, user?.email || "")
    }
    else {
      setNewNote(notes.filter((note: INote) => note.id === id)[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newNote])

  return (
      <div className="md:px-10 px-6 flex md:flex-nowrap flex-wrap gap-6 py-[60px]">
          <div className="md:w-[70%] w-full flex flex-col gap-4 items-center">
            <Input onBlur={(e) => setNewNote({ ...newNote, title: e.target.value })} placeholder="Title" className="rounded border-gray-500/[0.09]"/>
            
            <TextEditor text={newNote?.text} setText={(value: string) => setNewNote({ ...newNote, text: value })} />
          </div>

          <div className="md:w-[30%] w-full p-4 rounded-lg border border-gray-500/[0.2]">
            <h1>AI Summary</h1>
            <h1>Create Flashcards</h1>
          </div>
      </div>
  )
}