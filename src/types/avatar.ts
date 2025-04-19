export type OutfitCategory = 'hair' | 'top' | 'pants' | 'shoes' | 'accessories';

export interface OutfitOption {
  id: string;
  name: string;
  color: string;
  category: OutfitCategory;
  texture?: string; // For future texture mapping
  scale?: number; // For size adjustments
  position?: { x: number; y: number; z: number }; // For 3D positioning
  rotation?: { x: number; y: number; z: number }; // For 3D rotation
}

export interface AvatarStyle {
  hair: OutfitOption;
  top: OutfitOption;
  pants: OutfitOption;
  shoes: OutfitOption;
  accessories: OutfitOption[];
}

export const outfitOptions: Record<OutfitCategory, OutfitOption[]> = {
  hair: [
    { 
      id: 'hair1', 
      name: 'Spiky', 
      color: '#FFD700', 
      category: 'hair',
      scale: 1.2,
      position: { x: 0, y: 0.5, z: 0 }
    },
    { 
      id: 'hair2', 
      name: 'Curly', 
      color: '#8B4513', 
      category: 'hair',
      scale: 1.3,
      position: { x: 0, y: 0.6, z: 0 }
    },
  ],
  top: [
    { 
      id: 'top1', 
      name: 'T-Shirt', 
      color: '#4A90E2', 
      category: 'top',
      scale: 1.1,
      position: { x: 0, y: 0, z: 0 }
    },
    { 
      id: 'top2', 
      name: 'Hoodie', 
      color: '#E24A4A', 
      category: 'top',
      scale: 1.2,
      position: { x: 0, y: 0, z: 0 }
    },
  ],
  pants: [
    { 
      id: 'pants1', 
      name: 'Jeans', 
      color: '#2C3E50', 
      category: 'pants',
      scale: 1.1,
      position: { x: 0, y: -0.5, z: 0 }
    },
    { 
      id: 'pants2', 
      name: 'Shorts', 
      color: '#34495E', 
      category: 'pants',
      scale: 1.0,
      position: { x: 0, y: -0.4, z: 0 }
    },
  ],
  shoes: [
    { 
      id: 'shoes1', 
      name: 'Sneakers', 
      color: '#8B4513', 
      category: 'shoes',
      scale: 0.8,
      position: { x: 0, y: -1, z: 0 }
    },
    { 
      id: 'shoes2', 
      name: 'Boots', 
      color: '#A0522D', 
      category: 'shoes',
      scale: 0.9,
      position: { x: 0, y: -1, z: 0 }
    },
  ],
  accessories: [
    { 
      id: 'acc1', 
      name: 'Glasses', 
      color: '#000000', 
      category: 'accessories',
      scale: 0.5,
      position: { x: 0, y: 0.2, z: 0.5 }
    },
    { 
      id: 'acc2', 
      name: 'Hat', 
      color: '#FF0000', 
      category: 'accessories',
      scale: 0.7,
      position: { x: 0, y: 0.8, z: 0 }
    },
  ],
}; 