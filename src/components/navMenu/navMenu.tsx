'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MenuProps = { 
    close: (aug0: boolean) => void; 
    list: { id: string, title: string, href: string, icon: ReactNode }[]
}

export default function Menu ({ close, list }: MenuProps) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-2 p-2 w-[150px] rounded shadow-md border border-gray/[0.3] dark:border-gray/[0.06] absolute top-12 right-0 bg-white dark:bg-dark dark:text-gray">
            { 
                list.map(item => (
                    <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => close(false)}
                        className={`flex items-center gap-2 h-[32px] p-[8px] hover:text-primary font-semibold rounded-[4px]
                            ${pathname === item.href ? "bg-tetiary dark:bg-gray/[0.08] text-primary" : ""}
                        `}
                    >
                        <span className="md:text-lg text-2xl opacity-[0.6]">{item.icon}</span>
                        <span className="md:inline">{item.title}</span>
                    </Link>
                )) 
            }
        </div>       
    )
}