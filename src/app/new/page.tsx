'use client'
import TextEditor from "@/components/editor/quillEditor";
import Input from "@/components/input/input";
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export default function NewNotePage () {
  const [newNote, setNewNote] = useState<INote>({} as INote)
  const { addNewNote } = useContext(NotesContext)

  useEffect(() => {
    addNewNote(newNote)
  }, [newNote])

  return (
      <div className="md:px-[8%] px-6 flex md:flex-nowrap flex-wrap gap-6 py-[60px]">
          <div className="md:w-[70%] w-full flex flex-col gap-4 items-center">
            <Input onChange={(e) => setNewNote({ ...newNote, title: e.target.value, id: !newNote.id ? v4() : newNote.id })} placeholder="Title" className="rounded border-gray-500/[0.09]"/>
            
            <TextEditor text={newNote.text} setText={(value: string) => setNewNote({ ...newNote, text: value })} />
          </div>

          <div className="md:w-[30%] w-full p-4 rounded-lg border border-gray-500/[0.2]">
            <h1>AI Summary</h1>
            <h1>Create Flashcards</h1>
          </div>
      </div>
  )
}