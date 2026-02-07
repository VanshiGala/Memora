// import Upload from "@/components/upload/Upload";
// import cloudinary from "cloudinary";
// import { ImageGrid } from "@/components/image-grid";

// //define ts shape of each returned cloud image result
// export type SearchResults = {
//   public_id: string;
//   tags: string[];
// };
// export default async function GalleryPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string }>;
// }) {
//   const { search } = await searchParams;
//   const results = (await cloudinary.v2.search
//     //attention to syntax -> first folder then look for tags
//     .expression(`resource_type:image${search ? ` AND tags=${search}`:""}`)
//     .sort_by("created_at", "desc")
//     .with_field("tags")
//     .max_results(20)
//     .execute()) as { resources: SearchResults[] };
//   //console.log("results : ",results)

//   return (
//     <section className="ml-2">
//       <div className="flex justify-between">
//         <h1 className="font-bold text-3xl">Gallery</h1>
//         <Upload />
//       </div>
//     <ImageGrid images={results.resources}/>
//     </section>
//   );
// }

import Upload from "@/components/upload/Upload";
import cloudinary from "cloudinary";
import { ImageGrid } from "@/components/image-grid";

export type SearchResults = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  // ✅ REQUIRED in latest Next.js
  const { search } = await searchParams;

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className=" top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
  
          </div>
       <Upload />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 animate-fade-in-up">
        {results.resources.length === 0 ? (
          <div className="py-24 text-center text-neutral-400">
            No images yet. Upload your first memory.
          </div>
        ) : (
          <ImageGrid images={results.resources} />
        )}
      </section>
    </main>
  );
}
