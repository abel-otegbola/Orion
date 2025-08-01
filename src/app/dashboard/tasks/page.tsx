'use client'

import CalendarIcon from "@/assets/icons/calendar"
import Button from "@/components/button/button"
import NewTask from "@/components/modals/createTask"
import TasksLayout from "@/components/modals/tasks"
import { Calendar, GridFour, List } from "@phosphor-icons/react"
import { useState } from "react"

export default function Taskspage () {
  const [layout, setLayout] = useState("Calendar")
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 flex md:flex-nowrap flex-wrap gap-4">
      <div className="flex flex-col gap-4 h-full md:w-[70%]">
        <div className="flex flex-wrap gap-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="rounded-full p-1 w-[32px] h-[32px] bg-gray-200/[0.2]" />
            <div className="text-start">
              <h2 className="font-medium text-[16px]">Tasks</h2>
              <p className="text-[10px]">tasks available for the day</p>
            </div>
          </div>
          

          <div className="flex md:justify-end justify-between md:w-fit w-full">
            <Button variant="secondary" onClick={() => setOpen(!open)}>Create new Task</Button>
            <div className="flex items-center">
              <button 
                className={`${layout === "Calendar" ? "bg-primary text-white" : ""} p-2 py-[6px] text-[16px] rounded-l-lg border border-gray-500/[0.2] ml-4`}
                onClick={() => setLayout("Calendar")}
              >
                  <Calendar />
              </button>
              <button 
                className={`${layout === "Grid" ? "bg-primary text-white" : ""} p-2 py-[6px] text-[16px] border border-gray-500/[0.2]`}
                onClick={() => setLayout("Grid")}
              >
                  <GridFour />
              </button>
              <button 
                className={`${layout === "List" ? "bg-primary text-white" : ""} p-2 py-[6px] text-[16px] rounded-r-lg border border-gray-500/[0.2]`}
                onClick={() => setLayout("List")}
              >
                  <List />
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-500/[0.1] dark:bg-black/[0.5] min-h-[600px] rounded-lg flex-1 max-h-screen overflow-y-auto">
            <TasksLayout tasks={[
                {id: "0", date: "2025-08-02", durationStart: "05:45", durationEnd: "06:45", status: "pending", title: "Design and development of flashnotes", description: "Project management dashboard for a crypto exchange platform. Highlights of feature" },
              ]} value={new Date()} layout={layout} />
        </div>
      </div>

      <div className="flex min-h-[500px] dark:bg-black/[0.5] flex-1 p-4 border border-gray-500/[0.1] rounded-lg">
        {
          open ? 
            <NewTask setClose={setOpen} />
          : ""
        }
        <div className="flex gap-4">
          <CalendarIcon className="rounded-full p-1 w-[32px] h-[32px] bg-gray-200/[0.2]" />
          <div className="text-start">
            <h2 className="font-medium text-[16px]">Insights</h2>
            <p className="text-[10px]">Based on your previous productivity</p>
          </div>
        </div>
      </div>
    </div>
  )
}