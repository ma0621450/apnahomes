import { Link } from '../router';
import {
  ArrowRight, Target, Eye, Heart, Award, Users,
  TrendingUp, CheckCircle
} from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCard from '../components/TestimonialCard';
import { AGENTS, TESTIMONIALS } from '../data';

const TIMELINE = [
  { year: '2012', title: 'Company Founded', desc: 'Apna Islamabad Homes was established in F-7 Markaz to serve Islamabad\'s growing real estate market.' },
  { year: '2015', title: 'Expanded to DHA', desc: 'Opened our dedicated DHA division, capturing Islamabad\'s most premium residential sector.' },
  { year: '2018', title: '100+ Agents', desc: 'Grew our team to over 100 agents and expanded commercial property services.' },
  { year: '2020', title: 'Digital Platform Launch', desc: 'Launched our digital property marketplace connecting thousands of buyers and sellers.' },
  { year: '2023', title: '500+ Properties Sold', desc: 'Reached the milestone of 500+ properties sold, cementing our leadership position.' },
  { year: '2026', title: 'Regional Expansion', desc: 'Expanding our services to Rawalpindi and other twin-city communities.' },
];

const CORE_VALUES = [
  { icon: CheckCircle, title: 'Integrity', desc: 'Honest, transparent dealings in every transaction.' },
  { icon: Eye, title: 'Transparency', desc: 'Full disclosure on every property, price, and process.' },
  { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in service and results.' },
  { icon: Heart, title: 'Client-First', desc: 'Your success is our only measure of achievement.' },
  { icon: TrendingUp, title: 'Innovation', desc: 'Embracing technology to serve you better.' },
  { icon: Users, title: 'Community', desc: 'Building Islamabad\'s property community with pride.' },
];

const GALLERY = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const PARTNERS = [
  'Capital Developers', 'DHA Islamabad', 'Bahria Town', 'Finca Bank', 'MCB Bank',
  'HBL Mortgage', 'State Life', 'OPF Housing', 'Gulberg Greens', 'CDA'
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        title="About Apna Islamabad Homes"
        subtitle="Trust • Invest • Grow — Your trusted real estate partner since 2012."
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* COMPANY STORY */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-5">A Legacy Built on Trust</h2>
                <div className="gold-divider-left mb-6" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  Founded in 2012 in the heart of F-7 Markaz, Islamabad, Apna Islamabad Homes was established with a singular vision: to redefine real estate services in Pakistan's capital by placing trust, transparency, and client success at the center of every interaction.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  What started as a small boutique agency with 5 dedicated agents has grown into Islamabad's most recognized real estate brand — with over 40 professional consultants, a proven track record of 500+ properties sold, and a client satisfaction rate that speaks for itself.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We serve buyers, sellers, investors, tenants, and developers across Islamabad's finest sectors — from the verdant streets of F-6 to the prestigious corridors of DHA, Bahria Town, and Blue Area's commercial heartland.
                </p>
                <Link to="/contact" className="btn-gold">
                  Get In Touch <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-lg">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Apna Islamabad Homes team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#D4AF37] text-[#0A2342] p-5 rounded-2xl shadow-gold font-poppins font-bold text-center">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* MISSION, VISION */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A2342] rounded-2xl p-8 text-white">
                <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center mb-5">
                  <Target size={24} className="text-[#0A2342]" />
                </div>
                <h3 className="font-poppins font-bold text-2xl mb-4">Our Mission</h3>
                <div className="w-12 h-0.5 bg-[#D4AF37] mb-5" />
                <p className="text-white/80 leading-relaxed">
                  To be Islamabad's most trusted real estate platform — connecting people with their dream properties through verified listings, expert guidance, and an unwavering commitment to transparency and client satisfaction.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-luxury">
                <div className="w-14 h-14 bg-[#0A2342] rounded-2xl flex items-center justify-center mb-5">
                  <Eye size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-poppins font-bold text-[#0A2342] text-2xl mb-4">Our Vision</h3>
                <div className="gold-divider-left mb-5" />
                <p className="text-gray-600 leading-relaxed">
                  To transform how Pakistan experiences real estate — building a future where every family can find their dream home, every investor can build lasting wealth, and every property transaction is a positive, empowering experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CORE VALUES */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">What Drives Us</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Core Values</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((val, i) => (
                <FadeInSection key={val.title} delay={i * 80}>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all border border-gray-50">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <val.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] mb-1">{val.title}</h3>
                      <p className="text-gray-500 text-sm">{val.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* COMPANY TIMELINE */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our History</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Our Journey</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="relative">
              {/* Vertical connector */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <FadeInSection key={item.year} delay={i * 60}>
                    <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-luxury transition-all">
                          <span className="font-poppins font-bold text-[#D4AF37] text-sm">{item.year}</span>
                          <h3 className="font-poppins font-semibold text-[#0A2342] text-base mt-1 mb-2">{item.title}</h3>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex w-10 h-10 bg-[#D4AF37] rounded-full flex-shrink-0 items-center justify-center z-10 shadow-gold">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* STATS */}
      <section className="bg-[#0A2342] py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 500, suffix: '+', label: 'Properties Sold' },
              { end: 350, suffix: '+', label: 'Happy Clients' },
              { end: 40, suffix: '+', label: 'Professional Agents' },
              { end: 12, suffix: '+', label: 'Years Experience' },
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

      {/* MEET THE TEAM */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our People</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Meet the Team</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGENTS.slice(0, 3).map((agent, i) => (
                <FadeInSection key={agent.id} delay={i * 100}>
                  <div className="card-luxury p-6 text-center">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-[#D4AF37]/20"
                      loading="lazy"
                    />
                    <h3 className="font-poppins font-bold text-[#0A2342] mb-1">{agent.name}</h3>
                    <p className="text-[#D4AF37] font-semibold text-sm mb-2">{agent.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{agent.experience} experience · {agent.deals}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/agents" className="btn-navy">Meet All Agents <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* TESTIMONIALS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Client Testimonials</h2>
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

      {/* PARTNERS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Trusted By</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Our Partners</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="marquee-container">
              <div className="marquee-track gap-6 flex">
                {[...PARTNERS, ...PARTNERS].map((p, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-semibold text-[#0A2342] whitespace-nowrap"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* OFFICE GALLERY */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Behind the Scenes</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Office Gallery</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden hover:shadow-luxury transition-all">
                  <img src={img} alt={`Office gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <CTABand
        title="Let's Build Your Real Estate Journey Together"
        subtitle="Whether you're buying, selling, renting, or investing — our team is ready to help."
        primaryLabel="Contact Us"
        primaryPath="/contact"
        secondaryLabel="Explore Properties"
        secondaryPath="/buy"
      />

      <OfficeMap />
    </main>
  );
}
