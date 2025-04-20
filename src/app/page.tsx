// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RedirectToHome() {
  redirect('/home');
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Room from '@/components/Room';
import MessageBox from '@/components/MessageBox';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import ProfilePanel from '@/components/ProfilePanel';
import ProfileStack from '@/components/ProfileStack';
import DressingRoom from '@/components/DressingRoom';
import DracoBox from '@/components/DracoBox';
import WalletConnection from '@/components/WalletConnection';
import { outfitOptions } from '@/types/avatar';
import BackgroundSelector from '@/components/BackgroundSelector';
import { CosmicTheme } from '@/components/CosmicBackground';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTribute, setShowTribute] = useState(false);
  const [showDressingRoom, setShowDressingRoom] = useState(false);
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [isDracoBoxVisible, setIsDracoBoxVisible] = useState(true);
  const [avatarStyle, setAvatarStyle] = useState({
    hair: outfitOptions.hair[0],
    top: outfitOptions.top[0],
    pants: outfitOptions.pants[0],
    shoes: outfitOptions.shoes[0],
    accessories: [],
  });
  const [selectedTheme, setSelectedTheme] = useState<CosmicTheme>('default');
  const [isPremium, setIsPremium] = useState(false);

  const handleRoomLockChange = (isLocked: boolean) => {
    setIsRoomLocked(isLocked);
  };

  const handleDracoBoxVisibilityChange = (isVisible: boolean) => {
    setIsDracoBoxVisible(isVisible);
  };

  const mockAvatarStyle = {
    top: { color: '#4F46E5' },
    pants: { color: '#7C3AED' },
    accessories: [
      { id: '1', color: '#F59E0B' },
      { id: '2', color: '#10B981' },
    ],
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Draco Box Demo</h1>
          <button
            onClick={() => setIsPremium(!isPremium)}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            {isPremium ? 'Premium Active' : 'Upgrade to Premium'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Background Theme</h2>
            <BackgroundSelector
              selectedTheme={selectedTheme}
              isPremium={isPremium}
              onThemeChange={setSelectedTheme}
            />
          </div>

          <div className="flex items-center justify-center">
            <DracoBox
              avatarStyle={mockAvatarStyle}
              username="Demo User"
              bio="Welcome to my Draco Box!"
              isVisible={isDracoBoxVisible}
              isPremium={isPremium}
              selectedBackground={selectedTheme}
              onRevealComplete={() => console.log('Reveal complete!')}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 
