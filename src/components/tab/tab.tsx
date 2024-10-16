'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkHTMLAttributes, ReactNode } from "react";

interface tabProps extends LinkHTMLAttributes<HTMLLinkElement> {
    href: string;
    label: string;
    icon?: ReactNode;
}

export default function Tab ({ href, label, icon }: tabProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] p-[8px_16px] hover:text-primary font-semibold rounded-full
                ${pathname === href ? "md:bg-primary/[0.04] text-primary border border-primary/[0.09]" : ""}
            `}
        >
            <span className="md:text-lg text-2xl opacity-[0.6]">{icon}</span>
            <span className="md:inline md:text-[14px] text-[10px]">{label}</span>
        </Link>
    )
}