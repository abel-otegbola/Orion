import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tetiary";
    className?: string;
    href?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean,
    onClick?: () => void,
    children?: ReactNode
}

export default function Button({ variant, className, href, size, disabled, onClick, children, ...props }: buttonProps) {
    const variants = {
        primary: "hover:bg-black hover:text-white border border-gray-500/[0.3]",
        secondary: "bg-black text-white hover:bg-black/[0.8] border border-black dark:border-white/[0.1]",
        tetiary: "bg-gray-500/[0.09] hover:bg-gray-500/[0.2] border border-gray-500/[0.09] "
    }

    return (
        <button className={` 
             text-nowrap relative p-[2px] overflow-hidden rounded-lg 
        `}
        {...props}
        name="Button"
        role="button"
        disabled={disabled}
        onClick={onClick}
        >
            
            { 
            href ? 
                <Link href={href} className={`flex items-center justify-center shadow-md md:gap-3 gap-2 md:py-2 md:px-6 py-2 px-4 max-[350px]:text-[10px] ${className} duration-500 rounded-lg text-nowrap w-fit
            ${variants[variant || "primary"]}
            ${disabled ? "opacity-[0.25]" : ""}
            ${size === "xs" ? "p-1 px-2 text-[10px]" : size === "sm" ? "p-2 px-4 text-[12px]" : size === "md" ? "p-[10px] px-4" : size === "lg" ? "p-3 px-6 text-[14px]" : "p-4 px-6 text-[14px]"}`}> 
                    { children }
                </Link>
                :
                <p className={`flex items-center justify-center shadow-md md:gap-3 gap-2 md:py-2 md:px-6 py-2 px-4 max-[350px]:text-[10px] ${className} duration-500 rounded-lg text-nowrap w-fit
            ${variants[variant || "primary"]}
            ${disabled ? "opacity-[0.25]" : ""}
            ${size === "xs" ? "p-1 px-2 text-[10px]" : size === "sm" ? "p-2 px-4 text-[12px]" : size === "md" ? "p-[10px] px-4" : size === "lg" ? "p-3 px-6 text-[14px]" : "p-4 px-6 text-[14px]"}`}>{ children }</p>
            }
        </button>
    )
}