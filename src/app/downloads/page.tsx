"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Trash2, HardDrive, Calendar, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

export default function DownloadsPage() {
  const { downloadItemIds, removeDownload, purchaseDates } = useCart();
  const { user, loading } = useUser();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const myDownloads = products.filter(p => downloadItemIds.includes(p.id));

  if (loading) {
    return (
      <div className="bg-[#050816] min-h-screen pt-32 pb-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#050816] min-h-screen text-white pt-32 pb-24 relative flex items-center justify-center">
        <div className="text-center py-16 px-8 glass rounded-3xl border border-white/10 max-w-md w-full mx-4 shadow-2xl">
          <HardDrive className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
          <p className="text-subtext mb-8">Sign in to see your downloads.</p>
          <button 
            onClick={() => window.dispatchEvent(new Event("openAuth"))}
            className="inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Hero */}
        <div className="mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">My <span className="text-gradient">Downloads</span></h1>
            <p className="text-subtext text-lg max-w-2xl">Access every digital product you've purchased anytime.</p>
          </div>
          {myDownloads.length > 0 && (
            <Link 
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all shrink-0"
            >
              Back to Store
            </Link>
          )}
        </div>

        {myDownloads.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl border border-white/10 max-w-3xl mx-auto">
            <HardDrive className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">No downloads available</h2>
            <p className="text-subtext mb-8">You haven't purchased any digital products yet, or you've deleted them from this view.</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {myDownloads.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col relative"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={product.cardImage || product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-4">{product.title}</h3>
                    
                    <div className="space-y-2 mb-8 mt-auto">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-subtext flex items-center gap-2"><Calendar className="w-4 h-4" /> Purchased</span>
                        <span className="text-white">{purchaseDates[product.id] || "Just now"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {product.downloadUrl ? (
                        <a 
                          href={product.downloadUrl}
                          download
                          className="col-span-3 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
                        >
                          <Download className="w-5 h-5" /> Download
                        </a>
                      ) : (
                        <button 
                          onClick={() => {
                            alert(`Starting download for ${product.title}... (No actual file linked yet)`);
                          }}
                          className="col-span-3 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] transition-all"
                        >
                          <Download className="w-5 h-5" /> Download
                        </button>
                      )}
                      <button 
                        onClick={() => setDeleteConfirm(product.id)}
                        className="col-span-1 flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 text-white/50 hover:text-red-500 transition-colors"
                        title="Remove from Downloads"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/90 backdrop-blur-sm px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass max-w-sm w-full p-6 rounded-3xl border border-white/20 shadow-2xl relative"
            >
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/50">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">Remove from Downloads?</h3>
              <p className="text-subtext text-sm mb-6">
                Are you sure you want to delete this product from your downloads list? You can restore it later from your purchase history.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    removeDownload(deleteConfirm);
                    setDeleteConfirm(null);
                  }}
                  className="py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
