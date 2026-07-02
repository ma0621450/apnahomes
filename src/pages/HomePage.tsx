import { useState, useEffect, useRef } from 'react';
import { Link } from '../router';
import {
  Search, MapPin, ChevronLeft, ChevronRight, ArrowRight,
  Home, Building2, TrendingUp, Users, Star, Phone,
  Shield, Award, Clock, CheckCircle, Play
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import TestimonialCard from '../components/TestimonialCard';
import AnimatedCounter from '../components/AnimatedCounter';
import FadeInSection from '../components/FadeInSection';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import { PROPERTIES, AGENTS, TESTIMONIALS, BLOG_POSTS, COMPANY } from '../data';

const HERO_SLIDES = [
  {
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Find Your Dream Home',
    subtitle: "In The Heart of Islamabad",
    tag: 'Premium Properties',
  },
  {
    image: 'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Invest in Islamabad',
    subtitle: "Pakistan's Fastest Growing Real Estate Market",
    tag: 'Smart Investments',
  },
  {
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Luxury Living Awaits',
    subtitle: 'Explore Exclusive Villas & Penthouses',
    tag: 'Luxury Collection',
  },
];

const CATEGORIES = [
  { label: 'Buy Property', icon: Home, path: '/buy', color: 'from-blue-600 to-blue-800', count: '120+ Listings' },
  { label: 'Rent Property', icon: MapPin, path: '/rent', color: 'from-emerald-600 to-emerald-800', count: '80+ Listings' },
  { label: 'Commercial', icon: Building2, path: '/commercial', color: 'from-amber-600 to-amber-800', count: '45+ Listings' },
  { label: 'New Projects', icon: TrendingUp, path: '/new-projects', color: 'from-rose-600 to-rose-800', count: '15+ Projects' },
];

const STATS = [
  { value: 2500, suffix: '+', label: 'Properties Sold', icon: Home },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Star },
  { value: 12, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 150, suffix: '+', label: 'Expert Agents', icon: Users },
];

const SERVICES = [
  { icon: Shield, title: 'Verified Listings', desc: 'Every property is verified by our expert team for authenticity and legal clarity.' },
  { icon: Award, title: 'Award-Winning Agency', desc: "Recognized as Islamabad's top real estate agency for 5 consecutive years." },
  { icon: Clock, title: '24/7 Support', desc: 'Our dedicated team is available around the clock to assist you in every step.' },
  { icon: CheckCircle, title: 'Legal Assistance', desc: 'Complete legal documentation, title verification, and transfer support included.' },
];

