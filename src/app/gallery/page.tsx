
import Upload from "@/components/Upload";
import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinaryImage";

//define ts shape of each returned cloud image result
export type SearchResults = {
    public_id : string,
    tags:string[]
}
export default async function GalleryPage(){
    const results = await cloudinary.v2.search
    .expression('resource_type:image AND folder:photo-album')
    .sort_by('created_at', 'desc')
    .with_field("tags")
    .max_results(5)
    .execute() as {resources:SearchResults[]};
    //console.log("results : ",results)
    return(
        <section className="ml-2">
        <div className="flex justify-between">
            <h1 className="font-bold text-3xl">Gallery</h1>
            <Upload />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 ">
            {results.resources.map((result)=>(
                <CloudinaryImage
                path="/gallery"
                src={result.public_id}
                imagedata={result}
                key={result.public_id}
                public_id={result.public_id}
                alt="Image of something"
                width={300}
                height={300}/>
            ))}
        </div>
        
        </section>
    )
}