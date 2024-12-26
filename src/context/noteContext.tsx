'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { db } from "@/firebase/firebase"
import { INote } from "@/interface/note"
import { addDoc, AddPrefixToKeys, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { createContext } from "react"

type notesContextProps = {
    notes: INote[];
    addNote: (newNote: INote, user: string) => void;
    updateNote: (id: string, newNote: INote, user: string) => void;
    getAllNotes: (user: string) => void;
    deleteNote: (id: string, user: string) => void
}

export const NotesContext = createContext({} as notesContextProps)

export default function NotesProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [notes, setnotes] = useLocalStorage("notes", [])

    const addNote = async (newNote: INote, user: string) => {
        if(newNote.id && notes.map((note: INote) => note.id).indexOf(newNote.id) === -1) {
            if(user === "") {
                setnotes([ ...notes, { id: newNote.id, title: newNote.title, text: newNote.text, createdAt: new Date().toDateString(), updatedAt: new Date().toDateString(), user: "" } ])
            }
            else {
                try {
                    const docRef = await addDoc(collection(db, "notes"), { id: newNote.id, title: newNote.title, text: newNote.text, createdAt: new Date().toDateString(), updatedAt: new Date().toDateString(), user });
                    console.log(docRef)
                    getAllNotes(user)
                }
                catch(e) {
                    console.log(e)
                }
            }
        }
    }

    const updateNote = async (id: string, data: AddPrefixToKeys<string, INote>, user: string) => {
        if(user === "") {
            setnotes(notes.map((note: INote) => {
                if(note.id === id) {
                    return data
                }
                else return note
            }))
        }
        else {
            try {
                const docRef = await updateDoc(doc(db, "notes", id), data);
                console.log(docRef)
                getAllNotes(user)
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    const getAllNotes = async (user: string) => {
        try {
            const arr: {id: string, _id: string}[] = []
            const querySnapshot = await getDocs(query(collection(db, "notes"), where("user", "==", user)));
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.data().id, _id: doc.id})
            })
            setnotes(arr)
        }
        catch(e) {
            console.log(e)
        }
    }

    const deleteNote = async (id: string, user: string) => {
        if(user === "") {
            setnotes(notes.filter((note: INote) => note.id !== id))
        }
        else {
            try {
                const docRef = await deleteDoc(doc(db, "notes", id));
                console.log(docRef)
                getAllNotes(user)
            }
            catch(e) {
                console.log(e)
            }
        }
        
    }

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, getAllNotes, deleteNote }}>
            {children}
        </NotesContext.Provider>
    )
}