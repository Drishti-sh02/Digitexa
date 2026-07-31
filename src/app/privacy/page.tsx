"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-subtext text-sm">Last updated: July 30, 2026</p>
          </div>
          
          <div className="text-white/80 text-sm leading-relaxed space-y-10">
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">1. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li><strong>Personal Information:</strong> We may collect your name, email address, phone number, and company details when you fill out our contact forms.</li>
                <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our website, including IP addresses, browser types, and pages visited.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>To provide, maintain, and improve our services.</li>
                <li>To communicate with you, including responding to your inquiries and sending updates.</li>
                <li>To analyze usage patterns and optimize our website's user experience.</li>
                <li>To comply with legal obligations and enforce our agreements.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">3. Data Security</h2>
              <p className="text-subtext mb-3">We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>Data encryption during transit and at rest.</li>
                <li>Regular security assessments and vulnerability scanning.</li>
                <li>Strict access controls for our employees and contractors.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">4. Sharing Your Information</h2>
              <p className="text-subtext mb-3">We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless we provide users with advance notice. This does not include:</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>Website hosting partners and other parties who assist us in operating our website.</li>
                <li>Law enforcement or other governmental agencies when required by law.</li>
                <li>In the event of a merger, acquisition, or sale of all or a portion of our assets.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">5. Your Data Rights</h2>
              <p className="text-subtext mb-3">Depending on your location, you may have certain rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-2 text-subtext">
                <li>The right to access and receive a copy of your personal data.</li>
                <li>The right to rectify or update any inaccurate or incomplete personal data.</li>
                <li>The right to request deletion of your personal data.</li>
                <li>The right to restrict or object to our processing of your personal data.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">6. Changes to This Privacy Policy</h2>
              <p className="text-subtext">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
            </section>
            
            <section>
              <h2 className="text-lg font-bold text-white mb-4">7. Contact Us</h2>
              <p className="text-subtext">If you have any questions or comments about this notice, you may email us at <strong>hello@digitexa.com</strong>.</p>
            </section>
            
          </div>
        </motion.div>
      </main>
    </div>
  );
}
