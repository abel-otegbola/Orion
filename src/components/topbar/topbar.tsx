'use client'
import { ReactNode, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Bell, Gear, House, Note, Plus, UserCircle } from "@phosphor-icons/react"
import Avatar from "../avatar/avatar"
import { usePathname } from "next/navigation"
import Search from "../search/search"
import { useOutsideClick } from "@/helpers/useClickOutside"

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
        <div className={`flex py-2 pt-4 md:static fixed top-0 left-0 w-full justify-between items-center bg-white border-b border-gray-500/[0.1] dark:bg-black z-[3] ${accountPages.includes(pathname.split("/")[1]) ? "md:px-10 pl-6 pr-[100px] md:py-2 py-5" : "md:px-[8%] px-6"}`}>
            <div className="md:w-[17%]">
                <Link href="/" className="w-[70px] h-[30px] rounded flex justify-center text-[16px] px-2 items-center font-bold">
                    Flashnotes
                </Link>
            </div>

            <nav className="flex justify-between md:static p-4 bg-white/[0.9] dark:bg-black/[0.9] backdrop-blur-sm fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center">
                <Search placeholder="Search notes" className="md:flex hidden" />
                <Link href="/inbox">
                    <Bell weight="light" size={20}/>
                </Link>
                <div ref={closeMenu} className={`relative ${accountPages.includes(pathname.split("/")[1]) ? "md:block hidden" : "block"}`}>
                    <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                        <Avatar user={{id: "", email: "", fullname: "user" }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Topbar;