'use client';

import { CosmicTheme } from './CosmicBackground';
import CosmicBackground from './CosmicBackground';

interface BackgroundSelectorProps {
  selectedTheme: CosmicTheme;
  isPremium: boolean;
  onThemeChange: (theme: CosmicTheme) => void;
}

const themeOptions: { value: CosmicTheme; label: string; premium?: boolean }[] = [
  { value: 'default', label: 'Default' },
  { value: 'cosmic-glow', label: 'Cosmic Glow' },
  { value: 'dreamy-sparkles', label: 'Dreamy Sparkles' },
  { value: 'galactic', label: 'Galactic', premium: true },
];

export default function BackgroundSelector({
  selectedTheme,
  isPremium,
  onThemeChange,
}: BackgroundSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onThemeChange(option.value)}
          disabled={option.premium && !isPremium}
          className={`relative overflow-hidden rounded-lg p-2 transition-all ${
            selectedTheme === option.value
              ? 'ring-2 ring-primary'
              : 'hover:ring-1 hover:ring-gray-300'
          } ${option.premium && !isPremium ? 'opacity-50' : ''}`}
        >
          <div className="aspect-square w-full">
            <CosmicBackground
              theme={option.value}
              isPremium={isPremium}
              isPreview={true}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium">{option.label}</span>
            {option.premium && (
              <span className="text-xs text-primary">Premium</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
} 