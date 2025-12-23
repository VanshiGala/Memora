
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, Pencil } from "lucide-react";
import { FolderPlus } from 'lucide-react'
import { ImageDialog } from "./image-dialog";
import { SearchResults } from "@/app/gallery/page";
import Link from "next/link";


export default function ImageMenu({image}:{image:SearchResults}) {

  return (
    // <div className="absolute top-2 right-2">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded hover:bg-muted">
            <Menu className="h-4 w-4 " />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-44">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  <ImageDialog image={image}>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FolderPlus className="h-4 w-4 cursor-pointer" />
        <span className="cursor-pointer hover:text-foreground">Add to Album</span>
      </div>
      <Link
        href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
        className="flex items-center gap-2 text-sm hover:text-foreground"
      > <Pencil/>
        Edit
      </Link>
    </div>
  </ImageDialog>
</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    // </div>
  );
}
