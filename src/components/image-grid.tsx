import { CloudinaryImage } from "@/components/cloudinaryImage";
import { SearchResults } from "@/app/gallery/page";

export function ImageGrid({ images }: { images: SearchResults[] }) {
  const MAX_COL = 4;

  //to display in 4-column grid
  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % MAX_COL === colIndex);
  }
  return (
    <div className="grid grid-cols-4 gap-4 mt-4 ">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (columns,idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {columns.map((result: { public_id: any }) => (
              <CloudinaryImage
                path="/gallery"
                src={result.public_id}
                imagedata={result}
                key={result.public_id}
                public_id={result.public_id}
                alt="Image of something"
                width={300}
                height={300}
                className="rounded-2xl"
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
