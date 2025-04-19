'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import StyledAvatar from './StyledAvatar';
import { outfitOptions, AvatarStyle, OutfitCategory } from '@/types/avatar';

interface DressingRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onStyleChange: (style: AvatarStyle) => void;
}

export default function DressingRoom({ isOpen, onClose, onStyleChange }: DressingRoomProps) {
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>({
    hair: outfitOptions.hair[0],
    top: outfitOptions.top[0],
    pants: outfitOptions.pants[0],
    shoes: outfitOptions.shoes[0],
    accessories: [],
  });

  const handleOutfitChange = (category: OutfitCategory, optionId: string) => {
    let newStyle: AvatarStyle;
    
    if (category === 'accessories') {
      const accessory = outfitOptions.accessories.find(opt => opt.id === optionId);
      if (accessory) {
        newStyle = {
          ...avatarStyle,
          accessories: avatarStyle.accessories.some(acc => acc.id === optionId)
            ? avatarStyle.accessories.filter(acc => acc.id !== optionId)
            : [...avatarStyle.accessories, accessory],
        };
      } else {
        return;
      }
    } else {
      const newOption = outfitOptions[category].find(opt => opt.id === optionId);
      if (newOption) {
        newStyle = {
          ...avatarStyle,
          [category]: newOption,
        };
      } else {
        return;
      }
    }

    setAvatarStyle(newStyle);
    onStyleChange(newStyle);
  };

  const isAccessorySelected = (accessoryId: string) => {
    return avatarStyle.accessories.some(acc => acc.id === accessoryId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed inset-0 bg-surface p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Dressing Room</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
              <StyledAvatar style={avatarStyle} />
            </div>
            
            <div className="space-y-4 overflow-y-auto">
              {Object.entries(outfitOptions).map(([category, options]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold capitalize">{category}</h3>
                  <div className="space-y-2">
                    {options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleOutfitChange(category as OutfitCategory, option.id)}
                        className={`w-full p-2 rounded transition-all ${
                          category === 'accessories'
                            ? isAccessorySelected(option.id)
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                            : avatarStyle[category as keyof Omit<AvatarStyle, 'accessories'>].id === option.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 