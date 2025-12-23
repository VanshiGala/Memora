// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { SearchResults } from "@/app/gallery/page";
// import { addImageToAlbum } from "./action";

// type ImageDialogeProps = {
//   children: React.ReactNode;
//   image: SearchResults; // use your actual type
// };

// export function ImageDialoge({ children, image }: ImageDialogeProps) {
//   const [albumName, setAlbumName] = useState("");
//   const [open, setOpen] = useState(false);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>

//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add to Album</DialogTitle>
//           <DialogDescription>Add this image to an album.</DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="album">Album name</Label>
//             <Input
//               id="album"
//               onChange={(e) => setAlbumName(e.currentTarget.value)}
//               value={albumName}
//             />
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="username-1">Username</Label>
//             <Input id="username-1" name="username" />
//           </div>
//         </div>

//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button
//             onClick={async() => {
//               console.log(image);
//               setOpen(false);
//               await addImageToAlbum(image, albumName)
//             }}
//             type="submit"
//           >
//             Save
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SearchResults } from "@/app/gallery/page";
import { addImageToAlbum } from "./action";
import { useRouter } from "next/navigation";

type ImageDialogProps = {
  children: React.ReactNode;
  image: SearchResults;
};

export function ImageDialog({ children, image }: ImageDialogProps) {
  const [albumName, setAlbumName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!albumName.trim()) {
      alert("Please enter an album name");
      return;
    }

    setIsLoading(true);
    try {
      await addImageToAlbum(image, albumName.trim());
      setOpen(false);
      setAlbumName("");
      router.refresh(); // Soft refresh to update gallery without full reload
    } catch (error) {
      alert("Failed to add image to album. Check console.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>
            Move this image to a new or existing album folder.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="album">Album Name</Label>
            <Input
              id="album"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add to Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}