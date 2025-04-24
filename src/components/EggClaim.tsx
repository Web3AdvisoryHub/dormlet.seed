'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { OptimizedEggImage } from './OptimizedEggImage';

// Safe environment variable access with fallbacks and debugging
const getEnvVar = (key: string, fallback: string): string => {
  // Debug logging
  console.log(`[DEBUG] Checking ${key}:`, {
    processExists: typeof process !== 'undefined',
    envExists: typeof process !== 'undefined' && !!process.env,
    value: typeof process !== 'undefined' && process.env ? process.env[key] : 'undefined'
  });

  if (typeof process === 'undefined' || !process.env) {
    console.warn(`[WARN] process.env is not available, using fallback for ${key}`);
    return fallback;
  }

  const value = process.env[key];
  if (!value) {
    console.warn(`[WARN] ${key} is not set, using fallback`);
    return fallback;
  }

  return value;
};

// Initialize Supabase client with better error handling
let supabase;
try {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://your-default-url.supabase.co');
  const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'your-anon-key');

  if (!supabaseUrl || supabaseUrl === 'https://your-default-url.supabase.co') {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Please set it in Replit Secrets or .env file.');
  }

  if (!supabaseKey || supabaseKey === 'your-anon-key') {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Please set it in Replit Secrets or .env file.');
  }

  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('[DEBUG] Supabase client initialized successfully');
} catch (error) {
  console.error('[ERROR] Failed to initialize Supabase client:', error);
  // Create a mock client that will throw errors when used
  supabase = {
    from: () => {
      throw new Error('Supabase client not initialized. Please check your environment variables.');
    }
  };
}

// IPFS Gateway URL - can be changed based on preferred gateway
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

// Helper function to convert IPFS URI to HTTP URL
const ipfsToHttp = (ipfsUri: string): string => {
  if (!ipfsUri.startsWith('ipfs://')) return ipfsUri;
  const cid = ipfsUri.replace('ipfs://', '');
  return `${IPFS_GATEWAY}${cid}`;
};

// Helper function to get image URL from metadata URI
const getImageUrl = (metadataUri: string): string => {
  if (!metadataUri) return '/eggs/placeholder.png';
  
  // Extract the CID from the IPFS URI
  const cid = metadataUri.replace('ipfs://', '');
  
  // For now, we'll use the local egg images
  // TODO: Implement IPFS gateway fetching when ready
  const eggNumber = EGG_METADATA_URIS.indexOf(metadataUri) + 1;
  return `/eggs/egg${eggNumber}.png`;
};

// Egg metadata URIs from IPFS
const EGG_METADATA_URIS = [
  'ipfs://bafkreibeux26eqmva5subhgqa4refnqcpfooyj6ikawwer3av7wezpm7bu',
  'ipfs://bafkreidubzayy5nv7jtsykv2w4y2gp7lvczwedoaern27ycrhx56oq4ddi',
  'ipfs://bafkreigc4umo7wol46y5noqtwtjzc35yx2b5z2fjatj644fb57ddq5nutm',
  'ipfs://bafkreied26vulw5bp5e7kjequt37pfedrtwlpjonmin6jhmb27fyrh4waa',
  'ipfs://bafkreihqqqcvuo4resmgiqecc7kxbtkmqjnh772n7nyvawnxtkecfgaoju',
  'ipfs://bafkreibqpcxqzsvudvsu4xsboqnobxgf5lthhcjdiqukzfghzmcoq2btl4',
  'ipfs://bafkreifghvmhwqoybgnw25vjqoqqbocxfl5j53ahlnyjsrmfkpwp24bv3q',
  'ipfs://bafkreihygvhphbtnjkkvqqgg6asxoo6za6lmcxmreluehse3fhpy3iu4f4',
  'ipfs://bafkreid2hagzfzngmpvsfladj7nl3gqiex7ysmzr4pa376sfqtn65zl34i',
  'ipfs://bafkreigusbszixvicvwf5urao2nkefjo4cso3wexobmwz7jcunv33ufv7y',
  'ipfs://bafkreicu32kjljje4edypf6tsd73zmk4qgan5fddfcu2yf2jcgtfed3yoi',
  'ipfs://bafkreiepkshxzakb3vr43vofuns6dobniwn6e3bpz77lx4pnds5g4uzazm',
  'ipfs://bafkreiez7aro5zl4xg7pte2nydhqqvo2iko4q2nb6zkth2mh2324vsjo4u',
  'ipfs://bafkreieg2tehu724itomzq3cnfaehrxvoxv42qlx4oepabo7tsthowm3ni',
  'ipfs://bafkreiagr5oibg7aw6nsqk2gajuoueng6o2xrqw2brap54jq4gmwekaczy',
  'ipfs://bafkreid6mk6vidd3d3yh7ywl3n67whqrrlqtbl7mvdpd5wrk645eyrdgdy',
  'ipfs://bafkreidahmtbzcnq4iyd674bnvkhr5bi53ctcdzacsfodldqtuyucj7vkq',
  'ipfs://bafkreiazoszsyfujtrzstgmsbvm2qmozgmmph37lsepz4rzhjnrxwpnjiu',
  'ipfs://bafkreiew32kaljnv7frv5blihq4oepdzj5qz6igxgfc5e7q7qs677hw2lm',
];

