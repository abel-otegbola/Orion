import Button from "@/components/button/button";
import Search from "@/components/search/search";

export default function Home() {
  return (
    <main>
      <header className="flex flex-col gap-6 md:px-[8%] px-4 min-h-[450px] justify-center items-center">

        <div className="md:w-[50%] flex flex-col gap-4 items-center">
          <h1 className="md:text-[48px] text-[32px] font-semibold uppercase">Next-js Boilerplate</h1>
          <Search />
          <Button>Hello World</Button>
        </div>
      </header>
      
    </main>
  );
}
