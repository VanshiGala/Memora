

import cloudinary from "cloudinary";
import { CloudinaryImage } from "../../components/cloudinaryImage";
import { SearchResults } from "../gallery/page";

export default async function FavPage(){
    const results = await cloudinary.v2.search
    .expression('resource_type:image AND tags:favourite')
    .sort_by('created_at', 'desc')
    .with_field("tags")
    .max_results(5)
    .execute() as {resources:SearchResults[]};
    //console.log("results : ",results)
    return(
        <section className="ml-2">
        <div className="flex justify-between">
            <h1 className="font-bold text-3xl">Favourite Images</h1>
            
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 ">
            {results.resources.map((result)=>(
                <CloudinaryImage
                path="/favourites"
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