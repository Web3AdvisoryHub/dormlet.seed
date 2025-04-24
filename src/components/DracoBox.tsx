'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AvatarStyle } from '@/types/avatar';
import CosmicBackground, { CosmicTheme } from './CosmicBackground';
import { EggClaim } from './EggClaim';
import { ConstellationVault } from './ConstellationVault';
import { useState, useEffect } from 'react';

interface DracoBoxProps {
  avatarStyle: AvatarStyle;
  username: string;
  bio: string;
  isVisible: boolean;
  isPremium?: boolean;
  selectedBackground?: CosmicTheme;
  onRevealComplete?: () => void;
  userId: string;
}

// Use a consistent message instead of random selection
const revealMessage = "A new star has joined the constellation.";

export default function DracoBox({ 
  avatarStyle, 
  username, 
  bio, 
  isVisible,
  isPremium = false,
  selectedBackground = 'default',
  onRevealComplete,
  userId
}: DracoBoxProps) {
  const [showEggClaim, setShowEggClaim] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [hasClaimedEgg, setHasClaimedEgg] = useState(false);

  // Determine the actual background theme to use
  const getBackgroundTheme = () => {
    if (selectedBackground !== 'default') {
      return selectedBackground;
    }
    return isPremium ? 'galactic' : 'cosmic-glow';
  };

  const handleEggClaimComplete = (eggData: {
    eggUri: string;
    creatureName: string;
    creatureStory: string;
    isPublic: boolean;
    canRegift: boolean;
  }) => {
    setHasClaimedEgg(true);
    setShowEggClaim(false);
    // You can add additional logic here, like updating the UI or triggering animations
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
                {revealMessage}
              </p>
            </motion.div>

            <div className="flex flex-col items-center space-y-6">
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

              <div className="flex space-x-4">
                {!hasClaimedEgg ? (
                  <motion.button
                    onClick={() => setShowEggClaim(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Claim Your Egg
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setShowConstellation(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View My Constellation
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showEggClaim && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowEggClaim(false)}
              >
                <motion.div
                  className="bg-surface/90 backdrop-blur-md rounded-xl p-6 max-w-2xl w-full mx-4"
                  onClick={e => e.stopPropagation()}
                >
                  <EggClaim
                    userId={userId}
                    onClaimComplete={handleEggClaimComplete}
                  />
                </motion.div>
              </motion.div>
            )}

            {showConstellation && (
              <ConstellationVault
                userId={userId}
                isOpen={showConstellation}
                onClose={() => setShowConstellation(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 