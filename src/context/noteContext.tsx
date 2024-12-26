'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage"
import { db } from "@/firebase/firebase"
import { INote } from "@/interface/note"
import { addDoc, AddPrefixToKeys, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { createContext, useContext, useEffect } from "react"
import { AuthContext } from "./authContext"

type notesContextProps = {
    notes: INote[];
    addNote: (newNote: INote) => void;
    updateNote: (id: string, newNote: INote) => void;
    getAllNotes: () => void;
    deleteNote: (id: string) => void
}

export const NotesContext = createContext({} as notesContextProps)

export default function NotesProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [notes, setnotes] = useLocalStorage("notes", [])
    const { user } = useContext(AuthContext)

    const addNote = async (newNote: INote) => {
        if(!user) {
            setnotes([ ...notes, { title: newNote.title, text: newNote.text, createdAt: new Date().toDateString(), updatedAt: new Date().toDateString(), user: "" } ])
        }
        else {
            try {
                const docRef = await addDoc(collection(db, "notes"), { _id: newNote._id, title: newNote.title, text: newNote.text, createdAt: new Date().toDateString(), updatedAt: new Date().toDateString(), user: user?.email });
                console.log(docRef)
                getAllNotes()
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    const updateNote = async (id: string, data: AddPrefixToKeys<string, INote>) => {
        if(!user) {
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
                getAllNotes()
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    const getAllNotes = async () => {
        try {
            const arr: {id: string}[] = []
            const querySnapshot = await getDocs(query(collection(db, "notes"), where("user", "==", user?.email)));
            querySnapshot.forEach((doc) => {
                arr.push({...doc.data(), id: doc.id})
            })
            setnotes(arr)
        }
        catch(e) {
            console.log(e)
        }
    }

    const deleteNote = async (id: string) => {
        if(!user) {
            setnotes(notes.filter((note: INote) => note.id !== id))
        }
        else {
            try {
                const docRef = await deleteDoc(doc(db, "notes", id));
                console.log(docRef)
                getAllNotes()
            }
            catch(e) {
                console.log(e)
            }
        }        
    }

    useEffect(() => {
        getAllNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, getAllNotes, deleteNote }}>
            {children}
        </NotesContext.Provider>
    )
}