'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import DreamyLayout from '@/components/DreamyLayout';
import UserLinks from '@/components/UserLinks';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

interface UserProfile {
  id: string;
  username: string;
  bio: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get current user if logged in
        const currentUser = auth.currentUser;
        
        // Fetch profile data
        const profilesRef = collection(db, 'profiles');
        const q = query(profilesRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          throw new Error('Profile not found');
        }
        
        const profileData = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data()
        } as UserProfile;
        
        setProfile(profileData);
        setIsOwnProfile(currentUser?.uid === profileData.id);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <DreamyLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </DreamyLayout>
    );
  }

  if (error || !profile) {
    return (
      <DreamyLayout>
        <div className="text-red-500 text-center p-4">
          {error || 'Profile not found'}
        </div>
      </DreamyLayout>
    );
  }

  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src={profile.avatar_url || '/avatar-placeholder.png'}
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">@{profile.username}</h1>
            <p className="text-white/80">{profile.bio}</p>
          </div>

          {/* User Links */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Links</h2>
            <UserLinks userId={profile.id} isEditable={isOwnProfile} />
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 