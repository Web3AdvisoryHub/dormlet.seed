'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sticker {
  id: string;
  name: string;
  imageUrl: string;
  isPremium?: boolean;
  price?: number;
}

interface StickerVaultProps {
  onSelectSticker: (sticker: Sticker) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Placeholder stickers - replace with actual assets later
const PLACEHOLDER_STICKERS: Sticker[] = [
  {
    id: '1',
    name: 'Cosmic Star',
    imageUrl: '/stickers/cosmic-star.png',
    isPremium: true,
    price: 0.1
  },
  {
    id: '2',
    name: 'Dream Cloud',
    imageUrl: '/stickers/dream-cloud.png',
    isPremium: false
  },
  // Add more stickers as needed
];

export const StickerVault: React.FC<StickerVaultProps> = ({
  onSelectSticker,
  isOpen,
  onClose
}) => {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  const handleStickerClick = (sticker: Sticker) => {
    setSelectedSticker(sticker);
    onSelectSticker(sticker);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-2xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-white">Sticker Vault</h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {PLACEHOLDER_STICKERS.map(sticker => (
                <motion.div
                  key={sticker.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                  onClick={() => handleStickerClick(sticker)}
                >
                  <div className="aspect-square bg-white/5 rounded-lg p-2">
                    <img
                      src={sticker.imageUrl}
                      alt={sticker.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-white text-sm mt-1">{sticker.name}</p>
                  {sticker.isPremium && (
                    <span className="absolute top-1 right-1 text-xs bg-indigo-500 text-white px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 