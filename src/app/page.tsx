import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Optional subtle decorative overlay (you can replace with an actual blurred image if desired) */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1557682257-2f9c2566336e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center blur-xl"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Memora</span>
          <br />
          <span className="text-3xl md:text-5xl font-light text-gray-600">Your Personal Digital Vault</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
          Every memory deserves a place. Memora keeps your stories safe — beautifully organized, 
          securely protected, and always with you. Capture photos, notes, and moments that matter.
        </p>
        
        <div className="flex justify-center">
          <Link href="/gallery">
            <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-300 hover:scale-105 transition-all duration-300 ease-in-out">
              Get Started
            </button>
          </Link>
        </div>
        
        {/* Optional subtle callout */}
        <p className="mt-12 text-sm text-gray-500">
          Secure • Private • Forever Yours
        </p>
      </div>
    </div>
  );
}