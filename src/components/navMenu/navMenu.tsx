'use client'

import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";

type MenuProps = { 
    close: (aug0: boolean) => void; 
    list: { id: string, title: string, href: string, icon: ReactNode }[]
}

export default function Menu ({ close, list }: MenuProps) {
    const pathname = usePathname()
    const { logOut } = useContext(AuthContext)

    return (
        <div className="flex flex-col gap-1 py-2 w-[160px] rounded shadow-md border border-gray-500/[0.1] absolute top-12 right-0 bg-white dark:bg-dark dark:text-gray z-[10]">
            { 
                list.map(item => (
                    <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => item.title === "Logout" ? logOut() : close(false)}
                        className={`flex items-center gap-2 h-[36px] p-[8px] hover:text-primary font-medium
                            ${pathname === item.href ? "bg-gray-500/[0.09] dark:bg-dark text-primary" : ""}
                        `}
                    >
                        <span className="opacity-[0.6]">{item.icon}</span>
                        <span className="md:inline text-[12px]">{item.title}</span>
                    </Link>
                )) 
            }
        </div>       
    )
}