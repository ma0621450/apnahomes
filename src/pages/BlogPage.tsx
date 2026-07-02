import { useState } from 'react';
import { Link } from '../router';
import { Search, ArrowRight, Clock, User, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import FadeInSection from '../components/FadeInSection';
import { BLOG_POSTS } from '../data';

const CATEGORIES = ['All', 'Buying Guide', 'Selling Guide', 'Investment', 'Market Trends', 'Interior Design', 'Legal Advice', 'News'];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = BLOG_POSTS.filter(p => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const pageSize = 6;
  const visible = filtered.slice(0, page * pageSize);

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Blog' }]}
        title="Insights & Market News"
        subtitle="Explore Islamabad real estate guides, investment strategies, and market trends from our expert team."
        image="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* SEARCH */}
      <section className="py-8 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="input-field pl-10"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search blog articles"
              />
            </div>
            <button className="btn-gold">
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxury">
          {/* FEATURED ARTICLE */}
          <FadeInSection>
            <div className="mb-16">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-4">Featured Article</p>
              <div className="card-luxury group grid lg:grid-cols-2 gap-0 overflow-hidden">
                <div className="relative overflow-hidden h-64 lg:h-auto">
                  <img
                    src={BLOG_POSTS[0].image}
                    alt={BLOG_POSTS[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 badge-gold text-xs">{BLOG_POSTS[0].category}</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><User size={11} /> {BLOG_POSTS[0].author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {BLOG_POSTS[0].readTime}</span>
                    <span>{BLOG_POSTS[0].date}</span>
                  </div>
                  <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {BLOG_POSTS[0].title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{BLOG_POSTS[0].excerpt}</p>
                  <Link to="/blog" className="btn-gold w-fit">
                    Read Full Article <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`text-sm px-4 py-2 rounded-full border transition-all ${selectedCat === cat ? 'bg-[#D4AF37] text-[#0A2342] border-[#D4AF37]' : 'border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
                onClick={() => { setSelectedCat(cat); setPage(1); }}
                aria-pressed={selectedCat === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ARTICLES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
            {visible.map((post, i) => (
              <FadeInSection key={post.id} delay={i * 80}>
                <article className="card-luxury group h-full">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 badge-gold text-xs">{post.category}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                    </div>
                    <h3 className="font-poppins font-semibold text-[#0A2342] text-base mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <Link to="/blog" className="text-sm font-semibold text-[#D4AF37] hover:text-[#0A2342] flex items-center gap-1 group/link transition-colors">
                        Read More
                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>

          {/* LOAD MORE */}
          {visible.length < filtered.length && (
            <div className="text-center">
              <button className="btn-navy" onClick={() => setPage(p => p + 1)}>
                Load More Articles <ArrowRight size={16} />
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          )}

          {/* POPULAR POSTS */}
          <FadeInSection>
            <div className="mt-20">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-4">Most Read</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl mb-8">Popular Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BLOG_POSTS.slice(0, 4).map((post, i) => (
                  <Link key={post.id} to="/blog" className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all group">
                    <span className="text-2xl font-bold text-[#D4AF37]/30 font-poppins w-8 flex-shrink-0 self-center">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" loading="lazy" />
                    <div>
                      <span className="badge-gold text-xs mb-1 inline-block">{post.category}</span>
                      <h3 className="font-semibold text-[#0A2342] text-sm group-hover:text-[#D4AF37] transition-colors line-clamp-2">{post.title}</h3>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <CTABand
        title="Have Questions About the Market?"
        subtitle="Our property experts are ready to answer your real estate questions and guide your decisions."
        primaryLabel="Talk to an Expert"
        primaryPath="/contact"
        secondaryLabel="View Properties"
        secondaryPath="/buy"
      />
    </main>
  );
}
