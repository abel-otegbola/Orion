'use client'
import { ReactNode, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import Avatar from "../avatar/avatar"
import { useOutsideClick } from "@/helpers/useClickOutside"
import Menu from "../navMenu/navMenu"
import { AuthContext } from "@/context/authContext"
import { usePathname } from "next/navigation"
import HomeIcon from "@/assets/icons/home"
import SettingsIcon from "@/assets/icons/settings"
import FileIcon from "@/assets/icons/file"
import CalendarIcon from "@/assets/icons/calendar"
import BellIcon from "@/assets/icons/bell"
import ThemeSelector from "../themeSelector/themeSelector"
import Image from "next/image"
import LogoutIcon from "@/assets/icons/logout"

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
        { id: 0, label: "Home", icon: <HomeIcon />, to: "/" },
        { id: 1, label: "Messages", icon: <BellIcon />, to: "/inbox"},
        { id: 2, label: "About", icon: <FileIcon />, to: "/about"},
        { id: 3, label: "Contact", icon: <CalendarIcon />, to: "/contact" },
    ]

    const closeMenu = useOutsideClick(setOpen, false)
    const pathname  = usePathname()

    return (
        <div className={`flex sticky top-0 bg-white/[0.7] dark:bg-dark/[0.7] backdrop-blur-sm left-0 w-full border border-gray-500/[0.1] justify-between items-center z-[3] md:py-1 py-3 ${pathname.indexOf("/dashboard") !== -1 ? "hidden" : "md:px-[5%] px-6"}`}>
            <div className="md:w-[33%]">
                <Link href="/" className="rounded text-[20px] flex flex-col justify-center px-2 font-bold">
                    <Image src="/logo.png" alt="logo" width={60} height={20} />
                    {/* <p>Hi 👋, {user?.email?.split("@")[0]}</p>
                    <p>Welcome back</p> */}
                </Link>
            </div>

            <nav className="flex justify-between md:static flex-1 items-center w-full md:p-2 p-4 fixed bottom-20 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center justify-end flex-1">
                <ThemeSelector />
                <div ref={closeMenu} className={`relative`}>
                    <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                        <Avatar user={{id: "0", email: user?.email || "", fullname: user?.email?.split("@")[0] || "a" }} />
                    </button>
                    {
                        open ? <Menu list={
                            [
                                user ? {id: "1", title: "Dashboard", icon: <HomeIcon />, href: "/dashboard"} : {id: "0", title: "Get started", icon: <LogoutIcon />, href: "/login"},
                                {id: "2", title: "Settings", icon: <SettingsIcon />, href: "/settings"},
                                user ? {id: "3", title: "Logout", icon: <LogoutIcon />, href: "#"} : {id: "4", title: "Login", icon: <LogoutIcon />, href: "/login"},
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