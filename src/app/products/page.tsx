"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Zap, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const TARGET_PRODUCTS = ["secret-of-the-universe", "wonders-of-earth-vol1"];

export default function MarketplacePage() {
  const router = useRouter();
  const { cartItems, likedItemIds, downloadItemIds, addToCart, removeFromCart, addToWishlist, removeFromWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayedProducts = products.filter(p => TARGET_PRODUCTS.includes(p.id));

  const handleToggleCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (cartItems.some(p => p.id === product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleToggleLike = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (likedItemIds.includes(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    router.push("/cart");
  };

  return (
    <div className="bg-[#050816] min-h-screen text-white pt-10 pb-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Product Grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
          {displayedProducts.map((product) => {
            const inCart = cartItems.some(p => p.id === product.id);
            const isLiked = likedItemIds.includes(product.id);
            const isPurchased = downloadItemIds.includes(product.id);

            return (
              <motion.div
                key={product.id}
                layoutId={`card-${product.id}`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer rounded-3xl overflow-hidden glass border border-white/10 flex flex-col hover:border-primary/50 transition-all duration-300 shadow-lg w-full sm:w-[280px] shrink-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img 
                    layoutId={`image-${product.id}`}
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Action Icons */}
                  {!isPurchased && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={(e) => handleToggleLike(e, product)}
                        className="p-2 rounded-full glass border border-white/20 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md text-white"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => handleToggleCart(e, product)}
                        className={`p-2 rounded-full glass border border-white/20 transition-colors backdrop-blur-md text-white ${inCart ? 'bg-green-500/20 hover:bg-green-500/40 border-green-500/50' : 'bg-black/40 hover:bg-black/60'}`}
                        title={inCart ? "Remove from Cart" : "Add to Cart"}
                      >
                        {inCart ? <Check className="w-5 h-5 text-green-400" /> : <ShoppingCart className="w-5 h-5" />}
                      </button>
                    </div>
                  )}
                  {isPurchased && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Purchased
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <motion.h3 layoutId={`title-${product.id}`} className="text-xl font-bold text-white text-center">
                    {product.title}
                  </motion.h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`card-${selectedProduct.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass border border-white/20 rounded-3xl shadow-2xl flex flex-col md:flex-row z-10 bg-[#0a0f25]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Cover Image */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
                <motion.img 
                  layoutId={`image-${selectedProduct.id}`}
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <motion.h2 layoutId={`title-${selectedProduct.id}`} className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
                    {selectedProduct.title}
                  </motion.h2>
                  <p className="text-subtext text-base leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>
                </div>

                {downloadItemIds.includes(selectedProduct.id) ? (
                  <div className="flex flex-col gap-3 mt-6">
                    <div className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500/20 text-green-400 border border-green-500/50 font-bold text-lg">
                      <Check className="w-5 h-5" /> Already Purchased
                    </div>
                    <button 
                      onClick={() => router.push("/downloads")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
                    >
                      Go to Downloads
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-6">
                    <button 
                      onClick={() => handleBuyNow(selectedProduct)}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(110,86,207,0.5)] transition-all"
                    >
                      <Zap className="w-5 h-5" /> Buy Now
                    </button>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          if (cartItems.some(p => p.id === selectedProduct.id)) {
                            removeFromCart(selectedProduct.id);
                          } else {
                            addToCart(selectedProduct);
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition-all ${cartItems.some(p => p.id === selectedProduct.id) ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                      >
                        {cartItems.some(p => p.id === selectedProduct.id) ? (
                          <><Check className="w-5 h-5" /> In Cart</>
                        ) : (
                          <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                        )}
                      </button>
                      
                      <button 
                        onClick={() => {
                          if (likedItemIds.includes(selectedProduct.id)) {
                            removeFromWishlist(selectedProduct.id);
                          } else {
                            addToWishlist(selectedProduct.id);
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
                      >
                        <Heart className={`w-5 h-5 ${likedItemIds.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} /> 
                        {likedItemIds.includes(selectedProduct.id) ? 'Liked' : 'Like'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
