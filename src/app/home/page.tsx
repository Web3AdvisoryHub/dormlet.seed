'use client';

import Link from 'next/link';
import DracoBox from '@/components/DracoBox';
import { AvatarStyle } from '@/types/avatar';

// Mock data for DracoBox
const mockAvatarStyle: AvatarStyle = {
  top: { color: '#8B5CF6' },
  pants: { color: '#4F46E5' },
  shoes: { color: '#7C3AED' },
  accessories: [
    { id: '1', color: '#F472B6' },
    { id: '2', color: '#60A5FA' }
  ]
};

export default function HomePage() {
  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-indigo-100 via-violet-200 to-white"
      style={{
        backgroundImage: 'url(/dream-bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="p-6 flex flex-col items-center">
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

        {/* DracoBox */}
        <div className="w-full max-w-md mb-8">
          <DracoBox
            avatarStyle={mockAvatarStyle}
            username="Cosmic Seed"
            bio="Dreaming, building, vibing."
            isVisible={true}
            isPremium={false}
            selectedBackground="cosmic-glow"
          />
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
    </main>
  );
}
