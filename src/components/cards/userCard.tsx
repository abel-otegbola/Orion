
import { UserData } from "@/interface/profile";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: {user: UserData}) {

    return (
        <div className="flex flex-col gap-2 p-2 rounded-[8px] bg-white dark:bg-[#000]/[0.3] border border-gray/[0.5] dark:border-gray/[0.08]">

            <Image src={user?.img || "/images/user-avatar.jpg"} alt="user" width={250} height={250} className="rounded bg-gray-500/[0.2]" />
            
            <div className="flex items-center gap-2 w-full rounded-[8px]">
                <p className="p-2 px-[10px] bg-primary/[0.09] font-bold rounded-full uppercase sm:block hidden">{user?.fullname.charAt(0) + user?.fullname.charAt(1)}</p>
                <div className="flex flex-col gap-2 px-1 justify-between">
                    <Link href={"/user?id=" + user?.id}>
                        <h3 className="font-bold">{user?.fullname}</h3>
                        <p className="text-[12px]">{user?.email}</p>
                    </Link>
                    <p>{}</p>
                </div>
            </div>
        
        </div>
    )
}