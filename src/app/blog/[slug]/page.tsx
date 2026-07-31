import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import BlogClientComponents from "./BlogClientComponents";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) {
    notFound();
  }

  // Get related articles (just the other ones in the array)
  const relatedArticles = blogs.filter((b) => b.slug !== slug).slice(0, 3);
  
  // Find next/prev articles
  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prevArticle = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextArticle = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <BlogClientComponents 
      blog={blog} 
      relatedArticles={relatedArticles} 
      prevArticle={prevArticle} 
      nextArticle={nextArticle} 
    />
  );
}
