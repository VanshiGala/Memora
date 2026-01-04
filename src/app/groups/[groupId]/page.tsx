//fetch and display group data from db

import { conn } from "@/config/dbConfig";
import Group from "@/models/Group";
import mongoose from "mongoose";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params; //unwrap promise to get groupId

  //console.log("groupId:", groupId);
  //console.log("isValid:", mongoose.Types.ObjectId.isValid(groupId));

  if (!mongoose.Types.ObjectId.isValid(groupId)) { //checks if string can be converted to valid mongoDB objectID
    return <div>Invalid group ID</div>;
  }
  //connection to db
  await conn();

  const group = await Group.findById(groupId).lean();
  //lean() -> returns plain js objects instead of full doc
  //console.log("Group:", group);

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <p>{group.description}</p>
    </div>
  );
}







//async() -> indicated server component