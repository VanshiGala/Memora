import Upload from "@/components/Upload";
import cloudinary from "cloudinary";
import { ImageGrid } from "@/components/image-grid";

//define ts shape of each returned cloud image result
export type SearchResults = {
  public_id: string;
  tags: string[];
};
export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    //attention to syntax -> first folder then look for tags
    .expression("resource_type:image AND NOT tags=favourite" )
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };
  //console.log("results : ",results)

  return (
    <section className="ml-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Gallery</h1>
        <Upload />
      </div>
    <ImageGrid images={results.resources}/>
    </section>
  );
}
