'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { CaretDown, SortAscending } from "@phosphor-icons/react";
import { ReactNode, useRef, useState } from "react";

type option = {
  id: string | number;
  icon?: ReactNode;
  title: string;
}

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    placeholder?: string;
    options?: option[];
}

export default function Dropdown({ className, disabled, label, name, options, value, onChange, error, placeholder }: dropdownProps) {
    const [focus, setFocus] = useState(false)
    const [active, setActive] = useState<option>({ id: 0, title: "", icon: null })

    const optionsRef = useOutsideClick(setFocus, false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value: string) => {
      onChange(value)
    }

    return (
        <div ref={optionsRef} className="relative flex flex-col w-full gap-1">
            { label ? <label htmlFor={name} className="text-[12px]">{label}</label> : "" }

            <div className={`flex items-center relative rounded-[4px] bg-white dark:bg-dark w-full h-[40px] p-1 px-4 border duration-500 z-[10] 
                ${error && !focus ? "border-red text-red" : "border-gray  dark:text-gray dark:border-gray/[0.2]"}
                ${focus ? "border-primary shadow-input-active" : " "}
                ${ className }
            `}>
                <span className="text-[16px]">{ active.icon || <SortAscending /> }</span>
                <input
                    ref={inputRef}
                    className={` p-2 w-full outline-none bg-transparent cursor-pointer
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    value={active.title}
                    placeholder={active.title || placeholder}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={(e) => onChange(e.target.value)}
                />

                { error && !focus ? <p className="absolute right-2 px-2 text-[12px] bg-white dark:bg-dark backdrop-blur-sm">{error}</p> : "" }
                <span className={`${!focus ? "rotate-0" : "rotate-180" } duration-500`}><CaretDown size={12} /></span>
            </div>

            <div className={`p-2 rounded-[8px] absolute top-[50px] left-0 w-full max-h-[200px] overflow-y-auto z-[1000] bg-tetiary dark:bg-dark dark:text-gray shadow-md overflow-y-auto border border-gray/[0.2] ${focus ? "block" : "hidden"}`}>
              {
                options?.map((option: option) => (
                  <div tabIndex={1} key={option.id} onClick={() => {setActive(option); handleChange(option.title); setFocus(false)}} className={`p-4 flex w-full items-center cursor-pointer gap-2 mb-[2px] hover:text-primary bg-white dark:bg-dark ${option.title === value ? "text-primary" : ""}`}>
                    <span className="text-[16px]">{option.icon}</span>
                    {option.title}
                  </div>
                ))
              }
            </div>
        </div>
    )
}