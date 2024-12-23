'use client'
import Input from "@/components/input/input";
import Textarea from "@/components/textarea/textarea";
import { NotesContext } from "@/context/noteContext";
import { INote } from "@/interface/note";
import { Highlighter, Image, Link, ListBullets, TextAUnderline, TextBolder, TextItalic, TextUnderline, VideoCamera } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function NewNotePage () {
  const [note, setNote] = useState<INote>({} as INote)
  const { addNewNote, notes } = useContext(NotesContext)
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  useEffect(() => {
    addNewNote(note)
  }, [note])

  useEffect(() => {
    setNote(notes.filter((note: INote) => note.id === id)[0])
  }, [id])

  return (
      <div className="md:px-[8%] px-6 grid md:grid-cols-2 gap-6 py-[60px]">
          <div className="flex flex-col gap-4 items-center">
            <Input onChange={(e) => setNote({ ...note, title: e.target.value })} value={note.title} placeholder="Title" className="border-gray-500/[0.09] rounded"/>
            <Textarea onChange={(e) => setNote({ ...note, text: e.target.value })} value={note.text} placeholder="Start typing..." className="border-gray-500/[0.1] h-[400px] py-3 rounded-lg" />
            <div className="grid grid-cols-9 gap-1 p-1 border border-gray-500/[0.1] rounded w-full">
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><TextAUnderline size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><TextBolder size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><TextItalic size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><TextUnderline size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><ListBullets size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><Highlighter size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><Image size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><VideoCamera size={20} /></button>
              <button className="p-2 bg-[#474552]/[0.09] rounded flex justify-center opacity-[0.7]"><Link size={20} /></button>
            </div>
          </div>
      </div>
  )
}