"use client";

import { User as UserIcon, LogOut, Trash2, Edit2, Check, Loader2, ArrowLeft, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { user, logout, refreshUser, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editPosition, setEditPosition] = useState("Student");
  const [editCompany, setEditCompany] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (user) {
      setEditName(user.fullName);
      setEditPosition(user.position || "Student");
      setEditCompany(user.company || "");
      if (user.dob) {
        try {
          const date = new Date(user.dob);
          setEditDob(date.toISOString().split("T")[0]);
        } catch {
          setEditDob(user.dob);
        }
      }
    }
  }, [user, isEditing]); // Reset fields when opening modal

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
        body: JSON.stringify({ 
          fullName: editName, 
          dob: editDob,
          position: editPosition,
          company: editCompany 
        }),
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
    <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 pointer-events-none" />
        
        <div className="p-6 md:p-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex flex-col items-center mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full -z-10" />
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-2 border-primary/50 shadow-[0_0_30px_rgba(109,94,247,0.3)] object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border-2 border-white/10 flex items-center justify-center mb-4 shadow-xl">
                <UserIcon size={40} className="text-white/50" />
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-white mb-1 text-center">{user.fullName}</h1>
            <p className="text-primary font-medium text-sm">{user.position}</p>
          </div>

          <div className="bg-black/20 rounded-2xl p-5 border border-white/5 mb-8">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest">Personal Information</h2>
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors">
                <Edit2 size={14} /> Edit
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-subtext uppercase tracking-wider mb-1 font-semibold">Email Address</p>
                <p className="text-white text-sm font-medium">{user.email}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-subtext uppercase tracking-wider mb-1 font-semibold">Date of Birth</p>
                <p className="text-white text-sm font-medium">{new Date(user.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              {user.company && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] text-subtext uppercase tracking-wider mb-1 font-semibold">Company</p>
                  <p className="text-white text-sm font-medium">{user.company}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 shadow-sm text-sm"
            >
              <LogOut size={16} /> Sign Out
            </button>

            {showDeleteConfirm ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex flex-col justify-center">
                <p className="text-red-400 text-[10px] mb-2 text-center font-medium">This action is permanent.</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-1.5 rounded-lg text-xs transition-colors border border-white/5">Cancel</button>
                  <button disabled={loading} onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 rounded-lg text-xs transition-colors disabled:opacity-50">
                    {loading ? <Loader2 size={12} className="animate-spin mx-auto" /> : "Delete"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-background border border-white/10 shadow-2xl rounded-2xl overflow-hidden z-10"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ring-primary/50"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1.5">Date of Birth</label>
                    <input 
                      type="date"
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ring-primary/50 color-scheme-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1.5">I am a</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setEditPosition("Student")}
                        className={`py-3 rounded-xl border text-sm font-medium transition-colors ${editPosition === "Student" ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
                      >
                        Student
                      </button>
                      <button 
                        onClick={() => setEditPosition("Employee")}
                        className={`py-3 rounded-xl border text-sm font-medium transition-colors ${editPosition === "Employee" ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
                      >
                        Employee
                      </button>
                    </div>
                  </div>

                  {editPosition === "Employee" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1.5 mt-2">Company Name</label>
                      <input 
                        type="text" 
                        value={editCompany}
                        onChange={(e) => setEditCompany(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ring-primary/50"
                        placeholder="Where do you work?"
                      />
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile} 
                    disabled={saving || !editName || !editDob || (editPosition === "Employee" && !editCompany)}
                    className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(109,94,247,0.3)]"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
