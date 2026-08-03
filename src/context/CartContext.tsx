"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/useUser";

interface CartContextType {
  cartItems: Product[];
  purchasedItemIds: string[];
  downloadItemIds: string[];
  purchaseDates: Record<string, string>;
  likedItemIds: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  removeDownload: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [purchasedItemIds, setPurchasedItemIds] = useState<string[]>([]);
  const [downloadItemIds, setDownloadItemIds] = useState<string[]>([]);
  const [purchaseDates, setPurchaseDates] = useState<Record<string, string>>({});
  const [likedItemIds, setLikedItemIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const { user } = useUser();
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedPurchases = localStorage.getItem("purchasedItemIds");
    const storedDownloads = localStorage.getItem("downloadItemIds");
    const storedPurchaseDates = localStorage.getItem("purchaseDates");
    const storedLikedItems = localStorage.getItem("likedItemIds");

    if (storedCart) setCartItems(JSON.parse(storedCart));
    
    let parsedDownloads: string[] = [];
    if (storedDownloads) {
      parsedDownloads = JSON.parse(storedDownloads);
      setDownloadItemIds(parsedDownloads);
    }
    
    if (storedPurchases) {
      const parsedPurchases: string[] = JSON.parse(storedPurchases);
      // Clean up desynced state: only keep purchases that are still in downloads
      const validPurchases = parsedPurchases.filter(id => parsedDownloads.includes(id));
      setPurchasedItemIds(validPurchases);
    }

    if (storedPurchaseDates) {
      setPurchaseDates(JSON.parse(storedPurchaseDates));
    }
    
    if (storedLikedItems) {
      setLikedItemIds(JSON.parse(storedLikedItems));
    }
  }, []);

  // Sync down from Cloud when user logs in
  useEffect(() => {
    if (user && !isCloudSynced) {
      fetch("/api/user/sync")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.syncData) {
            const sd = data.syncData;
            // Merge cloud data with local data (unique elements)
            setCartItems(prev => {
              const cloudCartIds = sd.cartItemIds || [];
              const newItems = cloudCartIds
                .map((id: string) => products.find(p => p.id === id))
                .filter(Boolean) as Product[];
              
              const merged = [...prev];
              newItems.forEach(item => {
                if (!merged.find(i => i.id === item.id)) merged.push(item);
              });
              return merged;
            });
            
            setPurchasedItemIds(prev => Array.from(new Set([...prev, ...(sd.purchasedItemIds || [])])));
            setDownloadItemIds(prev => Array.from(new Set([...prev, ...(sd.downloadItemIds || [])])));
            setLikedItemIds(prev => Array.from(new Set([...prev, ...(sd.likedItemIds || [])])));
            setPurchaseDates(prev => ({ ...prev, ...(sd.purchaseDates || {}) }));
            
            setIsCloudSynced(true);
          }
        })
        .catch(err => console.error("Cloud sync failed:", err));
    } else if (!user) {
      setIsCloudSynced(false); // Reset on logout
    }
  }, [user, isCloudSynced]);

  // Sync up to Cloud whenever state changes
  useEffect(() => {
    if (user && isCloudSynced) {
      const syncUp = setTimeout(() => {
        fetch("/api/user/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItemIds: cartItems.map(p => p.id),
            likedItemIds,
            downloadItemIds,
            purchasedItemIds,
            purchaseDates,
          })
        }).catch(err => console.error("Failed to sync up:", err));
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(syncUp);
    }
  }, [cartItems, likedItemIds, downloadItemIds, purchasedItemIds, purchaseDates, user, isCloudSynced]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("purchasedItemIds", JSON.stringify(purchasedItemIds));
  }, [purchasedItemIds]);

  useEffect(() => {
    localStorage.setItem("downloadItemIds", JSON.stringify(downloadItemIds));
  }, [downloadItemIds]);

  useEffect(() => {
    localStorage.setItem("purchaseDates", JSON.stringify(purchaseDates));
  }, [purchaseDates]);

  useEffect(() => {
    localStorage.setItem("likedItemIds", JSON.stringify(likedItemIds));
  }, [likedItemIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product) => {
    if (!cartItems.find((p) => p.id === product.id) && !purchasedItemIds.includes(product.id)) {
      setCartItems([...cartItems, product]);
      showToast(`"${product.title}" added to cart!`);
    } else if (cartItems.find((p) => p.id === product.id)) {
      showToast(`"${product.title}" is already in your cart`);
    } else {
      showToast(`You already purchased "${product.title}"`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((p) => p.id !== productId));
    const product = products.find(p => p.id === productId);
    if (product) {
      showToast(`"${product.title}" removed from cart`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    const newPurchaseIds = cartItems.map((p) => p.id);
    const updatedPurchases = Array.from(new Set([...purchasedItemIds, ...newPurchaseIds]));
    const updatedDownloads = Array.from(new Set([...downloadItemIds, ...newPurchaseIds]));
    
    const newDates = { ...purchaseDates };
    const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    newPurchaseIds.forEach((id) => {
      if (!newDates[id]) newDates[id] = today;
    });

    setPurchasedItemIds(updatedPurchases);
    setDownloadItemIds(updatedDownloads);
    setPurchaseDates(newDates);
    setCartItems([]);
  };

  const removeDownload = (productId: string) => {
    setDownloadItemIds(downloadItemIds.filter((id) => id !== productId));
    setPurchasedItemIds(purchasedItemIds.filter((id) => id !== productId));
  };
  
  const addToWishlist = (productId: string) => {
    if (!likedItemIds.includes(productId)) {
      setLikedItemIds([...likedItemIds, productId]);
      const product = products.find(p => p.id === productId);
      if (product) {
        showToast(`"${product.title}" added to wishlist!`);
      }
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        showToast(`"${product.title}" is already in your wishlist`);
      }
    }
  };

  const removeFromWishlist = (productId: string) => {
    setLikedItemIds(likedItemIds.filter(id => id !== productId));
    const product = products.find(p => p.id === productId);
    if (product) {
      showToast(`"${product.title}" removed from wishlist`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        purchasedItemIds,
        downloadItemIds,
        purchaseDates,
        likedItemIds,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        removeDownload,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] bg-white text-[#050816] px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/20 font-bold text-sm md:text-base flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
