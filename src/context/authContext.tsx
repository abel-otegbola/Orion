'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { app } from "../firebase/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";

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

const auth = getAuth(app)

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formatError = (msg: string) => {
        return msg.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
    }

    const signIn = (email: string, password: string) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setPopup({ type: "success", msg: "Login Successful" })
            setLoading(false)
            router.push("/dashboard")
        })
        .catch((error) => {
            setPopup({ type: "error", msg: formatError(error.message) })
            setLoading(false)
        });
    }

    const signUp = (email: string, password: string) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setLoading(false)
            router.push("/dashboard")
        })
        .catch((error) => {
            setPopup({ type: "error", msg: formatError(error.message) })
            setLoading(false)
        });
    }
    
    const socialSignIn = (type: string) => {
        setLoading(true)
        if(type === "Google") {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
            .then(() => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // const user = result.user
                setPopup({ type: "success", msg:  "Login Successful" })
                setLoading(false)

            })
            .catch(error => {
                setPopup({ type: "error", msg: formatError(error.message) })
                setLoading(false)
            })
        }
    }

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setPopup({ type: "success", msg:  "Logout Successful" })
          }).catch((error) => {
            setPopup({ type: "error", msg: formatError(error.message) })
          });
    }

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
        })
    }, [setUser]);

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
      }, [popup]);

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, signIn, signUp, socialSignIn, logOut }}>
            <Toaster containerClassName="p-8" />
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;