'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { app } from "../firebase/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { account } from "@/appwrite/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

type values = {
    user: User;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    signIn: (email: string, password: string) => void; 
    signUp: (email: string, password: string) => void;
    socialSignIn: (type: string) => void;
    logOut: () => void;
}

export const AuthContext = createContext({} as values);

export function useUser() {
  return useContext(AuthContext);
}

const auth = getAuth(app)

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formatError = (msg: string) => {
        return msg.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
    }

    async function signIn(email: string, password: string) {
        setLoading(true)
        await account.createEmailPasswordSession(email, password)
            .then(response => {
            setPopup({ type: "success", msg: "Login successful" })
            setUser(response)
            router.push("/dashboard")
            setLoading(false)
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }

    async function signUp(email: string, password: string) {
        setLoading(true)
        await account.create(ID.unique(), email, password)
        .then(() => {
            setPopup({ type: "success", msg: "Registered successful" })
            signIn(email, password);
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }
    
    const socialSignIn = (type: string) => {
        setLoading(true)
        if(type === "Google") {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
            .then(() => {
                setPopup({ type: "success", msg:  "Login Successful" })
                setLoading(false)

            })
            .catch(error => {
                setPopup({ type: "error", msg: formatError(error.message) })
                setLoading(false)
            })
        }
    }

    async function logOut() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(popup.type === "success") {
            toast.success(popup.msg)
        }
        else if(popup.type === "error") {
            toast.error(popup.msg)
        }
    }, [popup])

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, signIn, signUp, socialSignIn, logOut }}>
            <Toaster containerClassName="p-8" />
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;