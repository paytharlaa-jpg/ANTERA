import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { ASSETS } from "@/lib/assets";

const TITLE = "Real Estate Blog | Antera Realty";
const DESCRIPTION =
  "Insights, guides, and news about premium open plots and luxury villa communities in Hyderabad, particularly the Srisailam Highway and Future City corridors.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      <SiteNav />
      
      {/* Header Section */}
      <section className="relative bg-[#0a0a0c] text-white pt-48 pb-24 px-4 md:px-8 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ASSETS.houses.modern} 
            alt="Antera Realty Properties" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] to-transparent opacity-80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            <span>Insights & Research</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-xl">
            Antera <span className="text-orange-500 italic">Journal.</span>
          </h1>
          <p className="max-w-xl text-lg text-white/60 drop-shadow-sm">
            Expert insights, buying guides, and the latest updates on Hyderabad's most promising real estate corridors.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col gap-6 bg-white rounded-3xl p-8 border border-black/5 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs font-medium text-black/40">{post.readTime}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-bold leading-snug group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-black/60 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{post.author}</span>
                  <span className="text-[10px] text-black/40 uppercase tracking-wider">{post.date}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
      <FloatingWhatsApp />
    </main>
  );
}
