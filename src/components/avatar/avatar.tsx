import { UserData } from "@/interface/profile"

export default function Avatar({ user }: { user: UserData }) {
    return <p className="h-[36px] w-[36px] flex items-center justify-center bg-gray-500/[0.5] text-white font-bold rounded-full uppercase">{user?.fullname ? user?.fullname.charAt(0) : user?.email?.charAt(0)}</p>
}