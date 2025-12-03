"use server"

import cloudinary from "cloudinary"
import { revalidatePath } from "next/cache"

export async function SetAsFavourite( //mark and unmark favourites
    publicId:string, 
    isFav : boolean,
    path : string){ //route page to refresh after action
    if (isFav){
        await cloudinary.v2.uploader.add_tag('favourite', [publicId])
    }else{
        await cloudinary.v2.uploader.remove_tag('favourite', [publicId])
    }
    //fake delay
    await new Promise((resolve)=>setTimeout(resolve, 1500))
    //nextjs uses caching for faster page loads.
    revalidatePath(path) //tells nextjs to clear cache for this page & generate fresh content for the same
}






//tagging -> assign a tag to cloudinary resources