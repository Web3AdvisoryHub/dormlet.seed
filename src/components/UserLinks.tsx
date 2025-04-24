"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { db } from "@/lib/firebase";
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
  Timestamp,
} from "@firebase/firestore";

interface UserLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  orderIndex: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserLinksProps {
  username: string;
  isEditable: boolean;
}

export default function UserLinks({ username, isEditable }: UserLinksProps) {
  const [links, setLinks] = useState<UserLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    icon: "🔗",
    isPublic: true,
  });

  // Fetch user links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksRef = collection(db, "user_links");
        const q = query(
          linksRef,
          where("username", "==", username),
          orderBy("orderIndex", "asc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedLinks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        })) as UserLink[];

        setLinks(fetchedLinks);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to load links");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [username]);

  // Add new link
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const linksRef = collection(db, "user_links");
      const newLinkData = {
        ...newLink,
        username,
        orderIndex: links.length,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addDoc(linksRef, newLinkData);
      setNewLink({
        title: "",
        url: "",
        icon: "🔗",
        isPublic: true,
      });
      setIsAddingLink(false);
      // Refresh links
      const q = query(
        linksRef,
        where("username", "==", username),
        orderBy("orderIndex", "asc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as UserLink[];
      setLinks(fetchedLinks);
    } catch (err) {
      console.error("Error adding link:", err);
      setError("Failed to add link");
    }
  };

  // Delete link
  const handleDeleteLink = async (linkId: string) => {
    try {
      await deleteDoc(doc(db, "user_links", linkId));
      setLinks(links.filter((link) => link.id !== linkId));
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link");
    }
  };

  // Toggle link visibility
  const handleToggleVisibility = async (
    linkId: string,
    currentVisibility: boolean
  ) => {
    try {
      const linkRef = doc(db, "user_links", linkId);
      await updateDoc(linkRef, {
        isPublic: !currentVisibility,
        updatedAt: Timestamp.now(),
      });

      setLinks(
        links.map((link) =>
          link.id === linkId ? { ...link, isPublic: !currentVisibility } : link
        )
      );
    } catch (err) {
      console.error("Error toggling link visibility:", err);
      setError("Failed to update link visibility");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Display links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {link.title}
                  </h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {link.url}
                  </a>
                </div>
              </div>
              {isEditable && (
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleToggleVisibility(link.id, link.isPublic)
                    }
                    className="text-white/60 hover:text-white"
                    title={link.isPublic ? "Make Private" : "Make Public"}
                  >
                    {link.isPublic ? "👁️" : "👁️‍🗨️"}
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete Link"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add new link form */}
      {isEditable && (
        <div className="mb-6">
          {!isAddingLink ? (
            <button
              onClick={() => setIsAddingLink(true)}
              className="btn-primary"
            >
              Add New Link
            </button>
          ) : (
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white/80"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  className="input-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-white/80"
                >
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  className="input-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-white/80"
                >
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  id="icon"
                  value={newLink.icon}
                  onChange={(e) =>
                    setNewLink({ ...newLink, icon: e.target.value })
                  }
                  className="input-primary"
                  maxLength={2}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newLink.isPublic}
                  onChange={(e) =>
                    setNewLink({ ...newLink, isPublic: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isPublic"
                  className="ml-2 block text-sm text-white/80"
                >
                  Public
                </label>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">
                  Add Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingLink(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
