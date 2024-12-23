'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { Iflashcard } from "@/interface/note"
import { createContext } from "react"

type flashcardsContextProps = {
    flashcards: Iflashcard[];
    addNewFlashcard: (newflashcard: string) => void;
    handleComplete: (id: string, status: string) => void;
    handleDelete: (id: string) => void
}

export const flashcardsContext = createContext({} as flashcardsContextProps)

export default function FlashcardsProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [flashcards, setFlashcards] = useLocalStorage("flashcards", [ 
        {id: "0", text: "Design Signoff", createdAt: "", updatedAt: "", status: "completed", duration: "", user: "" },
        {id: "1", text: "Development", createdAt: "", updatedAt: "", status: "in progress", duration: "", user: "" },
        {id: "2", text: "User Research", createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" },
    ])

    const addNewFlashcard = (newflashcard: string) => {
        setFlashcards([ ...flashcards, { id: flashcards.length.toString(), text: newflashcard, createdAt: "", updatedAt: "", status: "pending", duration: "", user: "" } ])
    }
    
    const handleComplete = (id: string, status: string) => {
        setFlashcards(flashcards.map((flashcard: Iflashcard) => {
            if(flashcard.id === id) {
            return { ...flashcard, status: status }
            }
            else return flashcard
        }))
    }
    
    const handleDelete = (id: string) => {
        setFlashcards(flashcards.filter((flashcard: Iflashcard) => flashcard.id !== id))
    }


    return (
        <flashcardsContext.Provider value={{ flashcards, addNewFlashcard, handleComplete, handleDelete }}>
            {children}
        </flashcardsContext.Provider>
    )
}