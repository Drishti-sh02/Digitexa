"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User as UserIcon, LogOut, Trash2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

type ProfilePanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const { user, logout, refreshUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/delete", { method: "DELETE" });
      await refreshUser();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm h-full bg-background border-l border-white/10 shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Profile</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {user ? (
              <div className="flex-1 flex flex-col">
                <div className="flex flex-col items-center mb-8">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-2 border-primary/30 shadow-[0_0_15px_rgba(109,94,247,0.3)]" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <UserIcon size={40} className="text-white/30" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white">{user.fullName}</h3>
                  <p className="text-subtext">{user.position}</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-subtext uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-subtext uppercase tracking-wider mb-1">Date of Birth</p>
                    <p className="text-white">{new Date(user.dob).toLocaleDateString()}</p>
                  </div>
                  {user.company && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-subtext uppercase tracking-wider mb-1">Company</p>
                      <p className="text-white">{user.company}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition-colors border border-white/10"
                  >
                    <LogOut size={18} /> Logout
                  </button>

                  {showDeleteConfirm ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4">
                      <p className="text-red-400 text-sm mb-3">Are you sure? This action cannot be undone.</p>
                      <div className="flex gap-2">
                        <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm">Cancel</button>
                        <button disabled={loading} onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm disabled:opacity-50">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-3 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} /> Delete Account
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-subtext">Not logged in.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
