// //fetch and display group data from db

// import { conn } from "@/config/dbConfig";
// import Group from "@/models/Group";
// import mongoose from "mongoose";
// import GroupUpload from "@/components/upload/GroupUpload";
// export default async function GroupPage({
//   params,
// }: {
//   params: Promise<{ groupId: string }>;
// }) {
//   const { groupId } = await params; //unwrap promise to get groupId

//   //console.log("groupId:", groupId);
//   //console.log("isValid:", mongoose.Types.ObjectId.isValid(groupId));

//   if (!mongoose.Types.ObjectId.isValid(groupId)) { //checks if string can be converted to valid mongoDB objectID
//     return <div>Invalid group ID</div>;
//   }
//   //connection to db
//   await conn();

//   const group = await Group.findById(groupId).lean();
//   //lean() -> returns plain js objects instead of full doc
//   //console.log("Group:", group);

//   if (!group) {
//     return <div>Group not found</div>;
//   }

//   return (
//     <div>
//       <h1>{group.name}</h1>
//       <p>{group.description}</p>
//       <GroupUpload groupId={groupId} />
//     </div>
//   );
// }







// //async() -> indicated server component



import { conn } from "@/config/dbConfig";
import Group from "@/models/Group";
import Image from "@/models/Image";
import mongoose from "mongoose";
import GroupUpload from "@/components/upload/GroupUpload";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return <div>Invalid group ID</div>;
  }

  await conn();

  const group = await Group.findById(groupId).lean();
  if (!group) return <div>Group not found</div>;

  //fetch images for this group
const images = await Image.find({
  groupId: new mongoose.Types.ObjectId(groupId),
})
  .sort({ createdAt: -1 })
  .lean();


  return (
   <div className="min-h-screen bg-gray-50">
  <div className="max-w-6xl mx-auto p-6 pt-12">
    {/* Group Header */}
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
          <p className="text-gray-600 text-lg max-w-2xl">{group.description || "No description yet."}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Invite Code</p>
          <code className="text-lg font-mono bg-gray-100 px-4 py-2 rounded-lg">
            {group.inviteCode || "Loading..."}
          </code>
        </div>
      </div>
    </div>

    {/* Upload Component */}
    <GroupUpload groupId={groupId} />

    {/* Photos Grid */}
    <div className="mt-8">
      {images.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-20 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No photos yet</h3>
          <p className="text-gray-500">Be the first to upload a memory!</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Shared Photos ({images.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img: any) => (
              <div key={img._id} className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300">
                <img
                  src={img.secureUrl}
                  alt="Group photo"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-end p-4">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition text-sm">
                    Uploaded {new Date(img.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
</div>
)}