const AREAS = [
  { name: 'F-7 Sector', image: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=600', count: '18 Properties', price: 'From PKR 12 Crore' },
  { name: 'DHA Islamabad', image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600', count: '32 Properties', price: 'From PKR 6 Crore' },
  { name: 'Bahria Town', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600', count: '45 Properties', price: 'From PKR 4 Crore' },
  { name: 'Blue Area', image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=600', count: '28 Properties', price: 'From PKR 5 Crore' },
  { name: 'Gulberg Greens', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600', count: '22 Properties', price: 'From PKR 3.5 Crore' },
  { name: 'Bani Gala', image: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600', count: '12 Properties', price: 'From PKR 20 Crore' },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [searchType, setSearchType] = useState<'buy' | 'rent' | 'commercial'>('buy');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goSlide = (n: number) => { setSlide(n); startTimer(); };

  const featuredProps = PROPERTIES.filter(p => p.badge === 'Featured').slice(0, 6);
  const searchPath = searchType === 'buy' ? '/buy' : searchType === 'rent' ? '/rent' : '/commercial';

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342]/70 via-[#0A2342]/50 to-[#0A2342]/85" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-44">
          <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            {HERO_SLIDES[slide].tag}
          </span>
          <h1 className="font-poppins font-bold text-white text-5xl md:text-7xl leading-tight mb-3 drop-shadow-lg animate-fade-up">
            {HERO_SLIDES[slide].title}
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-light">
            {HERO_SLIDES[slide].subtitle}
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={() => goSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => goSlide((slide + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-8 bg-[#D4AF37]' : 'w-3 bg-white/40'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex gap-1 mb-2 px-1 pt-1">
              {(['buy', 'rent', 'commercial'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setSearchType(t)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${searchType === t ? 'bg-[#D4AF37] text-[#0A2342]' : 'text-white hover:bg-white/10'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0" />
                <input
                  placeholder="Search by area, project, or property type…"
                  className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
              <Link to={searchPath} className="btn-gold flex items-center gap-2 whitespace-nowrap text-sm">
                <Search size={16} /> Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <FadeInSection>
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-2">Explore</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-4xl mb-3">Find What You're Looking For</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Browse Islamabad's most comprehensive property portal</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map(cat => (
                <Link key={cat.label} to={cat.path} className="group relative overflow-hidden rounded-2xl p-6 text-white cursor-pointer h-44 flex flex-col justify-between shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                      <cat.icon size={24} />
                    </div>
                    <p className="text-xs text-white/70 font-medium">{cat.count}</p>
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-poppins font-bold text-lg leading-tight">{cat.label}</h3>
                    <div className="flex items-center gap-1 text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
                      Browse All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Stats ── */}
      <section className="py-16 bg-gradient-to-r from-[#0A2342] to-[#0d2d55] text-white">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-2xl flex items-center justify-center mb-1">
                  <s.icon size={26} className="text-[#D4AF37]" />
                </div>
                <div className="font-poppins font-bold text-4xl text-white">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <FadeInSection>
        <section className="section-pad bg-gray-50">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-1">Hand-Picked</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-4xl">Featured Properties</h2>
              </div>
              <Link to="/buy" className="btn-outline-navy flex items-center gap-2 text-sm">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProps.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Popular Areas ── */}
      <FadeInSection>
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-2">Explore by Location</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-4xl mb-3">Popular Areas in Islamabad</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Browse prime real estate in Islamabad's most sought-after neighbourhoods</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AREAS.map(area => (
                <Link key={area.name} to="/buy" className="group relative overflow-hidden rounded-2xl h-56 block shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <img src={area.image} alt={area.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <h3 className="font-poppins font-bold text-xl">{area.name}</h3>
                    <p className="text-white/70 text-sm">{area.count}</p>
                    <p className="text-[#D4AF37] text-sm font-semibold mt-1">{area.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Services ── */}
      <FadeInSection>
        <section className="section-pad bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-2">Why Choose Us</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-4xl mb-3">The Apna Islamabad Homes Advantage</h2>
              <p className="text-gray-500 max-w-xl mx-auto">We go beyond transactions to deliver an exceptional real estate experience</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map(s => (
                <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
                  <div className="w-16 h-16 bg-[#0A2342]/5 group-hover:bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                    <s.icon size={28} className="text-[#0A2342] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#0A2342] text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Agents ── */}
      <FadeInSection>
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-1">Our Team</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-4xl">Meet Our Top Agents</h2>
              </div>
              <Link to="/agents" className="btn-outline-navy flex items-center gap-2 text-sm">
                All Agents <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGENTS.slice(0, 3).map(a => <AgentCard key={a.id} agent={a} />)}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Map ── */}
      <FadeInSection>
        <section className="section-pad bg-gray-50">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-2">Interactive Map</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-4xl">Explore Properties by Area</h2>
            </div>
            <OfficeMap />
          </div>
        </section>
      </FadeInSection>

      {/* ── Testimonials ── */}
      <FadeInSection>
        <section className="section-pad bg-gradient-to-br from-[#0A2342] to-[#0d2d55]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-2">Client Stories</p>
              <h2 className="font-poppins font-bold text-white text-4xl mb-3">What Our Clients Say</h2>
              <p className="text-white/60 max-w-xl mx-auto">Thousands of happy families and investors trust Apna Islamabad Homes</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TESTIMONIALS.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Blog ── */}
      <FadeInSection>
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-1">Latest News</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-4xl">From Our Blog</h2>
              </div>
              <Link to="/blog" className="btn-outline-navy flex items-center gap-2 text-sm">
                All Articles <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.slice(0, 3).map(post => (
                <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1">
                  <div className="relative overflow-hidden h-48">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#0A2342] text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 flex-wrap">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-[#0A2342] text-lg leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <Link to="/blog" className="inline-flex items-center gap-1 text-[#D4AF37] font-semibold text-sm mt-4 hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Contact strip ── */}
      <FadeInSection>
        <section className="py-12 bg-gray-50">
          <div className="container-luxury">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={28} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Talk to an Expert — We're Available Now</p>
                  <a href={`tel:${COMPANY.phone}`} className="font-poppins font-bold text-[#0A2342] text-2xl hover:text-[#D4AF37] transition-colors">
                    {COMPANY.phone}
                  </a>
                  <p className="text-gray-400 text-xs mt-0.5">{COMPANY.hours}</p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2">
                  <Play size={15} className="fill-current" /> WhatsApp Us
                </a>
                <Link to="/contact" className="btn-outline-navy">Schedule a Visit</Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <CTABand />
    </>
  );
}
