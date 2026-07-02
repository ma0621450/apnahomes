import { Link } from '../router';
import {
  Search, BarChart3, ArrowRight,
  MapPin, Maximize2
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import AnimatedCounter from '../components/AnimatedCounter';
import { PROPERTIES, AGENTS } from '../data';

const COMMERCIAL_ROWS = [
  { key: 'Office', label: 'Office Spaces', image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { key: 'Shop', label: 'Shops & Retail', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { key: 'Commercial', label: 'Commercial Plazas', image: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const INVESTMENT_CARDS = [
  { title: 'Luxury Villas in DHA', roi: '12%', from: 'PKR 7 Crore', img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Commercial Shops, Blue Area', roi: '15%', from: 'PKR 3 Crore', img: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Luxury Apartments, Gulberg Greens', roi: '10%', from: 'PKR 2.5 Crore', img: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const GUIDES = [
  { title: 'Commercial Property Investment 101', desc: 'Key principles for building a commercial real estate portfolio.' },
  { title: 'Understanding Rental Yield', desc: 'Learn how to calculate and maximize your rental yield.' },
  { title: 'Legal Steps for Business Property', desc: 'Essential legal checklist for commercial property transactions.' },
];

const SUCCESS_STORIES = [
  { name: 'Ahmed Raza', role: 'Business Owner', result: 'Secured 15% ROI on Blue Area retail unit within first year.', rating: 5 },
  { name: 'Hassan Malik', role: 'Commercial Investor', result: 'Built a portfolio of 3 commercial units generating passive income.', rating: 5 },
  { name: 'Tariq Hussain', role: 'Plaza Owner', result: 'Sold commercial plaza at 30% above market value through our network.', rating: 5 },
];

const commercialProps = PROPERTIES.filter(p => p.category === 'commercial');

export default function CommercialPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Commercial Properties' }]}
        title="Commercial Properties in Islamabad"
        subtitle="Investment-grade offices, shops, plazas, and warehouses in Islamabad's prime commercial zones."
        image="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* SEARCH */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container-luxury">
          <div className="glass-panel p-6 shadow-luxury-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              <select className="input-field" aria-label="Property type">
                <option value="">Property Type</option>
                <option>Office</option>
                <option>Shop</option>
                <option>Warehouse</option>
                <option>Plaza</option>
                <option>Factory</option>
              </select>
              <input className="input-field" placeholder="Location" aria-label="Location" />
              <input className="input-field" placeholder="Area (sqft)" type="number" aria-label="Area in sqft" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">Rental Yield:</span>
                <input type="range" min={0} max={25} defaultValue={15} className="range-slider flex-1" aria-label="Rental yield range" />
              </div>
              <button className="btn-gold justify-center">
                <Search size={16} />
                Search Commercial
              </button>
            </div>
            <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
              {['Parking', 'Lift', 'Corner Property', 'Generator', 'Security'].map(f => (
                <button key={f} className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COMMERCIAL */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Top Picks</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Featured Commercial Properties</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {commercialProps.concat(PROPERTIES.filter(p => p.type === 'Commercial')).slice(0, 3).map((p, i) => (
                <FadeInSection key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* INVESTMENT OPPORTUNITIES */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">High Returns</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Investment Opportunities</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INVESTMENT_CARDS.map((inv, i) => (
                <FadeInSection key={inv.title} delay={i * 100}>
                  <div className="card-luxury group">
                    <div className="relative h-44 overflow-hidden">
                      <img src={inv.img} alt={inv.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#D4AF37] text-[#0A2342] font-bold text-sm px-3 py-1 rounded-full">ROI {inv.roi}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-poppins font-bold text-[#0A2342] mb-2">{inv.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D4AF37] font-bold">From {inv.from}</span>
                        <Link to="/commercial" className="text-sm font-semibold text-[#0A2342] hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
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

      {/* COMMERCIAL ROWS */}
      {COMMERCIAL_ROWS.map((row, ri) => (
        <FadeInSection key={row.key}>
          <section className={`section-pad ${ri % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}`}>
            <div className="container-luxury">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">{row.key}</p>
                  <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl">{row.label}</h2>
                </div>
                <Link to="/commercial" className="btn-outline-navy text-sm whitespace-nowrap">View All <ArrowRight size={15} /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="card-luxury group">
                    <div className="relative h-44 overflow-hidden">
                      <img src={row.image} alt={`${row.label} ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 badge-gold text-xs">{row.key}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-1">Prime {row.key} Space #{i + 1}</h3>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <MapPin size={11} className="text-[#D4AF37]" />
                        Blue Area, Islamabad
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                        <span className="flex items-center gap-1"><Maximize2 size={11} className="text-[#D4AF37]" />{2000 + i * 500} sqft</span>
                        <span className="text-[#D4AF37] font-bold ml-auto">PKR {10 + i * 5} Crore</span>
                      </div>
                      <Link to="/commercial" className="btn-gold w-full justify-center text-xs py-2">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      ))}

      {/* STATS */}
      <section className="bg-[#0A2342] py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 200, suffix: '+', label: 'Commercial Properties Sold' },
              { end: 15, suffix: '%', label: 'Average Rental Yield' },
              { end: 50, suffix: '+', label: 'Investment Deals Closed' },
              { end: 10, suffix: '+', label: 'Years of Expertise' },
            ].map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 100}>
                <div>
                  <div className="font-poppins font-bold text-[#D4AF37] text-4xl mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS INVESTMENT GUIDE */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Resources</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Business Investment Guide</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUIDES.map((g, i) => (
                <FadeInSection key={g.title} delay={i * 80}>
                  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all border border-gray-50 text-center">
                    <div className="w-12 h-12 bg-[#0A2342] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 size={20} className="text-[#D4AF37]" />
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

      {/* COMMERCIAL CONSULTANTS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Your Experts</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Commercial Consultants</h2>
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

      {/* CLIENT SUCCESS STORIES */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Success Stories</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Client Success Stories</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUCCESS_STORIES.map((story, i) => (
                <FadeInSection key={story.name} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-luxury border border-gray-100">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <span key={i} className="text-[#D4AF37] text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 italic">"{story.result}"</p>
                    <div>
                      <div className="font-semibold text-[#0A2342] text-sm">{story.name}</div>
                      <div className="text-gray-500 text-xs">{story.role}</div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <CTABand
        title="Ready to Invest in Commercial Real Estate?"
        subtitle="Our commercial specialists will help you find the highest-yielding properties in Islamabad."
        primaryLabel="Talk to a Specialist"
        primaryPath="/contact"
        secondaryLabel="View Listings"
        secondaryPath="/commercial"
      />

      <OfficeMap />
    </main>
  );
}
