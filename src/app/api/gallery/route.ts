import cloudinary from "cloudinary"; //cloudinary SDK runs only on server-side

export async function GET() { //GET handler for api route -> defines server endpoint
  const results = await cloudinary.v2.search
    .expression("folder:photo-album AND resource_type:image") //only return files from the named folder and img resources
    .sort_by("public_id", "desc") //descending order
    .max_results(2) //limit no
    .execute(); //sends req to cloudinary ; connects using cloudinary credentials ; runs search query ; returns img metadata

  return Response.json(results.resources); //return only resources to client
}
