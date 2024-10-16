'use client'
import { Apple01Icon, Facebook01Icon, InstagramIcon, MasterCardIcon, PaypalIcon, TwitterIcon, VineSquareIcon } from "hugeicons-react";


function Footer() {
    return (
        <footer className="bg-black dark:bg-[#000]/[0.2] text-[#D9D9F2]">
            <div className="grid grid-cols-2 text-[12px] gap-[30px] py-[30px] md:px-[9%] px-[3%] border border-transparent border-t-gray-700/[0.09] dark:border-t-gray-100/[0.09]">
                <ul className="w-full">
                    <h2 className="py-2 font-semibold uppercase">Navigations</h2>
                    <li className="flex w-full"><a href="/shop?query=Sweatshirts" className="py-[5px] w-full">Home</a></li>
                    <li className="flex w-full"><a href="/shop?query=academics" className="py-[5px] w-full">About</a></li>
                    <li className="flex w-full"><a href="/shop?query=joggers" className="py-[5px] w-full">Shop</a></li>
                    <li className="flex w-full"><a href="/shop?query=hoddies" className="py-[5px] w-full">Contact Us</a></li>
                </ul>
                <ul className="w-full">
                    <div className="flex flex-wrap gap-4 py-4 text-">
                        <a href="https://facebook.com/"><Facebook01Icon /></a>
                        <a href="https://twitter.com/"><TwitterIcon /></a>
                        <a href="https://instagram.com/"><InstagramIcon /></a>
                    </div>
                    <p className="py-1">Agege, Lagos, Nigeria</p>
                    <a href="tel:+2347060989331" className="block py-1">+2348160301851</a>
                    <a href="mailto:suppercaseort@ennovate.com" className="block py-1">Support@boilerplate.com</a>
                    <div className="flex flex-wrap gap-4 py-4 text-[25px]">
                        <PaypalIcon className="text-blue-500"/>
                        <MasterCardIcon className="text-[#FF5F00]"/>
                        <VineSquareIcon className="text-[#1434CB]"/>
                        <Apple01Icon />
                    </div>
                </ul>
            </div>
            <div className="bg-[#000]/[0.2] text-white text-center">
                <p className="px-[3%] py-3 flex items-center gap-2 justify-center">Nextjs boilerplate &copy; Copyright  {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;