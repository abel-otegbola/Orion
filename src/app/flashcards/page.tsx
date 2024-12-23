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
      <div className="md:px-[8%] px-4 grid md:grid-cols-2 gap-6 py-[60px]">

          <div className="relative w-full flex flex-col gap-2">
            <Slider images={flashcards} />
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Textarea onChange={(e) => setNewflashcard(e.target.value)} value={newflashcard} placeholder="Add new flashcard" />
            <Button className="rounded-[30px]" onClick={() => {addNewFlashcard(newflashcard); setNewflashcard("")}}>Click to add</Button>
          </div>
      </div>
  )
}