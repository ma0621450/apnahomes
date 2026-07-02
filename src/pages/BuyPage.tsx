import { useState } from 'react';
import { Link } from '../router';
import {
  Search, Grid3X3, List, ChevronDown,
  TrendingUp, CheckCircle, Users, Award, Home, Shield,
  ArrowRight, X, Filter
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import TestimonialCard from '../components/TestimonialCard';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import { PROPERTIES, AGENTS, TESTIMONIALS } from '../data';

const WHY_BUY = [
  { icon: CheckCircle, title: 'Verified Listings', desc: 'All properties are legally verified and authenticated.' },
  { icon: Shield, title: 'No Hidden Charges', desc: 'Full transparency on all fees and transaction costs.' },
  { icon: Award, title: 'Legal Documentation', desc: 'Expert legal team handles all property documentation.' },
  { icon: TrendingUp, title: 'Investment Consultancy', desc: 'Expert guidance to maximize your investment returns.' },
  { icon: Home, title: 'Home Loan Assistance', desc: 'We connect you with leading banking partners.' },
  { icon: Users, title: 'Property Evaluation', desc: 'Accurate market-based property valuations.' },
];

const INVESTMENT_OPPORTUNITIES = [
  {
    title: 'Luxury Villas in DHA',
    roi: '12%',
    from: 'PKR 7 Crore',
    desc: 'Premium residential villas with high capital appreciation potential.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Commercial Shops, Blue Area',
    roi: '15%',
    from: 'PKR 3 Crore',
    desc: 'Prime commercial retail units in Islamabad\'s business district.',
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Luxury Apartments, Gulberg Greens',
    roi: '10%',
    from: 'PKR 2.5 Crore',
    desc: 'High-end residential apartments in a premium gated community.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const GUIDES = [
  { title: 'How to Buy Property in Islamabad', desc: 'Step-by-step guide to navigating the Islamabad property market.' },
  { title: 'Property Verification Checklist', desc: 'Essential checks before finalizing any property purchase.' },
  { title: 'Investment Tips for First-Time Buyers', desc: 'Smart strategies to make the most of your first property investment.' },
];

const AREAS = ['F-6', 'F-7', 'F-8', 'DHA Phase I', 'DHA Phase II', 'Bahria Town', 'Gulberg Greens', 'Blue Area', 'Bani Gala', 'E-7', 'G-6', 'G-7'];
const PROP_TYPES = ['House', 'Apartment', 'Penthouse', 'Farmhouse', 'Residential Plot', 'Commercial Plaza', 'Office', 'Shop'];
const STATUSES = ['Ready to Move', 'New Listing', 'Featured', 'Luxury'];
const AMENITIES = ['Swimming Pool', 'Garden', 'Servant Quarter', 'Basement', 'Solar System', 'Parking', 'Security', 'Gym', 'Elevator'];

export default function BuyPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minPrice, _setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const PER_PAGE = 9;
  const buyProps = PROPERTIES.filter(p => p.category === 'buy' || p.category === 'commercial');
  const filtered = buyProps.filter(p => {
    const kwMatch = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase()) || p.location.toLowerCase().includes(keyword.toLowerCase());
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const areaMatch = selectedAreas.length === 0 || selectedAreas.some(a => p.location.includes(a));
    const statusMatch = selectedStatuses.length === 0 || (p.badge && selectedStatuses.includes(p.badge)) || (p.badge2 && selectedStatuses.includes(p.badge2));
    return kwMatch && typeMatch && areaMatch && statusMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price Low–High') return a.priceNum - b.priceNum;
    if (sortBy === 'Price High–Low') return b.priceNum - a.priceNum;
    return 0;
  });

  const pageProps = sorted.slice(0, page * PER_PAGE);

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    setPage(1);
  };

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Buy Properties' }]}
        title="Buy Properties"
        subtitle="Browse verified luxury homes, apartments, plots, and commercial properties in Islamabad."
        image="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="section-pad">
        <div className="container-luxury">
          {/* Search Bar */}
          <div className="glass-panel p-6 mb-8 -mt-8 relative z-10 shadow-luxury-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <input className="input-field" placeholder="Location" aria-label="Location" />
              <select className="input-field" aria-label="Property type">
                <option value="">Property Type</option>
                {PROP_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <input className="input-field" placeholder="Min Price (Crore)" type="number" aria-label="Minimum price" />
              <input className="input-field" placeholder="Max Price (Crore)" type="number" aria-label="Maximum price" />
              <button className="btn-gold justify-center">
                <Search size={16} />
                Search Properties
              </button>
            </div>
          </div>

          {/* Filters + Results */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden lg:block'} lg:w-72 flex-shrink-0`}>
              <div className="bg-white rounded-2xl shadow-luxury p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-poppins font-bold text-[#0A2342]">Advanced Filters</h3>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors lg:hidden"
                    onClick={() => setShowFilters(false)}
                    aria-label="Close filters"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Keyword */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">Keywords</label>
                  <input
                    className="input-field text-sm"
                    placeholder="e.g. villa, garden..."
                    value={keyword}
                    onChange={e => { setKeyword(e.target.value); setPage(1); }}
                  />
                </div>

                {/* Areas */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">Area</label>
                  <div className="flex flex-wrap gap-2">
                    {AREAS.map(a => (
                      <button
                        key={a}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${selectedAreas.includes(a) ? 'bg-[#D4AF37] text-[#0A2342] border-[#D4AF37]' : 'border-gray-200 text-gray-600 hover:border-[#D4AF37]'}`}
                        onClick={() => toggle(selectedAreas, setSelectedAreas, a)}
                        aria-pressed={selectedAreas.includes(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">Property Type</label>
                  <div className="space-y-2">
                    {PROP_TYPES.map(t => (
                      <label key={t} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#0A2342]">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t)}
                          onChange={() => toggle(selectedTypes, setSelectedTypes, t)}
                          className="rounded"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">
                    Price Range: PKR {minPrice}–{maxPrice} Crore
                  </label>
                  <input
                    type="range" min={1} max={100} value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="range-slider w-full"
                    aria-label="Maximum price in crore"
                  />
                </div>

                {/* Status */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map(s => (
                      <button
                        key={s}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${selectedStatuses.includes(s) ? 'bg-[#D4AF37] text-[#0A2342] border-[#D4AF37]' : 'border-gray-200 text-gray-600 hover:border-[#D4AF37]'}`}
                        onClick={() => toggle(selectedStatuses, setSelectedStatuses, s)}
                        aria-pressed={selectedStatuses.includes(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-[#0A2342] block mb-2">Amenities</label>
                  <div className="space-y-2">
                    {AMENITIES.map(a => (
                      <label key={a} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#0A2342]">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(a)}
                          onChange={() => toggle(selectedAmenities, setSelectedAmenities, a)}
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-gold flex-1 justify-center text-sm py-2.5">Apply Filters</button>
                  <button
                    className="btn-outline-navy flex-1 justify-center text-sm py-2.5"
                    onClick={() => { setSelectedAreas([]); setSelectedTypes([]); setSelectedStatuses([]); setSelectedAmenities([]); setKeyword(''); setPage(1); }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <button
                    className="lg:hidden btn-outline-navy text-sm py-2.5 px-4 flex items-center gap-2"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter size={15} />
                    Filters
                  </button>
                  <p className="text-gray-600 text-sm" aria-live="polite">
                    Showing <span className="font-semibold text-[#0A2342]">{filtered.length}</span> Verified Properties
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="input-field text-sm py-2 pr-8"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    aria-label="Sort by"
                  >
                    {['Newest', 'Price Low–High', 'Price High–Low', 'Most Popular', 'Largest Area'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#0A2342] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('grid')}
                      aria-pressed={viewMode === 'grid'}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#0A2342] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('list')}
                      aria-pressed={viewMode === 'list'}
                      aria-label="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {pageProps.map((p, i) => (
                  <FadeInSection key={p.id} delay={i * 60}>
                    <PropertyCard property={p} />
                  </FadeInSection>
                ))}
              </div>

              {pageProps.length < sorted.length && (
                <div className="text-center mt-10">
                  <button className="btn-navy" onClick={() => setPage(p => p + 1)}>
                    Load More Properties
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}

              {pageProps.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <Search size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No properties found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT OPPORTUNITIES */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">ROI Focused</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Featured Investment Opportunities</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INVESTMENT_OPPORTUNITIES.map((inv, i) => (
                <FadeInSection key={inv.title} delay={i * 100}>
                  <div className="card-luxury group overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                      <img src={inv.image} alt={inv.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#D4AF37] text-[#0A2342] font-bold text-sm px-3 py-1 rounded-full">ROI {inv.roi}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-poppins font-bold text-[#0A2342] mb-1">{inv.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{inv.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D4AF37] font-bold">From {inv.from}</span>
                        <Link to="/buy" className="text-sm font-semibold text-[#0A2342] hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                          Explore <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* WHY BUY WITH US */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our Promise</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Why Buy With Us?</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_BUY.map((item, i) => (
                <FadeInSection key={item.title} delay={i * 80}>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all border border-gray-50">
                    <div className="w-11 h-11 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] mb-1 text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* BUYING CONSULTANTS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Expert Team</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Meet Our Buying Consultants</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {AGENTS.slice(0, 3).map((agent, i) => (
                <FadeInSection key={agent.id} delay={i * 100}>
                  <AgentCard agent={agent} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* BUYING GUIDE */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Resources</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Buying Guide</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUIDES.map((g, i) => (
                <FadeInSection key={g.title} delay={i * 80}>
                  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all border border-gray-50 text-center">
                    <div className="w-12 h-12 bg-[#0A2342] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award size={20} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="font-poppins font-semibold text-[#0A2342] mb-2 text-sm">{g.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{g.desc}</p>
                    <Link to="/blog" className="text-sm font-semibold text-[#D4AF37] hover:text-[#0A2342] transition-colors flex items-center justify-center gap-1">
                      Read Guide <ArrowRight size={13} />
                    </Link>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* TESTIMONIALS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">What Our Buyers Say</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.slice(0, 3).map((t, i) => (
                <FadeInSection key={t.id} delay={i * 100}>
                  <TestimonialCard testimonial={t} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <CTABand
        title="Can't Find the Right Property?"
        subtitle="Let our experts find the perfect property based on your requirements."
        primaryLabel="Talk to an Expert"
        primaryPath="/contact"
        secondaryLabel="Request a Callback"
        secondaryPath="/contact"
      />

      <OfficeMap />
    </main>
  );
}
