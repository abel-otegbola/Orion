'use client'
import { ReactNode, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Gear, SignIn, SignOut } from "@phosphor-icons/react"
import Avatar from "../avatar/avatar"
import { useOutsideClick } from "@/helpers/useClickOutside"
import Menu from "../navMenu/navMenu"
import { NoteBlank } from "@phosphor-icons/react/dist/ssr"
import { AuthContext } from "@/context/authContext"
import Button from "../button/button"
import Image from "next/image"
import { usePathname } from "next/navigation"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon?: ReactNode
}

function Topbar() {
    const [open, setOpen] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const navTabs: navTab[] = [
        { id: 0, label: "Home", to: "/" },
        { id: 1, label: "Features", to: "/features" },
        { id: 2, label: "About Us", to: "/about"},
        { id: 3, label: "Contact Us", to: "/contact" },
    ]

    const closeMenu = useOutsideClick(setOpen, false)
    const pathname  = usePathname()

    return (
        <div className={`flex sticky top-0 bg-white/[0.7] dark:bg-dark/[0.7] backdrop-blur-sm left-0 w-full justify-between items-center z-[3] md:py-1 py-3 ${pathname.indexOf("/dashboard") !== -1 ? "hidden" : "md:px-[8%] px-6"}`}>
            <div className="md:w-[27%]">
                <Link href="/" className="h-[30px] rounded flex flex-col justify-center px-2 font-bold">
                    <Image src="/logo.svg" alt="logo" width={82} height={40} />
                    {/* <p>Hi 👋, {user?.email?.split("@")[0]}</p>
                    <p>Welcome back</p> */}
                </Link>
            </div>

            <nav className="flex justify-between md:static flex-1 items-center w-full p-4 fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center justify-end flex-1">
                <Button href={`/new`} className="max-[500px]:hidden">New note</Button>
                <div ref={closeMenu} className={`relative`}>
                    <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                        <Avatar user={{id: "0", email: user?.email || "", fullname: user?.email?.split("@")[0] || "user" }} />
                    </button>
                    {
                        open ? <Menu list={
                            [
                                {id: "1", title: "Notes", icon: <NoteBlank />, href: "/"},
                                {id: "2", title: "Settings", icon: <Gear />, href: "/settings"},
                                user ? {id: "3", title: "Logout", icon: <SignOut />, href: "#"} : {id: "0", title: "Login", icon: <SignIn />, href: "/login"},
                            ]
                        } close={setOpen} /> 
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Topbar;