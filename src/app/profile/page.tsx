'use client';

import AnimatedAvatar from '@/components/AnimatedAvatar';
import ProfilePanel from '@/components/ProfilePanel';
import DracoBox from '@/components/DracoBox';
import ProfileStack from '@/components/ProfileStack';
import { motion } from 'framer-motion';

// Mock data for DracoBox
const mockAvatarStyle = {
  top: { color: '#8B5CF6' },
  pants: { color: '#4F46E5' },
  shoes: { color: '#7C3AED' },
  accessories: [
    { id: '1', color: '#F472B6' },
    { id: '2', color: '#60A5FA' }
  ]
};

export default function ProfilePage() {
  return (
    <main 
      className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 bg-gradient-to-b from-indigo-100 via-violet-200 to-white"
      style={{
        backgroundImage: 'url(/dream-bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Avatar Section */}
      <motion.div 
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedAvatar />
      </motion.div>
      
      {/* Profile Panel */}
      <motion.div 
        className="mb-8 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProfilePanel />
      </motion.div>

      {/* Stackable Sections */}
      <motion.div 
        className="space-y-8 w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ProfileStack />
        
        {/* DracoBox Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/60 rounded-xl shadow-lg p-4 backdrop-blur-sm">
            <DracoBox
              avatarStyle={mockAvatarStyle}
              username="Cosmic Seed"
              bio="Dreaming, building, vibing."
              isVisible={true}
              isPremium={false}
              selectedBackground="cosmic-glow"
            />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
} 