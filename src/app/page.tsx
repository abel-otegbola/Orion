'use client'

import Skeleton from "@/components/skeleton/skeleton";

export default function Home() {
  
  return (
    <main>
      <header className="flex flex-col gap-6 md:px-[8%] px-4 min-h-[650px] justify-center items-center">

        <div className="md:w-[50%] flex flex-col gap-4 items-center">
          <h1 className="md:text-[48px] text-[32px] font-semibold uppercase">Next-js Boilerplate</h1>
          <Skeleton type="paragraph" />
        </div>
      </header>
      
    </main>
  );
}
