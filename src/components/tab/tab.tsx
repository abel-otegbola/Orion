'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkHTMLAttributes, ReactNode } from "react";

interface tabProps extends LinkHTMLAttributes<HTMLLinkElement> {
    href: string;
    label: string;
    icon?: ReactNode;
}

export default function Tab ({ href, label, icon, ...props }: tabProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] p-[8px_16px] hover:text-primary rounded-lg duration-500
                ${pathname === href ? "text-black bg-primary/[0.09] dark:text-white" : "hover:bg-primary/[0.02]  font-light"}
                ${props.className}
            `}
        >
            <span className={`md:text-[16px] text-[24px] duration-300 ${label === "New" ? "bg-primary text-white p-3 rounded-lg": ""}`}>{icon}</span>
            <span className="md:inline hidden md:text-[12px] text-[10px] duration-500 ">{pathname === href ? 
                <>
                    <span className="md:hidden block w-1 h-1 rounded-full bg-primary"></span>
                    <span className="md:block hidden">{label}</span> 
                </>
                : label}
            </span>
        </Link>
    )
}