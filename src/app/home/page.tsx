'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-6 flex flex-col items-center">
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
        <img src="/avatar-placeholder.png" alt="User Avatar" className="w-full h-full object-cover" />
      </div>

      {/* Bio */}
      <div className="text-center max-w-md text-gray-700 mb-6">
        <h1 className="text-2xl font-bold">Cosmic Seed</h1>
        <p className="mt-2 text-sm">Welcome to my corner of DormLit. Dreaming, building, vibing.</p>
      </div>

      {/* Link Stack */}
      <div className="flex flex-col space-y-3 w-full max-w-sm mb-10">
        <a href="#" className="bg-purple-500 text-white py-2 rounded-lg text-center hover:bg-purple-600 transition">My Portfolio</a>
        <a href="#" className="bg-blue-400 text-white py-2 rounded-lg text-center hover:bg-blue-500 transition">My Socials</a>
        <a href="#" className="bg-green-400 text-white py-2 rounded-lg text-center hover:bg-green-500 transition">Support Me</a>
      </div>

      {/* DracoBox Preview */}
      <div className="w-full max-w-md bg-white border-2 border-dashed border-purple-300 rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">My DracoBox</h2>
        <p className="text-sm text-gray-500">Click to open my magical box of vibes and items!</p>
      </div>

      {/* Trial Button */}
      <Link 
        href="/pricing"
        className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
      >
        Start Your Dream Trial
      </Link>

      {/* TODO: Connect to real billing logic in Round Two. */}
    </div>
  );
}
