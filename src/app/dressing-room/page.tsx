'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DressingRoom() {
  // Outfit state management
  const [outfit, setOutfit] = useState({
    top: false,
    pants: false,
    shoes: false
  });

  // Toggle outfit items
  const toggleItem = (item: keyof typeof outfit) => {
    setOutfit(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Get current outfit description
  const getOutfitDescription = () => {
    const items = [];
    if (outfit.top) items.push('Sparkle Top');
    if (outfit.pants) items.push('Cosmic Pants');
    if (outfit.shoes) items.push('Dream Boots');
    return items.length > 0 ? items.join(', ') : 'Nothing selected';
  };

  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-indigo-100 via-violet-200 to-white p-8"
      style={{
        backgroundImage: 'url(/dream-bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Dressing Room</h1>
        
        {/* Avatar Display Area */}
        <div className="bg-white/80 rounded-xl p-8 shadow-lg mb-8">
          <div className="h-64 bg-purple-100 rounded-lg flex items-center justify-center">
            {/* TODO: Connect outfit state to avatar visuals in Round Two */}
            <p className="text-purple-600">Avatar Preview</p>
          </div>
        </div>

        {/* Outfit Controls */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleItem('top')}
            className={`p-4 rounded-lg text-center transition-colors ${
              outfit.top 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600 border-2 border-purple-600'
            }`}
          >
            Toggle Top
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleItem('pants')}
            className={`p-4 rounded-lg text-center transition-colors ${
              outfit.pants 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600 border-2 border-purple-600'
            }`}
          >
            Toggle Pants
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleItem('shoes')}
            className={`p-4 rounded-lg text-center transition-colors ${
              outfit.shoes 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600 border-2 border-purple-600'
            }`}
          >
            Toggle Shoes
          </motion.button>
        </div>

        {/* Current Outfit Display */}
        <div className="text-lg font-medium mt-4 text-purple-900">
          Wearing: {getOutfitDescription()}
        </div>
      </motion.div>
    </main>
  );
} 