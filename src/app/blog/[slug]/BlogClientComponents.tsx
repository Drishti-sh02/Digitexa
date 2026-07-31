"use client";

import { ArrowLeft, ArrowRight, Share2, Home } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/data/blogs";

interface BlogClientProps {
  blog: BlogPost;
  relatedArticles: BlogPost[];
  prevArticle: BlogPost | null;
  nextArticle: BlogPost | null;
}

export default function BlogClientComponents({ blog, prevArticle, nextArticle }: BlogClientProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Article link copied to clipboard!");
  };

  return (
    <div className="bg-[#050816] min-h-screen text-white pb-24">
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 mb-8 grid grid-cols-3 items-center bg-[#070B18]">
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
        <div className="flex justify-end pr-4">
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header Metadata */}
        <div className="mb-6 flex items-center gap-3 text-sm text-subtext">
          <span className="text-primary font-bold uppercase">{blog.category}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-snug">
          {blog.title}
        </h1>

        {/* Smaller Hero Image */}
        <div className="max-w-lg rounded-xl overflow-hidden mb-10 border border-white/10 mx-auto">
          <img loading="lazy" decoding="async" 
            src={blog.heroImage} 
            alt={blog.title} 
            className="w-full h-[250px] object-cover"
          />
        </div>

        {/* Intro */}
        <p className="text-base text-white/90 mb-10 leading-relaxed font-medium">
          {blog.intro}
        </p>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {blog.sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              
              <div className="space-y-4 text-base text-subtext leading-relaxed">
                {section.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {section.bulletPoints && (
                <ul className="mt-4 space-y-2 list-disc list-inside text-base text-subtext">
                  {section.bulletPoints.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}

              {/* Smaller Inline Image */}
              {section.image && (
                <div className="mt-8 mb-4 max-w-sm mx-auto rounded-lg overflow-hidden border border-white/10">
                  <img loading="lazy" decoding="async" src={section.image} alt={section.title} className="w-full h-auto" />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Navigation - Prev / Next */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-6">
          {prevArticle ? (
            <Link 
              href={`/blog/${prevArticle.slug}`} 
              className="flex-1 flex flex-col p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2 text-xs text-subtext mb-2">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Article</span>
              </div>
              <div className="font-bold text-sm truncate">{prevArticle.title}</div>
            </Link>
          ) : <div className="flex-1" />}
          
          {nextArticle ? (
            <Link 
              href={`/blog/${nextArticle.slug}`} 
              className="flex-1 flex flex-col p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-right group items-end"
            >
              <div className="flex items-center gap-2 text-xs text-subtext mb-2">
                <span>Next Article</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-bold text-sm truncate w-full">{nextArticle.title}</div>
            </Link>
          ) : <div className="flex-1" />}
        </div>

      </div>
    </div>
  );
}
