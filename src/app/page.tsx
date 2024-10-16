'use client'
import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import UserCard from "@/components/cards/userCard";
import Dropdown from "@/components/dropdown/dropdown";
import Input from "@/components/input/input";
import Search from "@/components/search/search";
import { Facebook01Icon, GithubIcon, LockIcon, UserAccountIcon } from "hugeicons-react";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("")
  return (
    <main>
      <header className="flex flex-col gap-6 md:px-[8%] px-4 min-h-[650px] justify-center items-center">

        <div className="md:w-[50%] flex flex-col gap-4 items-center">
          <h1 className="md:text-[48px] text-[32px] font-semibold uppercase">Next-js Boilerplate</h1>
          <UserCard user={{id: "0", fullname: "Abel Otegbola", email: "Abel15655@gmail.com" }}/>
          <Avatar user={{id: "0", fullname: "Abel Otegbola", email: "Abel15655@gmail.com" }}/>
          <Search />
          <Input leftIcon={<UserAccountIcon />}/>
          <Input leftIcon={<LockIcon />} type="password"/>
          <Dropdown value={value} onChange={(value) => setValue(value)} options={[{ id:0, title: "Github", icon: <GithubIcon /> }, { id: 1, title: "Facebook", icon: <Facebook01Icon /> }]} />
          <Button href="/about" size="full">Hello World</Button>
        </div>
      </header>
      
    </main>
  );
}
