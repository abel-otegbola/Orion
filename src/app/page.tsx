'use client'
import Button from "@/components/button/button";
import { Star } from "@phosphor-icons/react";
import Image from "next/image"

export default function Home() {
  
  return (
    <main className="">

        <header className="pt-16 min-h-screen bg-center bg-cover dark:bg-dark" style={{ backgroundImage: `url("/bg.svg")` }}>
          <div className="flex flex-col gap-6 items-center md:p-[40px] p-6 md:w-[78%] mx-auto">
            <div className="flex items-center p-1 border border-gray-500/[0.2] rounded-full text-[10px]">
              <p className="p-2 px-4 rounded-full bg-primary/[0.1] text-primary font-semibold">An idea?</p>
              <p className="px-3 pr-6">Envision It, Organize It, Achieve It</p>
            </div>
            <h1 className="md:text-[40px] text-[32px] font-bold text-center leading-[130%]">Stop guessing what works. Start understanding how you create your best work<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB2E96] to-[#BC51D6]"></span></h1>
            <p className="leading-[25px] text-center md:w-[75%]">Orion helps you log tasks simply, then shows you when, why, and how you’re truly productive. No noise. Just insights that fit your flow.. Whether you&apos;re managing personal projects, working solo, or teaming up with colleagues, our platform helps you stay focused, productive, and on top of your game.</p>
            <div className="flex gap-4">
              <Button href="/features">Learn more</Button>
              <Button href="/login" variant="secondary" >Get Started</Button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image src={"/hero-dashboard-dark.png"} alt="hero dashboard" width={1000} height={600} className="" />
          </div>
        </header>

        <section className="grid md:grid-cols-2 gap-[10%] md:p-[8%] p-6">
          <div>
            <p className="flex items-center gap-2 p-2 px-4 rounded bg-primary/[0.2] rounded-full text-primary w-fit"><Star weight="fill" className="text-primary" />features</p>
            <p className="md:text-[40px] text-[28px] font-bold mt-8"><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EB2E96] to-[#BC51D6]">Seamlessly</span> Keep Everything in One Place</p>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <p>This excellent note-management app is the best for students, developers, professionals and experts in every field.</p>
            <Button>Learn more</Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 md:p-[8%] p-6">
          <Image src={"/services-1.png"} alt="hero dashboard" width={1000} height={600} className="" />
          <div className="flex flex-col gap-4">
            <Image src={"/services-2.png"} alt="hero dashboard" width={1000} height={600} className="" />
            <Image src={"/services-3.png"} alt="hero dashboard" width={1000} height={600} className="" />
          </div>
        </section>
      
    </main>
  );
}
