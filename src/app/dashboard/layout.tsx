'use client'
import { ReactElement, useContext, useState } from "react";
import { ChartBar, FileDashed, Gear, House, Icon, SignOut, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useOutsideClick } from "@/helpers/useClickOutside";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Search from "@/components/search/search";
import Avatar from "@/components/avatar/avatar";


export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [open, setOpen] = useState(false)
    const { logOut, user } = useContext(AuthContext)
    const pathname = usePathname();

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <House />, link: "/dashboard" },
        { id: 1, label: "Documents", icon: <FileDashed />, link: "/dashboard/orders" },
        { id: 2, label: "Analytics", icon: <ChartBar />, link: "/dashboard/analytics" },
        { id: 3, label: "Settings", icon: <Gear />, link: "/settings" },
    ]

    const modalRef = useOutsideClick(setOpen, false)

    return (
        <>
            <div className="flex w-full min-h-[85vh] border-t text-[12px] border-gray-500/[0.1]">
                <div ref={modalRef} className="md:sticky top-0 left-0 h-screen md:w-[260px] w-0">
                    <button className="md:hidden fixed top-[25px] md:right-9 right-6 md:p-2 z-[10]" onClick={() => setOpen(!open)}>
                        {open ? <X size={20} className="mt-1 ml-1"/> : 
                        <Avatar user={{ id: "0", email: user?.email || "", fullname: user?.email || "user" }} />
                        }
                    </button>
                    <div className={`flex flex-col justify-between md:w-full w-[240px] md:h-screen h-[100vh] md:sticky fixed md:top-0 top-0 py-4 md:px-4 right-0 bg-gray-100/[0.1] md:dark:bg-black/[0.3] dark:bg-[#131318] border border-transparent border-x-gray-500/[0.1] overflow-hidden z-[5] transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[130%]"}`}>  
                       
                        <div className="flex flex-col gap-1">
                            <Link href="/" className="flex font-bold pb-6 md:px-[1px] px-6">
                                <Image src="/logo.svg" alt="logo" width={82} height={40} />
                            </Link>
                            <Search className="rounded-[4px] mb-4" placeholder="Search here..."/>
                            {
                            generalLinks.map(link => {
                                    return (
                                    <Link key={link.id} onClick={() => setOpen(false)} href={ link.link} className={`relative flex items-center justify-between my-[3px] px-4 py-1 md:rounded duration-500 ${pathname === link.link ? "font-medium bg-gray-500/[0.04] dark:bg-gray-500/[0.09] border border-gray-500/[0.1]" : " hover:bg-gray-500/[0.06] hover:dark:bg-gray-500/[0.09] hover:font-medium"}`}>
                                        {pathname === link.link ? <span className="h-[20px] w-[2px] bg-primary absolute -left-[2px] "></span>: ""}
                                        <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                        <span className="flex-1 py-2 break-normal">{link.label}</span>
                                    </Link>
                                    )
                            })
                            }
                        </div>
                        
                        <button onClick={() => logOut()} className={`w-full flex items-center my-[3px] px-4 py-1 hover:bg-gray-500/[0.06] hover:font-medium rounded`}>
                            <span className="w-[30px] text-lg opacity-[0.6]"><SignOut /></span>
                            <span className="py-2 break-normal">Logout</span>
                        </button>
                    </div>
                </div>

                <div className="w-full flex-1 md:p-8 md:py-4 p-4 mb-12 flex-1 bg-slate">
                {
                    children
                }
                </div>
            </div>
        </>
    )    
}
