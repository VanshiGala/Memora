import Link from "next/link";

export default function Home() {
  return (
    <div className=" ">
      <div className="flex justify-center mt-2 text-2xl font-semibold">
      <h1>Welcome to Memora-Your personal digital Vault</h1>
      </div>
      <div className="flex justify-center mt-8">
      <p>Every memory deserves a place. Memora keeps your stories safe — beautifully organized and always with you.</p>
    </div>
    <div className="flex justify-center items-center mt-10">
    <Link href="/Home">
    <button className="border p-2 rounded hover:bg-blue-600">Get Started</button>
    </Link>
    </div>
    </div>
  );
}
