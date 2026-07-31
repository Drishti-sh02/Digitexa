"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#050816] min-h-screen text-white pb-24 flex flex-col">
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 mb-12 grid grid-cols-3 items-center bg-[#070B18]">
        <div className="flex justify-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-subtext hover:text-white transition-colors px-2"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium text-sm hidden md:inline">Go Back to Home</span>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link href="/" className="transition-transform hover:scale-105">
            <img loading="lazy" decoding="async" 
              src="/Logo.png" 
              alt="Digitexa" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(109,94,247,0.2)]" 
            />
          </Link>
        </div>
        <div className="flex justify-end"></div>
      </div>

      <main className="w-full px-6 md:px-12 max-w-7xl mx-auto flex-grow flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="mb-12 border-b border-white/10 pb-6">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-subtext text-sm">Last updated: July 30, 2026</p>
          </div>
          
          <div className="text-white/80 text-sm leading-relaxed space-y-10">
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-subtext mb-3">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>You must be at least 18 years of age to use this website.</li>
                <li>You agree to use the site only for lawful purposes.</li>
                <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">2. Intellectual Property</h2>
              <p className="text-subtext mb-3">The Service and its original content, features, and functionality are and will remain the exclusive property of Digitexa and its licensors.</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Digitexa.</li>
                <li>You may not copy, modify, distribute, sell, or lease any part of our services or included software.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">3. Limitation of Liability</h2>
              <p className="text-subtext mb-3">In no event shall Digitexa, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation:</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>Loss of profits, data, use, goodwill, or other intangible losses.</li>
                <li>Any conduct or content of any third party on the Service.</li>
                <li>Any content obtained from the Service.</li>
                <li>Unauthorized access, use or alteration of your transmissions or content.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">4. User Accounts and Responsibilities</h2>
              <p className="text-subtext mb-3">When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>You are responsible for safeguarding the password that you use to access the Service.</li>
                <li>You agree not to disclose your password to any third party.</li>
                <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-4">5. Termination</h2>
              <p className="text-subtext mb-3">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>All provisions of the Terms which by their nature should survive termination shall survive.</li>
                <li>Upon termination, your right to use the Service will immediately cease.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">6. Governing Law</h2>
              <p className="text-subtext mb-3">These Terms shall be governed and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-4">7. Contact Us</h2>
              <p className="text-subtext">If you have any questions or comments about these Terms, you may email us at <strong>hello@digitexa.com</strong>.</p>
            </section>
            
          </div>
        </motion.div>
      </main>
    </div>
  );
}
