'use client';

import React, { useState, useEffect } from 'react';
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

interface EggClaim {
  id: string;
  egg_uri: string;
  creature_name: string;
  creature_story: string;
  is_public: boolean;
  can_regift: boolean;
  timestamp: string;
}

interface ConstellationVaultProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ConstellationVault: React.FC<ConstellationVaultProps> = ({
  userId,
  isOpen,
  onClose
}) => {
  const [eggs, setEggs] = useState<EggClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEgg, setSelectedEgg] = useState<EggClaim | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user's claimed eggs
  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const { data, error } = await supabase
          .from('egg_claims')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false });

        if (error) throw error;
        setEggs(data || []);
      } catch (err) {
        console.error('Error fetching eggs:', err);
        setError('Failed to load your constellation');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchEggs();
    }
  }, [userId, isOpen]);

  // Update egg privacy
  const togglePrivacy = async (eggId: string, isPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('egg_claims')
        .update({ is_public: isPublic })
        .eq('id', eggId);

      if (error) throw error;

      setEggs(eggs.map(egg => 
        egg.id === eggId ? { ...egg, is_public: isPublic } : egg
      ));
    } catch (err) {
      console.error('Error updating privacy:', err);
      setError('Failed to update privacy settings');
    }
  };

  // Generate gift link (placeholder for future implementation)
  const generateGiftLink = (eggId: string) => {
    // TODO: Implement gift link generation
    console.log('Gift link generation will be implemented in the future');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            className="bg-surface/90 backdrop-blur-md rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Constellation</h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : eggs.length === 0 ? (
              <p className="text-white/60 text-center">Your constellation is empty. Claim your first egg!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eggs.map(egg => (
                  <motion.div
                    key={egg.id}
                    className="bg-white/10 rounded-lg p-4 relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-square bg-white/5 rounded-lg p-2 mb-3">
                      <OptimizedEggImage
                        src={getImageUrl(egg.egg_uri)}
                        alt={egg.creature_name}
                        className="w-full h-full"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {egg.creature_name}
                    </h3>

                    <p className="text-white/80 text-sm line-clamp-2 mb-4">
                      {egg.creature_story}
                    </p>

                    <div className="flex justify-between items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={egg.is_public}
                          onChange={(e) => togglePrivacy(egg.id, e.target.checked)}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span className="text-white/60 text-sm">Public</span>
                      </label>

                      {egg.can_regift && (
                        <button
                          onClick={() => generateGiftLink(egg.id)}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                          disabled
                        >
                          Generate Gift Link
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 