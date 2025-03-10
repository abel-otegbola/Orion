'use client'
import Input from "@/components/input/input";
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useState } from "react";
import { v7 } from "uuid";

const TextEditor = dynamic(() => import("@/components/editor/quillEditor"),  { ssr: false });


export default function NewNotePage () {
  const [newNote, setNewNote] = useState<INote>({} as INote)
  const { notes, addNote, updateNote } = useContext(NotesContext)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      addNote({ _id: v7(), title: newNote?.title || "", text: newNote?.text || "" } as INote);
      initialized.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(newNote)
    if(newNote?.id) {
      updateNote(newNote?.id, newNote)
    }
    else {
      setNewNote(notes.filter((note: INote) => note._id !== newNote?._id)[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newNote])

  return (
      <div className="md:px-[8%] px-6 flex md:flex-nowrap flex-wrap gap-6 py-[60px]">
          <div className="md:w-[70%] w-full flex flex-col gap-4 items-center">
            <Input onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} placeholder="Title" className="rounded border-gray-500/[0.09]"/>
            
            <TextEditor text={newNote?.text} setText={(value: string) => setNewNote({ ...newNote, text: value })} />
          </div>

          <div className="md:w-[30%] w-full p-4 rounded-lg border border-gray-500/[0.2]">
            <h1>AI Summary</h1>
            <h1>Create Flashcards</h1>
          </div>
      </div>
  )
}