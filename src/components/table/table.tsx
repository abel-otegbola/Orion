'use client'
import { TaskData } from "@/interface/task"
import { useState } from "react"

export default function Table({ data, fields }: { data: TaskData[], fields: string[] }) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [, setActive] = useState({})

    const handleOpenModal = (item: TaskData) => {
        setOpenModal(!openModal) 
        setActive(item)
    }

    return (
        <div className="w-[100%] py-2 overflow-x-auto">
            <table className="table-auto rounded sm:text-[10px] text-[8px] overflow-hidden text-left w-full min-w-[250px]">
                <thead className="border border-gray-500/[0.2] dark:border-gray-500/[0.08] ">
                    <tr className="bg-primary/[0.08]">
                    {
                        fields.map((header: string, i:number) => (
                            <th key={i} className="p-2 py-3 font-medium capitalize">{header}</th>
                        ))
                    }
                    </tr>
                </thead>
                <tbody className="">
                    {
                    data.map((item: TaskData, i: number) => (
                        <tr key={item.id}  tabIndex={1} className={i%2 === 0 ? "border border-primary/[0.08]" : "bg-primary/[0.04] border border-primary/[0.1]"} onClick={() => handleOpenModal(item)}>
                            {
                                fields.map((header: string, i:number) => (
                                    <td key={i} className="p-2 cursor-pointer">{
                                        header === "title" ? 
                                        <div className="flex items-center gap-2">
                                            <p className="w-[24px] h-[24px] flex items-center justify-center bg-primary/[0.09] rounded-full uppercase text-[8px]">{item.title.charAt(0) + item.title.charAt(1)}</p>
                                            <p className="flex flex-col gap-1">
                                                <span className="font-medium">{item.title}</span>
                                                <span className={`${item.priority === "high" ? "text-red-500" : item.priority === "medium" ? "text-orange-500" : "text-emerald-500"} rounded-lg text-[8px]`}>{item.priority}</span>
                                            </p>
                                        </div>
                                        :
                                        header === "Priority" ? <span  className={`${item.priority === "high" ? "bg-emerald-500/[0.3]" : item.priority === "medium" ? "bg-fuchsia-500/[0.3]" : "bg-red/[0.3]"} py-1 px-2 rounded-lg text-[8px]`}>{item?.priority}</span>
                                        :
                                        (item)[header.toLowerCase()]
                                    }</td>
                                ))
                            }
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}