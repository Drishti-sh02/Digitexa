"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, ChevronDown, MessageSquare, HeadphonesIcon, Bot } from "lucide-react";
import Link from "next/link";

import { blogs } from "../../data/blogs";

const faqs = [
  { q: "What makes Digitexa different from other agencies?", a: "We combine enterprise-level strategic thinking with agile execution. Our deep integration of AI tools allows us to analyze data faster and optimize campaigns in real-time, giving you a competitive edge." },
  { q: "Do you work with startups or established enterprises?", a: "We partner with ambitious brands across the spectrum. Whether you are a Series-A startup looking to aggressively scale or an enterprise needing digital transformation, we have tailored frameworks for your stage." },
  { q: "How do you measure success and ROI?", a: "Before any campaign launches, we define clear KPIs aligned with your business goals (CAC, LTV, ROAS). We build custom live dashboards so you have 100% transparency into exactly how your investment is performing." },
  { q: "What is your typical onboarding process?", a: "Our onboarding is a structured 2-week sprint. It involves deep-dive discovery workshops, technical audits, competitive analysis, and setting up tracking infrastructure before we finalize the 90-day execution roadmap." },
];

export default function HomeBlogFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".blog-card", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" , once: true },
          y: 40, opacity: 0, duration: 0.8, stagger: 0.15
        });
        gsap.from(".faq-content", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 50%" , once: true },
          y: 30, opacity: 0, duration: 0.8
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative bg-[#030510] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Latest Insights Section */}
        <div id="blog" className="mb-32 scroll-mt-24">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Latest <span className="text-gradient">Insights</span></h2>
              <p className="text-subtext">Actionable strategies, industry trends, and technical guides from our experts.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, idx) => (
              <Link key={idx} href={`/blog/${blog.slug}`} className="blog-card group flex flex-col glass rounded-2xl border border-white/10 hover:border-primary/50 transition-colors overflow-hidden">
                <div className="w-full h-56 relative overflow-hidden">
                  <img loading="lazy" decoding="async" src={blog.heroImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold text-primary border border-white/10 uppercase tracking-wider">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-xs text-subtext mb-4">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug mb-6 flex-grow">
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white/90">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary group-hover:text-white transition-colors bg-primary/10 group-hover:bg-primary px-4 py-2 rounded-lg">
                      View <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="faq-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-white/10 pt-24">
          
          {/* FAQ Illustration Left */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden glass border border-white/10 group">
             <img loading="lazy" decoding="async" 
               src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop" 
               alt="Customer Support" 
               className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
             
             {/* Floating Support Widget */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-10 left-10 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl flex items-center gap-4"
             >
               <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                 <HeadphonesIcon className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <div className="text-lg font-bold text-white">24/7 Support</div>
                 <div className="text-xs text-subtext">Dedicated account managers</div>
               </div>
             </motion.div>

             {/* Floating Bot Widget */}
             <motion.div 
               animate={{ y: [10, -10, 10] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-10 right-10 glass p-4 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl"
             >
               <Bot className="w-8 h-8 text-accent" />
             </motion.div>
          </div>

          {/* FAQ Accordion Right */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-subtext text-lg">Everything you need to know about partnering with Digitexa.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="glass border border-white/10 rounded-2xl overflow-hidden">
                    <button 
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-white/5 transition-colors"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span className={`font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-white'}`}>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-subtext transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 text-subtext text-sm leading-relaxed border-t border-white/5 mt-2 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
