'use client'
import { ReactNode, useEffect } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Bell, Gear, Headphones, House, Info } from "@phosphor-icons/react"
import Button from "../button/button"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

function Topbar() {

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const navTabs: navTab[] = [
        { id: 0, label: "Home", to: "/", icon: <House /> },
        { id: 1, label: "About", to: "/about", icon: <Info /> },
        { id: 2, label: "Contact", to: "/contact", icon: <Headphones /> },
    ]
    

    return (
        <div className="flex py-4 md:px-[8%] px-6 justify-between items-center border-b border-gray-500/[0.1]">
            <div className="md:w-[17%]">
                <Link href="/" className="px-6 w-fit h-[40px] md:bg-primary/[0.04] rounded flex justify-center items-center font-bold">Logo</Link>
            </div>

            <nav className="md:flex items-center gap-4 hidden">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center">
                <Link href="/inbox">
                    <Bell size={20}/>
                </Link>
                <Link href="/settings">
                    <Gear size={20}/>
                </Link>
                <Button >Login</Button>
            </div>
        </div>
    )
}

export default Topbar;