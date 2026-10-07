import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) {
      return {
        meta: [{ title: "Post Not Found | Antera Realty" }],
      };
    }
    
    // SEO Playbook: Article schema for blog posts
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.meta,
      author: {
        "@type": "Person",
        name: post.author
      },
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
    };

    return {
      meta: [
        { title: post.title + " | Antera Realty" },
        { name: "description", content: post.meta },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.meta },
        { property: "og:type", content: "article" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(articleSchema),
        }
      ]
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#fcfbf9] pt-40 text-center">
        <SiteNav />
        <h1 className="font-display text-4xl font-bold">Post Not Found</h1>
        <p className="mt-4 text-black/60">The article you are looking for does not exist.</p>
        <Link to="/blog" className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-500">
          Back to Journal
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      <SiteNav />
      
      <article className="pt-32 md:pt-40 pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          
          <Link to="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-orange-500 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs font-medium text-black/40">{post.readTime}</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 py-6 border-b border-black/10">
              <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{post.author}</span>
                <span className="text-xs text-black/50">Updated: {post.updatedAt || post.date}</span>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg prose-headings:font-display prose-headings:tracking-tight prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-2xl prose-img:border prose-img:border-black/10 max-w-none text-black/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-16 pt-8 border-t border-black/10">
             <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl border border-black/5 shadow-xl shadow-black/5">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-display text-2xl font-bold">Ready to secure your future?</h4>
                  <p className="text-sm text-black/60">Explore our curated portfolio of premium plots.</p>
                </div>
                <Link to="/#properties" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-orange-500 shrink-0">
                  Explore Portfolio <ArrowUpRight className="h-4 w-4" />
                </Link>
             </div>
          </footer>
        </div>
      </article>

      <SiteFooter />
      <FloatingWhatsApp />
    </main>
  );
}
