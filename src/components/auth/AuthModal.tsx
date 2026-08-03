"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { refreshUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // For new users needing onboarding
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [googleData, setGoogleData] = useState<any>(null);
  const [onboardData, setOnboardData] = useState({
    dob: "",
    position: "Student",
    company: "",
  });

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

  const handleClose = () => {
    setNeedsOnboarding(false);
    setGoogleData(null);
    setError("");
    setOnboardData({ dob: "", position: "Student", company: "" });
    onClose();
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      if (data.isNewUser) {
        setGoogleData(data.googleData);
        setNeedsOnboarding(true);
      } else {
        await refreshUser();
        handleClose();
      }
    } catch (err: any) {
      setError(err.message || "Google Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleData, onboardData }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      await refreshUser();
      handleClose();
    } catch (err: any) {
      setError(err.message || "Onboarding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-background border border-white/10 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] styled-scrollbar flex flex-col items-center"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {!needsOnboarding ? (
              <div className="w-full flex flex-col items-center">
                <img src="/Logo.png" alt="Digitexa" className="h-12 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome</h2>
                <p className="text-subtext mb-8 text-center text-sm">Log in or create an account to continue.</p>
                
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google Login Failed")}
                    useOneTap
                    theme="filled_black"
                    shape="pill"
                    text="continue_with"
                    width="100%"
                  />
                </div>
                
                {loading && <Loader2 className="w-6 h-6 animate-spin text-primary mt-6" />}
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-col items-center mb-6">
                  {googleData?.profilePicture ? (
                     <img src={googleData.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mb-3 border-2 border-primary/50" />
                  ) : (
                     <div className="w-16 h-16 rounded-full mb-3 border-2 border-primary/50 bg-white/10" />
                  )}
                  <h2 className="text-xl font-bold text-white">Almost there, {googleData?.fullName?.split(' ')[0]}!</h2>
                  <p className="text-subtext text-sm text-center mt-1">We just need a few more details to set up your profile.</p>
                </div>
                
                <form onSubmit={handleOnboardSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-subtext uppercase tracking-wider mb-1 block">Date of Birth</label>
                    <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary color-scheme-dark" value={onboardData.dob} onChange={(e) => setOnboardData({...onboardData, dob: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-subtext uppercase tracking-wider mb-1 block">I am a</label>
                    <select required className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" value={onboardData.position} onChange={(e) => setOnboardData({...onboardData, position: e.target.value})}>
                      <option value="Student">Student</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  {onboardData.position === "Employee" && (
                    <div>
                      <label className="text-xs text-subtext uppercase tracking-wider mb-1 block">Company Name</label>
                      <input required type="text" placeholder="Your Company" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" value={onboardData.company} onChange={(e) => setOnboardData({...onboardData, company: e.target.value})} />
                    </div>
                  )}
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  
                  <button disabled={loading} type="submit" className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors mt-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Complete Registration"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
