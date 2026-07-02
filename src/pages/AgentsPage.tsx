import { useState } from 'react';
import { Link } from '../router';
import {
  Search, Users, Award, Star, ArrowRight,
  Briefcase, TrendingUp, Phone, MessageCircle, Send
} from 'lucide-react';
import PageHero from '../components/PageHero';
import AgentCard from '../components/AgentCard';

import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCard from '../components/TestimonialCard';
import { AGENTS, TESTIMONIALS } from '../data';

const SPECIALTIES = ['All', 'Buy Specialist', 'Rental Specialist', 'Commercial Specialist', 'Investment Consultant'];

const CERTS = [
  { name: 'RERA Certified', color: 'bg-blue-50 text-blue-700' },
  { name: 'ISO 9001:2015', color: 'bg-green-50 text-green-700' },
  { name: 'PBPA Member', color: 'bg-purple-50 text-purple-700' },
  { name: 'CDA Approved', color: 'bg-[#D4AF37]/10 text-[#0A2342]' },
  { name: 'Best Realty 2025', color: 'bg-red-50 text-red-700' },
];

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', specialty: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = AGENTS.filter(a => {
    const matchesSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.title.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpecialty === 'All' || a.specialty === selectedSpecialty;
    return matchesSearch && matchesSpec;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Agents' }]}
        title="Meet Our Expert Agents"
        subtitle="Personalized, trusted guidance from Islamabad's top property specialists — across every property type."
        image="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* SEARCH AGENTS */}
      <section className="py-8 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="input-field pl-10"
                placeholder="Search by name or specialty..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search agents"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map(s => (
                <button
                  key={s}
                  className={`text-sm px-4 py-2.5 rounded-full border transition-all ${selectedSpecialty === s ? 'bg-[#D4AF37] text-[#0A2342] border-[#D4AF37]' : 'border-gray-200 text-gray-600 hover:border-[#D4AF37]'}`}
                  onClick={() => setSelectedSpecialty(s)}
                  aria-pressed={selectedSpecialty === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED AGENTS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Top Performers</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Featured Agents</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AGENTS.slice(0, 2).map((agent, i) => (
                <FadeInSection key={agent.id} delay={i * 100}>
                  <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 p-6 flex flex-col sm:flex-row gap-5 hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all">
                    <div className="relative flex-shrink-0">
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        className="w-28 h-28 rounded-2xl object-cover"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-[#0A2342] text-xs font-bold px-2 py-1 rounded-full">
                        Top Agent
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-0.5">{agent.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{agent.title}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={14} className={j < Math.floor(agent.rating) ? 'text-[#D4AF37]' : 'text-gray-300'} fill={j < Math.floor(agent.rating) ? 'currentColor' : 'none'} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{agent.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Briefcase size={13} className="text-[#D4AF37]" /> {agent.experience}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <TrendingUp size={13} className="text-[#D4AF37]" /> {agent.deals}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <Users size={13} className="text-[#D4AF37]" /> {agent.listings}+ Listings
                        </span>
                      </div>
                      <span className="inline-block badge-gold text-xs mb-4">{agent.specialty}</span>
                      <div className="flex gap-2">
                        <a href={`tel:${agent.phone}`} className="btn-navy text-xs py-2 px-4">
                          <Phone size={13} /> Call
                        </a>
                        <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-xs py-2 px-4 rounded-full flex items-center gap-1 hover:bg-green-600 transition-colors">
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                        <Link to={`/agents/${agent.id}`} className="btn-outline-navy text-xs py-2 px-4">View Profile</Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* AGENT GRID */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our Team</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl">All Agents</h2>
                <p className="text-gray-500 mt-1" aria-live="polite">Showing {filtered.length} agent{filtered.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users size={48} className="mx-auto mb-4 opacity-30" />
                <p>No agents found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((agent, i) => (
                  <FadeInSection key={agent.id} delay={i * 60}>
                    <AgentCard agent={agent} />
                  </FadeInSection>
                ))}
              </div>
            )}
          </div>
        </section>
      </FadeInSection>

      {/* STATS */}
      <section className="bg-[#0A2342] py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: AGENTS.length, suffix: '', label: 'Professional Agents' },
              { end: 78, suffix: ' yrs', label: 'Combined Experience' },
              { end: 870, suffix: '+', label: 'Properties Closed' },
              { end: 98, suffix: '%', label: 'Client Satisfaction' },
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

      {/* AWARDS & CERTIFICATIONS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Credentials</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Awards & Certifications</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {CERTS.map((cert) => (
                <div key={cert.name} className={`px-6 py-4 rounded-2xl font-semibold text-sm ${cert.color} border border-gray-100 shadow-sm`}>
                  <Award size={16} className="inline mr-2" />
                  {cert.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CLIENT REVIEWS FOR AGENTS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Client Reviews</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <FadeInSection key={t.id} delay={i * 100}>
                  <TestimonialCard testimonial={t} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* JOIN OUR TEAM */}
      <FadeInSection>
        <section className="py-16 bg-gradient-to-r from-[#0A2342] to-[#1a3a6e]">
          <div className="container-luxury text-center">
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-3">Career Opportunity</p>
            <h2 className="font-poppins font-bold text-white text-3xl md:text-4xl mb-4">Become an Agent at Apna Islamabad Homes</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">Join Pakistan's most trusted real estate company. We offer industry-leading commissions, mentorship, and a supportive team environment.</p>
            <Link to="/contact" className="btn-gold text-base px-8 py-4">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* CONTACT AN AGENT FORM */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury max-w-2xl">
            <div className="text-center mb-10">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Contact an Agent</h2>
              <div className="gold-divider mt-2" />
            </div>
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon />
                </div>
                <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-2">Request Sent!</h3>
                <p className="text-gray-500">We'll connect you with the right agent within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-luxury p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="agent-name">Full Name <span aria-label="required">*</span></label>
                    <input id="agent-name" required className="input-field" placeholder="Your full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="agent-phone">Phone <span aria-label="required">*</span></label>
                    <input id="agent-phone" required type="tel" className="input-field" placeholder="+92 300 1234567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="agent-email">Email</label>
                  <input id="agent-email" type="email" className="input-field" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="agent-specialty">Preferred Specialty</label>
                  <select id="agent-specialty" className="input-field" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})}>
                    <option value="">Select a specialty</option>
                    {SPECIALTIES.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="agent-message">Message</label>
                  <textarea id="agent-message" rows={4} className="input-field resize-none" placeholder="Describe what you're looking for..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">
                  <Send size={16} />
                  Send Request
                </button>
              </form>
            )}
          </div>
        </section>
      </FadeInSection>

      <OfficeMap />
    </main>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
