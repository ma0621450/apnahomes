import { useState } from 'react';
import { Link } from '../router';
import {
  Search, ArrowRight, CheckCircle, Users,
  Award, Home, Shield, Clock
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import TestimonialCard from '../components/TestimonialCard';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import Accordion from '../components/Accordion';
import { PROPERTIES, TESTIMONIALS } from '../data';

const WHY_RENT = [
  { icon: CheckCircle, title: 'Verified Landlords', desc: 'All landlords are screened and verified before listing.' },
  { icon: Shield, title: 'Transparent Agreements', desc: 'Clear rental agreements with no hidden clauses.' },
  { icon: Award, title: 'No Hidden Fees', desc: 'Upfront pricing with complete cost transparency.' },
  { icon: Home, title: 'Move-in Support', desc: 'We assist you through the entire move-in process.' },
  { icon: Clock, title: '24/7 Assistance', desc: 'Round-the-clock support for any rental concerns.' },
  { icon: Users, title: 'Legal Tenancy Support', desc: 'Expert legal guidance for all tenancy matters.' },
];

const RENTAL_PROCESS = [
  { step: 1, title: 'Search & Shortlist', desc: 'Browse our verified rental listings and save your favorites.' },
  { step: 2, title: 'Schedule Viewing', desc: 'Book a property viewing at your convenience.' },
  { step: 3, title: 'Verify Documents', desc: 'Our team verifies all ownership and property documents.' },
  { step: 4, title: 'Sign Agreement', desc: 'Sign a transparent, legally binding rental agreement.' },
  { step: 5, title: 'Move In', desc: 'Get your keys and move into your new home.' },
];

const RENTAL_SERVICES = [
  { title: 'Tenant Placement', desc: 'Find the perfect tenant or property quickly.' },
  { title: 'Agreement Drafting', desc: 'Legally sound, professionally drafted rental agreements.' },
  { title: 'Property Inspection', desc: 'Pre-tenancy and post-tenancy professional inspections.' },
  { title: 'Rent Collection', desc: 'Reliable rent collection management services.' },
  { title: 'Maintenance Coordination', desc: 'Swift handling of all maintenance requests.' },
];

const POPULAR_AREAS = [
  { name: 'F-6', count: 18, image: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'F-7', count: 24, image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'F-8', count: 15, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'DHA', count: 32, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Bahria Town', count: 45, image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Blue Area', count: 28, image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const FAQ_ITEMS = [
  { question: 'What is the typical security deposit for rentals in Islamabad?', answer: 'Security deposits in Islamabad typically range from 1-3 months\' rent, depending on the property type and landlord\'s requirements. It is fully refundable at the end of tenancy subject to property condition.' },
  { question: 'How long is a standard rental agreement?', answer: 'Standard rental agreements in Islamabad are typically for 11 months or 1 year, with options to renew. We also offer shorter-term arrangements upon request.' },
  { question: 'Are pets allowed in rental properties?', answer: 'Pet policies vary by landlord. We have a dedicated "Pet Friendly" filter in our search to help you find properties that welcome pets.' },
  { question: 'Who is responsible for maintenance costs?', answer: 'Major structural repairs are the landlord\'s responsibility, while minor day-to-day maintenance is typically the tenant\'s responsibility. This is clearly outlined in our rental agreements.' },
  { question: 'Can I negotiate the rental price?', answer: 'Yes! Our agents are skilled negotiators and will work on your behalf to secure the best possible rental rate within your budget.' },
];

export default function RentPage() {

  const [furnished, setFurnished] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);

  const rentProps = PROPERTIES.filter(p => p.category === 'rent');

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Rent Properties' }]}
        title="Rent Properties"
        subtitle="Access Islamabad's finest verified rental homes, apartments, and commercial spaces — all in one place."
        image="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* SEARCH BAR */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container-luxury">
          <div className="glass-panel p-6 shadow-luxury-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              <input className="input-field" placeholder="Location (e.g., F-7, DHA)" aria-label="Location" />
              <select className="input-field" aria-label="Property type">
                <option value="">Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Penthouse</option>
                <option>Commercial</option>
                <option>Office</option>
              </select>
              <input className="input-field" placeholder="Min Rent (PKR)" type="number" aria-label="Minimum rent" />
              <input className="input-field" placeholder="Max Rent (PKR)" type="number" aria-label="Maximum rent" />
              <button className="btn-gold justify-center">
                <Search size={16} />
                Search Rentals
              </button>
            </div>
            {/* Additional toggles */}
            <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <button
                  role="switch"
                  aria-checked={furnished}
                  className={`relative w-10 h-5 rounded-full transition-colors ${furnished ? 'bg-[#D4AF37]' : 'bg-gray-200'}`}
                  onClick={() => setFurnished(!furnished)}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${furnished ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                Furnished Only
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <button
                  role="switch"
                  aria-checked={petFriendly}
                  className={`relative w-10 h-5 rounded-full transition-colors ${petFriendly ? 'bg-[#D4AF37]' : 'bg-gray-200'}`}
                  onClick={() => setPetFriendly(!petFriendly)}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${petFriendly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                Pet Friendly
              </label>
              <select className="input-field text-sm py-1.5 w-auto" aria-label="Bedrooms">
                <option>Bedrooms</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
              <select className="input-field text-sm py-1.5 w-auto" aria-label="Availability">
                <option>Availability</option>
                <option>Immediate</option>
                <option>Within 1 Month</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED RENTALS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Best Picks</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl">Featured Rental Properties</h2>
                <p className="text-gray-500 mt-2">Premium verified rentals ready for immediate occupancy.</p>
              </div>
              <Link to="/rent" className="btn-outline-navy text-sm whitespace-nowrap">View All <ArrowRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {rentProps.map((p, i) => (
                <FadeInSection key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* POPULAR AREAS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Top Locations</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Popular Rental Areas</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {POPULAR_AREAS.map((area, i) => (
                <FadeInSection key={area.name} delay={i * 60}>
                  <Link to={`/rent?area=${area.name}`} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury transition-all">
                    <div className="aspect-square">
                      <img src={area.image} alt={area.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="font-poppins font-bold text-white text-sm">{area.name}</div>
                        <div className="text-white/70 text-xs">{area.count} Properties</div>
                      </div>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* WHY RENT WITH US */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our Promise</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Why Rent With Us?</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_RENT.map((item, i) => (
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

      {/* RENTAL SERVICES */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Rental Services</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {RENTAL_SERVICES.map((svc, i) => (
                <FadeInSection key={svc.title} delay={i * 60}>
                  <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all text-center border border-gray-50">
                    <div className="w-12 h-12 bg-[#0A2342] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Home size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-1.5">{svc.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{svc.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* RENTAL PROCESS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">How It Works</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Simple Rental Process</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {RENTAL_PROCESS.map((step, i) => (
                  <FadeInSection key={step.step} delay={i * 80}>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0A2342] font-poppins font-bold text-xl shadow-gold">
                        {step.step}
                      </div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* TESTIMONIALS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Tenant Testimonials</h2>
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

      {/* FAQ */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Have Questions?</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Rental FAQ</h2>
              <div className="gold-divider mt-2" />
            </div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </section>
      </FadeInSection>

      <CTABand
        title="Looking for the Perfect Rental?"
        subtitle="Let our team match you with the ideal property based on your budget and requirements."
        primaryLabel="Browse Rentals"
        primaryPath="/rent"
        secondaryLabel="Talk to an Agent"
        secondaryPath="/contact"
      />

      <OfficeMap />
    </main>
  );
}
