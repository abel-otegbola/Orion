'use client'
import Button from "@/components/button/button";
import Slider from "@/components/slider/slider";
import Textarea from "@/components/textarea/textarea";
import { flashcardsContext } from "@/context/flashcardContext";
import { useContext, useState } from "react";

export default function Flashcardsage () {
  const { flashcards, addNewFlashcard } = useContext(flashcardsContext)
  const [newflashcard, setNewflashcard] = useState("")

  return (
      <div className="md:px-10 px-6 flex md:flex-nowrap flex-wrap gap-6 py-[60px]">

          <div className="md:w-[70%] w-full flex flex-col gap-2">
            <Slider images={flashcards} />
          </div>

          <div className="md:sticky top-4 right-0 md:w-[30%] w-full h-fit flex flex-col gap-4 items-center p-4 border border-gray-500/[0.1] rounded-[12px]">
            <Textarea onChange={(e) => setNewflashcard(e.target.value)} value={newflashcard} placeholder="Add new flashcard" />
            <Button className="rounded-[30px]" onClick={() => {addNewFlashcard(newflashcard); setNewflashcard("")}}>Click to add</Button>
          </div>
      </div>
  )
}