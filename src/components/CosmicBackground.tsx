'use client';

import { motion } from 'framer-motion';

export type CosmicTheme = 'default' | 'cosmic-glow' | 'dreamy-sparkles' | 'galactic';

interface CosmicBackgroundProps {
  theme: CosmicTheme;
  isPremium?: boolean;
  isPreview?: boolean;
}

export default function CosmicBackground({ 
  theme, 
  isPremium = false,
  isPreview = false 
}: CosmicBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (theme) {
      case 'default':
        return 'bg-gradient-to-b from-gray-900/20 to-gray-800/20';
      case 'cosmic-glow':
        return 'bg-gradient-to-b from-indigo-900/20 to-purple-900/20';
      case 'dreamy-sparkles':
        return 'bg-gradient-to-b from-blue-900/30 to-pink-900/30';
      case 'galactic':
        return isPremium 
          ? 'bg-gradient-to-b from-black via-indigo-900/40 to-purple-900/40'
          : 'bg-gradient-to-b from-indigo-900/20 to-purple-900/20';
      default:
        return 'bg-gradient-to-b from-indigo-900/20 to-purple-900/20';
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 ${getBackgroundStyle()} backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {theme === 'dreamy-sparkles' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isPreview ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
      {theme === 'galactic' && isPremium && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-full h-full"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </motion.div>
  );
} 