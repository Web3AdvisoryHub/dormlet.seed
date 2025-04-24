'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';

interface UserLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order_index: number;
  is_public: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

interface UserLinksProps {
  userId: string;
  isEditable?: boolean;
}

export default function UserLinks({ userId, isEditable = false }: UserLinksProps) {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '', is_public: true });

  // Fetch user links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksRef = collection(db, 'user_links');
        const q = query(
          linksRef,
          where('user_id', '==', userId),
          orderBy('order_index', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const linksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserLink[];
        
        setLinks(linksData);
      } catch (err) {
        console.error('Error fetching links:', err);
        setError('Failed to load links');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [userId]);

  // Add new link
  const handleAddLink = async () => {
    try {
      const linksRef = collection(db, 'user_links');
      const newLinkData = {
        user_id: userId,
        ...newLink,
        order_index: links.length,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      };
      
      const docRef = await addDoc(linksRef, newLinkData);
      setLinks([...links, { id: docRef.id, ...newLinkData }]);
      setNewLink({ title: '', url: '', icon: '', is_public: true });
      setIsAdding(false);
    } catch (err) {
      console.error('Error adding link:', err);
      setError('Failed to add link');
    }
  };

  // Delete link
  const handleDeleteLink = async (linkId: string) => {
    try {
      const linkRef = doc(db, 'user_links', linkId);
      await deleteDoc(linkRef);
      setLinks(links.filter(link => link.id !== linkId));
    } catch (err) {
      console.error('Error deleting link:', err);
      setError('Failed to delete link');
    }
  };

  // Toggle link visibility
  const handleToggleVisibility = async (linkId: string, currentVisibility: boolean) => {
    try {
      const linkRef = doc(db, 'user_links', linkId);
      await updateDoc(linkRef, {
        is_public: !currentVisibility,
        updated_at: Timestamp.now()
      });
      
      setLinks(links.map(link => 
        link.id === linkId ? { ...link, is_public: !currentVisibility } : link
      ));
    } catch (err) {
      console.error('Error updating link visibility:', err);
      setError('Failed to update link visibility');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Display links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map(link => (
          <motion.div
            key={link.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {link.icon && <span className="text-2xl">{link.icon}</span>}
                <div>
                  <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white/80"
                  >
                    {link.url}
                  </a>
                </div>
              </div>
              {isEditable && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleVisibility(link.id, link.is_public)}
                    className="p-2 text-white/60 hover:text-white"
                  >
                    {link.is_public ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add new link form */}
      {isEditable && (
        <div className="mt-6">
          {!isAdding ? (
            <motion.button
              onClick={() => setIsAdding(true)}
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlus />
              <span>Add New Link</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  placeholder="Link Title"
                  className="input-primary"
                />
                <input
                  type="text"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="URL"
                  className="input-primary"
                />
                <input
                  type="text"
                  value={newLink.icon}
                  onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                  placeholder="Icon (emoji)"
                  className="input-primary"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newLink.is_public}
                    onChange={(e) => setNewLink({ ...newLink, is_public: e.target.checked })}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="text-white/60">Make public</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddLink}
                    className="btn-primary flex-1"
                    disabled={!newLink.title || !newLink.url}
                  >
                    Add Link
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
} 