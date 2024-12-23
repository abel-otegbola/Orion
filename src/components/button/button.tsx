import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tetiary";
    className?: string;
    href?: string;
    size?: "full";
    disabled?: boolean,
    onClick?: () => void,
    children?: ReactNode
}

export default function Button({ variant, className, href, size, disabled, onClick, children, ...props }: buttonProps) {
    const variants = {
        primary: "hover:bg-primary/[0.8] bg-primary text-white border border-primary",
        secondary: "hover:bg-black hover:text-white border border-black dark:border-white/[0.1]",
        tetiary: "bg-gray-500/[0.09] hover:bg-gray-500/[0.2] border border-gray-500/[0.09] "
    }

    return (
        <button className={`
             
        `}
        {...props}
        name="Button"
        role="button"
        disabled={disabled}
        onClick={onClick}
        >
            { 
            href ? 
                <Link href={href} className={`flex items-center justify-center md:gap-3 gap-2 md:py-3 md:px-6 py-2 px-4 max-[350px]:text-[10px] ${className} duration-500 rounded-lg text-nowrap
            ${variants[variant || "primary"]}
            ${disabled ? "opacity-[0.25]" : ""}
            ${size === "full" ? "w-full" : "w-fit"}`}> 
                    { children }
                </Link>
                :
                <p className={`flex items-center justify-center md:gap-3 gap-2 md:py-3 md:px-6 py-2 px-4 max-[350px]:text-[10px] ${className} duration-500 rounded-lg text-nowrap
            ${variants[variant || "primary"]}
            ${disabled ? "opacity-[0.25]" : ""}
            ${size === "full" ? "w-full" : "w-fit"}`}>{ children }</p>
            }
        </button>
    )
}