interface EggClaimProps {
  userId: string;
  onClaimComplete: (eggData: {
    eggUri: string;
    creatureName: string;
    creatureStory: string;
    isPublic: boolean;
    canRegift: boolean;
  }) => void;
}

export const EggClaim: React.FC<EggClaimProps> = ({ userId, onClaimComplete }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [selectedEgg, setSelectedEgg] = useState<string | null>(null);
  const [creatureName, setCreatureName] = useState('');
  const [creatureStory, setCreatureStory] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [canRegift, setCanRegift] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has already claimed an egg
  const checkClaimStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('egg_claims')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setHasClaimed(true);
        setSelectedEgg(data.egg_uri);
        setCreatureName(data.creature_name);
        setCreatureStory(data.creature_story);
        setIsPublic(data.is_public);
        setCanRegift(data.can_regift);
      }
    } catch (err) {
      console.error('Error checking claim status:', err);
      setError('Failed to check claim status');
    }
  };

  // Handle egg claim
  const handleClaim = async () => {
    if (!selectedEgg) return;
    
    setIsClaiming(true);
    setError(null);

    try {
      // Save claim to Supabase
      const { error } = await supabase
        .from('egg_claims')
        .insert([
          {
            user_id: userId,
            egg_uri: selectedEgg,
            creature_name: creatureName,
            creature_story: creatureStory,
            is_public: isPublic,
            can_regift: canRegift,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setHasClaimed(true);
      onClaimComplete({
        eggUri: selectedEgg,
        creatureName,
        creatureStory,
        isPublic,
        canRegift
      });
    } catch (err) {
      console.error('Error claiming egg:', err);
      setError('Failed to claim egg');
    } finally {
      setIsClaiming(false);
    }
  };

  // Select a random egg
  const selectRandomEgg = () => {
    const randomIndex = Math.floor(Math.random() * EGG_METADATA_URIS.length);
    setSelectedEgg(EGG_METADATA_URIS[randomIndex]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <AnimatePresence>
        {!hasClaimed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Claim Your Dormlit Egg</h2>
            
            {!selectedEgg ? (
              <motion.button
                onClick={selectRandomEgg}
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Select Your Egg
              </motion.button>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square bg-white/10 rounded-lg p-4">
                  <OptimizedEggImage
                    src={getImageUrl(selectedEgg)}
                    alt="Selected Egg"
                    className="w-full h-full"
                  />
                </div>

                <input
                  type="text"
                  value={creatureName}
                  onChange={(e) => setCreatureName(e.target.value)}
                  placeholder="Name your creature..."
                  className="w-full p-3 bg-white/10 text-white rounded-lg placeholder-white/40"
                />

                <textarea
                  value={creatureStory}
                  onChange={(e) => setCreatureStory(e.target.value)}
                  placeholder="Write your creature's story..."
                  className="w-full h-32 p-3 bg-white/10 text-white rounded-lg placeholder-white/40 resize-none"
                />

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="text-white/60">Make story public</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={canRegift}
                      onChange={(e) => setCanRegift(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="text-white/60">Enable future regifting</span>
                  </label>
                </div>

                <motion.button
                  onClick={handleClaim}
                  disabled={isClaiming || !creatureName || !creatureStory}
                  className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isClaiming ? 'Claiming...' : 'Claim Egg'}
                </motion.button>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">Your Dormlit Egg</h2>
            
            <div className="aspect-square bg-white/10 rounded-lg p-4">
              <OptimizedEggImage
                src={selectedEgg ? getImageUrl(selectedEgg) : '/eggs/placeholder.png'}
                alt="Your Egg"
                className="w-full h-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{creatureName}</h3>
              <p className="text-white/80">{creatureStory}</p>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>{isPublic ? 'Public' : 'Private'}</span>
                {canRegift && <span>Regift Enabled</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 