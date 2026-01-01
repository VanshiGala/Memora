//server component handling authentication logic
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import { redirect } from "next/navigation";
import ClientHome from "./ClientHome"; 


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/gallery");
  }

  return <ClientHome />;
}