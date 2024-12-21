'use client'
import { ReactNode, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Gear, House, Note, Plus, User, UserCircle } from "@phosphor-icons/react"
import Avatar from "../avatar/avatar"
import { usePathname } from "next/navigation"
import Search from "../search/search"
import { useOutsideClick } from "@/helpers/useClickOutside"
import Menu from "../navMenu/navMenu"
import { NoteBlank } from "@phosphor-icons/react/dist/ssr"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

function Topbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const navTabs: navTab[] = [
        { id: 0, label: "Home", to: "/", icon: <House/> },
        { id: 1, label: "Notes", to: "/notes", icon: <Note/> },
        { id: 2, label: "New", to: "/new", icon: <Plus/> },
        { id: 3, label: "Settings", to: "/settings", icon: <Gear/> },
        { id: 4, label: "Account", to: "/dashboard", icon: <UserCircle/> },
    ]
    
    const accountPages = ["dashboard", "admin", "agent"]

    const closeMenu = useOutsideClick(setOpen, false)


    return (
        <div className={`flex py-3 md:static fixed top-0 left-0 w-full justify-between items-center bg-white border-b border-gray-500/[0.1] dark:bg-black z-[3] ${accountPages.includes(pathname.split("/")[1]) ? "md:px-10 pl-6 pr-[100px] md:py-2 py-5" : "md:px-[8%] px-6"}`}>
            <div className="md:w-[17%]">
                <Link href="/" className="h-[30px] rounded flex flex-col justify-center px-2 font-bold">
                    <p>Hi 👋, Abel</p>
                    <p>Welcome back</p>
                </Link>
            </div>

            <nav className="flex justify-between md:hidden p-4 bg-white dark:bg-black fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center">
                <Search placeholder="Search notes" className="md:flex hidden" />
                <div ref={closeMenu} className={`relative ${accountPages.includes(pathname.split("/")[1]) ? "md:block hidden" : "block"}`}>
                    <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                        <Avatar user={{id: "", email: "", fullname: "user" }} />
                    </button>
                    {
                        open ? <Menu list={
                            [
                                {id: "0", title: "Account", icon: <User />, href: "/dashboard"},
                                {id: "1", title: "Notes", icon: <NoteBlank />, href: "/"},
                                {id: "0", title: "Settings", icon: <Gear />, href: "/settings"},
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