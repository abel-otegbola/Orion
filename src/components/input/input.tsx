'use client'
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { ReactNode, InputHTMLAttributes, useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Input({ className, disabled, label, name, value, type, onChange, error, placeholder, leftIcon, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState(false)


    return (
        <div className="flex flex-col w-full gap-1">
            { label ? <label htmlFor={name} className={`${focus ? "text-primary/[0.5]" : ""}`}>{label}</label> : "" }

            <div className={`flex items-center gap-1 relative rounded-lg bg-white dark:bg-dark dark:text-gray w-full border p-1 duration-500 
                ${error && !focus ? "border-red-500 text-red-500 " : "border-gray/[0.3] dark:border-gray-500/[0.4]"}
                ${focus ? "border border-primary shadow-input-active" : ""}
                ${className}
            `}>
                <span className={`${!focus ? "opacity-[0.4]": "text-primary"} ${leftIcon ? "pl-2" : ""}`}>{ leftIcon }</span>
                <input 
                    className={`sm:p-2 p-[6px] w-full outline-none bg-transparent
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    type={type === "password" && show ? "text" : type}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />

                { error && !focus ? <p className="absolute right-2 px-2 text-[12px] bg-white dark:bg-black text-red-500 backdrop-blur-sm">{error}</p> : "" }
                { type === "password" ? 
                    <span tabIndex={1} className="p-2 cursor-pointer" title="toggle show password" aria-checked={show} onClick={() => setShow(!show)}>{ show ? <Eye /> : <EyeSlash /> }</span>
                : "" }
            </div>
        </div>
    )
}