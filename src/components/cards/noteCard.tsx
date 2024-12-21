import { INote } from "@/interface/note";
import Link from "next/link";

export default function NoteCard({ note }: { note: INote }) {

    return (
        <div className="flex flex-col gap-6 p-6 rounded-[12px] border border-gray-500/[0.2] bg-gray-500/[0.06]">
          <Link href={`/note/${note.title}`} className="flex justify-between">
            <h1 className="text-md font-medium">{note.title}</h1>
          </Link>

          <p className="text-[12px]">{note.text}</p>
          
          <p className="opacity-[0.7] text-[12px]">{note.createdAt}</p>

        </div>
    )
}