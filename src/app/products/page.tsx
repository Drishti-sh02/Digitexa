"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Download, Check, Star, Filter, Zap } from "lucide-react";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function MarketplacePage() {
  const { cartItems, purchasedItemIds, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  let filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "Price Low → High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price High → Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "Newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      {/* Floating Cart Button */}
      <Link href="/cart">
        <motion.div 
          className="fixed bottom-10 right-10 z-50 w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(110,86,207,0.5)] cursor-pointer hover:scale-110 transition-transform border border-white/20"
          whileHover={{ y: -5 }}
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          {cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold border-2 border-[#050816]">
              {cartItems.length}
            </div>
          )}
        </motion.div>
      </Link>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 border border-white/10"
          >
            <Star className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-white/90 uppercase tracking-wider">Premium Digital Marketplace</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
          >
            Discover Our Premium <span className="text-gradient">Digital Products</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-subtext text-lg max-w-2xl mx-auto"
          >
            Browse high-quality digital resources designed to help businesses, marketers, entrepreneurs, and creators grow faster.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/50" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none cursor-pointer"
            >
              <option value="Popular">Sort by: Popular</option>
              <option value="Newest">Newest</option>
              <option value="Price Low → High">Price: Low to High</option>
              <option value="Price High → Low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const isPurchased = purchasedItemIds.includes(product.id);
              const inCart = cartItems.some(p => p.id === product.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="group relative rounded-3xl overflow-hidden glass border border-white/10 flex flex-col hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(110,86,207,0.15)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img loading="lazy" decoding="async" src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent opacity-80"></div>
                    <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md border border-primary/50 text-xs px-2 py-1 rounded-md text-primary font-medium">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 text-xs px-2 py-1 rounded-md text-white/80">
                      {product.badge}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{product.title}</h3>
                    </div>
                    <p className="text-subtext text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto mb-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-white">{product.rating}</span>
                        <span className="text-xs text-white/50 ml-1">({product.downloads})</span>
                      </div>
                      <div className="text-xl font-bold text-white">${product.price}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto relative z-20">
                      {!isPurchased && (
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={inCart}
                          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${inCart ? 'bg-white/10 border-white/10 text-white/50 cursor-not-allowed' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
                        >
                          {inCart ? <Check className="w-5 h-5 mb-1" /> : <ShoppingCart className="w-5 h-5 mb-1" />}
                          <span className="text-xs font-medium">{inCart ? 'In Cart' : 'Add to Cart'}</span>
                        </button>
                      )}
                      
                      {isPurchased ? (
                        <Link 
                          href="/downloads"
                          className="col-span-2 flex flex-col items-center justify-center py-3 rounded-xl bg-primary/20 border border-primary/50 hover:bg-primary/30 text-white transition-all shadow-[0_0_15px_rgba(110,86,207,0.3)]"
                        >
                          <Download className="w-5 h-5 mb-1 text-primary" />
                          <span className="text-xs font-medium">Already Purchased • Download</span>
                        </Link>
                      ) : (
                        <Link 
                          href="/cart"
                          onClick={() => addToCart(product)}
                          className="flex flex-col items-center justify-center py-3 rounded-xl bg-gradient-to-r from-primary to-accent border border-transparent hover:shadow-[0_0_20px_rgba(110,86,207,0.4)] text-white transition-all"
                        >
                          <Zap className="w-5 h-5 mb-1" />
                          <span className="text-xs font-medium">Buy Now</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-white/50">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
