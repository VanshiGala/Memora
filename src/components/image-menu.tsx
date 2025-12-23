
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { FolderPlus } from 'lucide-react'
import { ImageDialog } from "./image-dialog";
import { SearchResults } from "@/app/gallery/page";


export default function ImageMenu({image}:{image:SearchResults}) {

  return (
    <div className="absolute top-2 right-2">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded hover:bg-muted">
            <Menu className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-44">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ImageDialog image={image}>
              <div className="flex items-center gap-2">
                <FolderPlus className="h-4 w-4" />
                <span>Add to Album</span>
              </div>
            </ImageDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
