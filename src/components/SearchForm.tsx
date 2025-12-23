"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [tagName, setTagName] = useState("");
  const router = useRouter();
  return (
    <div>
      <form 
      onSubmit={(e)=>{
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh()
      }}
      className="flex items-center border rounded-full overflow-hidden shadow-md bg-white ">
        <button className="p-3 bg-gray-100 hover:bg-gray-200 flex items-center justify-center ">
          <Search />
        </button>
        <input
          type="text"
          value={tagName ?? ""}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Search photos"
          className="flex-`grow` p-3 outline-none"
        />
        {/* <Button type="submit">Search</Button> */}
      </form>
    </div>
  );
}
