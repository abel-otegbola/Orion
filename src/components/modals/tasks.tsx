import { TaskData, Value } from "@/interface/task";
import moment from 'moment'
import TaskGrid from "../grids/tasksGrid";

type TaskLayoutProps = {
    tasks: TaskData[],
    value: Value, 
    layout: string,
}

export default function TasksLayout({ tasks, value, layout }: TaskLayoutProps) {
    // const dateValue = (date: Date, index: number) => {
    //     const format = date.setUTCDate(date.getUTCDate())
    //     return format?.toLocaleString().split(",")[0] || ""
    // }

    return (
        <div className="p-4 bg-white dark:bg-dark">
            {
                layout === "Calendar" ?
                <div className="pb-12 pt-0 w-full md:max-w-[90vw] max-w-[85vw]">
                        <div className="w-full overflow-x-auto">
                            
                            <table className="table-auto w-full min-w-[700px]">
                                <thead>
                                    <tr className="text-[12px] p-4">
                                        <th className="text-center"></th>
                                        {
                                            [moment(value?.toString()).subtract(2, 'days'), moment(value?.toString()).subtract(1, 'days'), moment(value?.toString()), moment(value?.toString()).add(1, 'days'), moment(value?.toString()).add(2, 'days'), moment(value?.toString()).add(3, 'days')].map(date => (
                                            <th key={date.date()} className={`min-w-[100px] py-2 rounded ${moment(value?.toString()) === date ? "bg-red text-white" : ""}`}>{date.date()}</th> 
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="text-[10px]">
                                    {
                                        Array.from({ length: 25 }, (_, i) => i).map(date => (
                                        <tr key={date} className="h-[65px] border-y border-gray/[0.5] dark:border-gray-500/[0.1]">
                                            <td className="px-2 flex h-full w-full">{date > 9 ? "" : "0"}{date}:00</td>
                                            
                                            {
                                                [moment(value?.toString()).subtract(2, 'days'), moment(value?.toString()).subtract(1, 'days'), moment(value?.toString()), moment(value?.toString()).add(1, 'days'), moment(value?.toString()).add(2, 'days'), moment(value?.toString()).add(3, 'days')].map(index => (
                                                    <td key={index.date()} className="p-[2px] border border-gray-500/[0.1] relative">
                                                        {
                                                            tasks.filter(item => (item.durationStart.split(":")[0] === `${date > 9 ? "" : "0"}${date}` && item.date.split("-")[2] === `${index.date() > 9 ? "" : "0"}${index.date().toString()}`)).map(element => (
                                                                <TaskGrid key={element.id} element={element} layout={layout} />
                                                            ))
                                                        }
                                                    </td> 
                                                ))
                                            }
                                        </tr> 
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                :

                layout === "Grid" ?
                    <div className="md:columns-4 columns-2 py-2 pb-16 ">
                        {
                            tasks.map(element => ( 
                                <TaskGrid key={element.id} element={element} layout={layout} />
                            ))
                        }
                    </div>
                :
                    <div className="py-2">
                        {
                            tasks.map(element => ( 
                                <TaskGrid key={element.id} element={element} layout={layout} />
                            ))
                        }
                    </div>
            }
        </div>
    )
}