"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteGroupImage } from "../app/groups/action";

export default function GroupImageMenu({
  imageId,
  publicId,
  groupId,
}: {
  imageId: string;
  publicId: string;
  groupId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    startTransition(() => {
      deleteGroupImage(imageId, publicId, groupId);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded bg-black/40 text-white hover:bg-black/60">
          <Menu className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          disabled={isPending}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
