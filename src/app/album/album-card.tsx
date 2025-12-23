import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Folder } from "./page"
import Link from "next/link"

export function AlbumCard({folder}:{folder : Folder}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{folder.name} images </CardTitle>
        <CardDescription>
          All your {folder.name} album
        </CardDescription>
        <Button asChild><Link href={`album/${folder.name}`}>View Album</Link></Button>
      </CardHeader>
    </Card>
  )
}