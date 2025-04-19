'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AvatarStyle } from '@/types/avatar';
import CosmicBackground, { CosmicTheme } from './CosmicBackground';

interface DracoBoxProps {
  avatarStyle: AvatarStyle;
  username: string;
  bio: string;
  isVisible: boolean;
  isPremium?: boolean;
  selectedBackground?: CosmicTheme;
  onRevealComplete?: () => void;
}

const revealMessages = [
  "A new star has joined the constellation.",
  "Their Draco Box has been unlocked—take a peek inside.",
  "Some stars stay quiet, but this one just shimmered into view."
];

export default function DracoBox({ 
  avatarStyle, 
  username, 
  bio, 
  isVisible,
  isPremium = false,
  selectedBackground = 'default',
  onRevealComplete 
}: DracoBoxProps) {
  const randomMessage = revealMessages[Math.floor(Math.random() * revealMessages.length)];

  // Determine the actual background theme to use
  const getBackgroundTheme = () => {
    if (selectedBackground !== 'default') {
      return selectedBackground;
    }
    return isPremium ? 'galactic' : 'cosmic-glow';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <CosmicBackground 
            theme={getBackgroundTheme()}
            isPremium={isPremium}
          />
          
          <motion.div
            className="draco-box bg-surface/80 backdrop-blur-md p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onAnimationComplete={onRevealComplete}
            >
              <p className="text-sm text-primary/80 font-light italic">
                {randomMessage}
              </p>
            </motion.div>

            <div className="flex flex-col items-center space-y-4">
              <motion.div 
                className="w-32 h-32 rounded-full overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(45deg, ${avatarStyle.top.color}, ${avatarStyle.pants.color})`,
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-gray-600 mt-2">{bio}</p>
              </motion.div>

              <motion.div 
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                {avatarStyle.accessories.map((accessory, index) => (
                  <div
                    key={accessory.id}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: accessory.color }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 