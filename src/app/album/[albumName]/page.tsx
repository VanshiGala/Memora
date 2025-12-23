import cloudinary from "cloudinary";
import AlbumGrid from "./album-grid";
import { SearchResults } from "@/app/gallery/page";

export default async function Album({ params,}:{params: Promise<{albumName:string}>}) {
    const {albumName} = await params;
  const results = (await cloudinary.v2.search
    //attention to syntax -> first folder then look for tags
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };
  //console.log("results : ",results)

  return (
    <section className="ml-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Album {albumName}</h1>
      </div>
      <AlbumGrid images={results.resources} />
    </section>
  );
}