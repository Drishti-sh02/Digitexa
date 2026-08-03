"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User as UserIcon, LogOut, Trash2, Edit2, Check, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";

type ProfilePanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const { user, logout, refreshUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDob, setEditDob] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.fullName);
      // Ensure the DOB is formatted as YYYY-MM-DD for the input[type="date"]
      if (user.dob) {
        try {
          const date = new Date(user.dob);
          setEditDob(date.toISOString().split("T")[0]);
        } catch {
          setEditDob(user.dob);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: editName, dob: editDob }),
      });
      if (res.ok) {
        await refreshUser();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setShowDeleteConfirm(false);
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
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm h-full bg-background/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col scrollbar-hide overflow-y-auto"
          >
            <div className="flex items-center justify-between sticky top-0 bg-background/95 p-6 z-20 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Profile
              </h2>
              <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            {user ? (
              <div className="flex-1 flex flex-col px-6 pb-6 pt-2">
                <div className="flex flex-col items-center mb-8 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full -z-10" />
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-28 h-28 rounded-full mb-4 border-2 border-primary/50 shadow-[0_0_30px_rgba(109,94,247,0.3)] object-cover" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border-2 border-white/10 flex items-center justify-center mb-4 shadow-xl">
                      <UserIcon size={48} className="text-white/50" />
                    </div>
                  )}
                  
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-xl font-bold text-white text-center bg-white/5 border border-primary/50 rounded-lg px-3 py-1 mb-1 focus:outline-none focus:ring-2 ring-primary/50"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-white">{user.fullName}</h3>
                  )}
                  <p className="text-primary font-medium text-sm">{user.position}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Personal Info</h4>
                  {isEditing ? (
                    <button onClick={handleSaveProfile} disabled={saving} className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 hover:bg-green-400/20 px-3 py-1.5 rounded-full transition-colors">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
                    </button>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors">
                      <Edit2 size={14} /> Edit
                    </button>
                  )}
                </div>

                <div className="space-y-3 flex-1 mb-8">
                  <div className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl p-4 border border-white/10 shadow-inner">
                    <p className="text-xs text-subtext uppercase tracking-wider mb-1 font-medium">Email Address</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                  <div className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl p-4 border border-white/10 shadow-inner transition-colors">
                    <p className="text-xs text-subtext uppercase tracking-wider mb-1 font-medium">Date of Birth</p>
                    {isEditing ? (
                      <input 
                        type="date"
                        value={editDob}
                        onChange={(e) => setEditDob(e.target.value)}
                        className="w-full bg-black/20 border border-primary/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 ring-primary/50 color-scheme-dark mt-1"
                      />
                    ) : (
                      <p className="text-white font-medium">{new Date(user.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    )}
                  </div>
                  {user.company && (
                    <div className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl p-4 border border-white/10 shadow-inner">
                      <p className="text-xs text-subtext uppercase tracking-wider mb-1 font-medium">Company</p>
                      <p className="text-white font-medium">{user.company}</p>
                    </div>
                  )}
                </div>

                <div className="mt-auto space-y-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3.5 rounded-xl transition-colors border border-white/10 shadow-sm"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>

                  {showDeleteConfirm ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4 shadow-inner">
                      <p className="text-red-400 text-sm mb-4 text-center font-medium">Are you sure? This action is permanent.</p>
                      <div className="flex gap-2">
                        <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-lg text-sm transition-colors border border-white/5">Cancel</button>
                        <button disabled={loading} onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                          {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Delete"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium py-3.5 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} /> Delete Account
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-6 pb-6">
                <p className="text-subtext">Not logged in.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
