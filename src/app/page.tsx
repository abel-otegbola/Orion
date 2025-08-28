'use client'
import Button from "@/components/button/button";
import Image from "next/image"

export default function Home() {
  
  return (
    <main className="">

        <header className="pt-16 min-h-screen bg-radial from-40% to-fuchsia-700/[0.09]">
          <div className="flex flex-col sm:gap-6 gap-4 sm:items-center md:p-[40px] p-6 md:w-[78%] mx-auto">
            <div className="flex items-center p-1 border border-gray-500/[0.2] rounded-full text-[10px] w-fit">
              <p className="md:p-2 p-1 px-4 rounded-full bg-primary/[0.1] text-primary font-semibold">An idea?</p>
              <p className="sm:px-3 sm:pr-6 px-1 pr-2">Envision It, Organize It, Achieve It</p>
            </div>
            <h1 className="md:text-[40px] text-[24px] font-bold sm:text-center leading-[130%]">Stop guessing what works. Start understanding how you create your best work<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB2E96] to-[#BC51D6]"></span></h1>
            <p className="leading-[25px] sm:text-center md:w-[75%]">Orion helps you log tasks simply, then shows you when, why, and how you’re truly productive. No noise. Just insights that fit your flow.. Whether you&apos;re managing personal projects, working solo, or teaming up with colleagues, our platform helps you stay focused, productive, and on top of your game.</p>
            <div className="flex gap-4">
              <Button href="/features">Learn more</Button>
              <Button href="/login" variant="secondary" >Get Started</Button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image src={"/hero-dashboard-dark.png"} alt="hero dashboard" width={1000} height={600} className="" />
          </div>
        </header>

      
    </main>
  );
}
