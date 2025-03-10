'use client'

import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Footer() {
    const pathname  = usePathname()

    return (
        <footer className={`bg-[#202018] dark:bg-black/[0.4] border border-gray-500/[0.1] text-white md:mt-[100px] ${pathname.indexOf("/dashboard") !== -1 ? "hidden" : ""}`}>
            <div className="grid md:grid-cols-3 items-center md:gap-[30px] gap-[30px] md:px-[8%] p-8 py-[60px]">
                <ul className="flex md:flex-row flex-col gap-[16px] text-[12px]">
                    <li className=""><a href="/" className="py-[5px] w-full">Features</a></li>
                    <li className=""><a href="/" className="py-[5px] w-full">Privacy</a></li>
                    <li className=""><a href="/about" className="py-[5px] w-full">Terms</a></li>
                </ul>
                <Link href="/" className="flex md:justify-center font-bold">
                    <Image src="/logo.svg" alt="logo" width={82} height={20} />
                </Link>
                <div className="flex gap-4 md:justify-end">
                    <a href="https://facebook.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></a>
                    <a href="https://twitter.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></a>
                    <a href="https://instagram.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></a>
                </div>
            </div>
            <div className="border-t border-gray-500/[0.2] text-center">
                <p className="px-[3%] py-10 flex items-center font-bold gap-2 justify-center">Flashnotes &copy; Copyright  {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;