"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

interface CartContextType {
  cartItems: Product[];
  purchasedItemIds: string[];
  downloadItemIds: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  removeDownload: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [purchasedItemIds, setPurchasedItemIds] = useState<string[]>([]);
  const [downloadItemIds, setDownloadItemIds] = useState<string[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedPurchases = localStorage.getItem("purchasedItemIds");
    const storedDownloads = localStorage.getItem("downloadItemIds");

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
  }, []);

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

  const addToCart = (product: Product) => {
    if (!cartItems.find((p) => p.id === product.id) && !purchasedItemIds.includes(product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((p) => p.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    const newPurchaseIds = cartItems.map((p) => p.id);
    const updatedPurchases = Array.from(new Set([...purchasedItemIds, ...newPurchaseIds]));
    const updatedDownloads = Array.from(new Set([...downloadItemIds, ...newPurchaseIds]));
    
    setPurchasedItemIds(updatedPurchases);
    setDownloadItemIds(updatedDownloads);
    setCartItems([]);
  };

  const removeDownload = (productId: string) => {
    setDownloadItemIds(downloadItemIds.filter((id) => id !== productId));
    setPurchasedItemIds(purchasedItemIds.filter((id) => id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        purchasedItemIds,
        downloadItemIds,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        removeDownload,
      }}
    >
      {children}
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
