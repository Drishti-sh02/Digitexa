"use client";

import { User as UserIcon, LogOut, Trash2, Edit2, Check, Loader2, ArrowLeft } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, logout, refreshUser, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDob, setEditDob] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (user) {
      setEditName(user.fullName);
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/delete", { method: "DELETE" });
      await refreshUser();
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
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

  if (userLoading || !user) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 pointer-events-none" />
        
        <div className="p-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <div className="flex flex-col items-center mb-10 relative">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full -z-10" />
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mb-6 border-4 border-primary/50 shadow-[0_0_40px_rgba(109,94,247,0.3)] object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border-4 border-white/10 flex items-center justify-center mb-6 shadow-xl">
                <UserIcon size={56} className="text-white/50" />
              </div>
            )}
            
            {isEditing ? (
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-2xl font-bold text-white text-center bg-white/5 border border-primary/50 rounded-xl px-4 py-2 mb-2 focus:outline-none focus:ring-2 ring-primary/50"
              />
            ) : (
              <h1 className="text-3xl font-bold text-white mb-2">{user.fullName}</h1>
            )}
            <p className="text-primary font-medium">{user.position}</p>
          </div>

          <div className="bg-black/20 rounded-2xl p-6 border border-white/5 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Personal Information</h2>
              {isEditing ? (
                <button onClick={handleSaveProfile} disabled={saving} className="flex items-center gap-2 text-sm font-bold text-green-400 bg-green-400/10 hover:bg-green-400/20 px-4 py-2 rounded-full transition-colors">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save Changes
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors">
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                <p className="text-xs text-subtext uppercase tracking-wider mb-2 font-semibold">Email Address</p>
                <p className="text-white text-lg font-medium">{user.email}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-5 border border-white/5 transition-colors">
                <p className="text-xs text-subtext uppercase tracking-wider mb-2 font-semibold">Date of Birth</p>
                {isEditing ? (
                  <input 
                    type="date"
                    value={editDob}
                    onChange={(e) => setEditDob(e.target.value)}
                    className="w-full bg-black/40 border border-primary/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ring-primary/50 color-scheme-dark mt-1 text-lg"
                  />
                ) : (
                  <p className="text-white text-lg font-medium">{new Date(user.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
              </div>
              
              {user.company && (
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <p className="text-xs text-subtext uppercase tracking-wider mb-2 font-semibold">Company</p>
                  <p className="text-white text-lg font-medium">{user.company}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors border border-white/10 shadow-sm"
            >
              <LogOut size={20} /> Sign Out
            </button>

            {showDeleteConfirm ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-red-400 text-xs mb-3 text-center font-medium">This action is permanent.</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2 rounded-lg text-sm transition-colors border border-white/5">Cancel</button>
                  <button disabled={loading} onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
                    {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Confirm Delete"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-semibold py-4 rounded-xl transition-colors"
              >
                <Trash2 size={20} /> Delete Account
              </button>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
