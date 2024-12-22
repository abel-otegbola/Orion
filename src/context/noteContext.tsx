'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { INote } from "@/interface/note"
import { createContext } from "react"

type notesContextProps = {
    notes: INote[];
    addNewNote: (newNote: INote) => void;
    handleDelete: (id: string) => void
}

export const NotesContext = createContext({} as notesContextProps)

export default function NotesProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [notes, setnotes] = useLocalStorage("notes", [])

    const addNewNote = (newNote: INote) => {
        if(notes.map((note: INote )=> note.id).indexOf(newNote.id) !== -1) {
            updateNote(newNote.id, newNote)
        }
        else {
            addNote(newNote)
        }
    }

    const addNote = (newNote: INote) => {
        setnotes([ ...notes, { id: newNote.id, title: newNote.title, text: newNote.text, createdAt: new Date(), updatedAt: new Date(), user: "" } ])
    }

    const updateNote = (id: string, newNote: INote) => {
        setnotes(notes.map((note: INote) => {
            if(note.id === id) {
                return { ...note, updatedAt: new Date(), title: newNote.title, text: newNote.text }
            }
            else return note
        }))
    }
    
    const handleDelete = (id: string) => {
        setnotes(notes.filter((note: INote) => note.id !== id))
    }


    return (
        <NotesContext.Provider value={{ notes, addNewNote, handleDelete }}>
            {children}
        </NotesContext.Provider>
    )
}