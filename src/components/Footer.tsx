import { Link } from '../router';
import {
  Building, Phone, Mail, MapPin, Clock,
  Facebook, Instagram, Linkedin, MessageCircle,
  ChevronRight, Heart
} from 'lucide-react';
import { COMPANY } from '../data';

export default function Footer() {
  return (
    <footer className="bg-[#0A2342] text-white">
      {/* Newsletter Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-bold text-xl text-white mb-1">Stay Updated with Islamabad Real Estate</h3>
              <p className="text-white/60 text-sm">Get the latest listings, market trends, and investment insights.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] w-full md:w-72 text-sm"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn-gold whitespace-nowrap text-sm py-3 px-5">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Building size={24} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="font-poppins font-bold text-white text-xl leading-tight">Apna Islamabad</div>
                <div className="font-inter text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Homes</div>
              </div>
            </Link>
            <p className="text-[#D4AF37] font-semibold text-base mb-4">{COMPANY.tagline}</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner for buying, selling, renting, and investing in premium real estate across Islamabad. Serving clients with integrity, expertise, and unmatched commitment since 2012.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {COMPANY.address}
              </div>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                <Phone size={15} className="text-[#D4AF37] flex-shrink-0" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                <Mail size={15} className="text-[#D4AF37] flex-shrink-0" />
                {COMPANY.email}
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Clock size={15} className="text-[#D4AF37] flex-shrink-0" />
                {COMPANY.hours}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href={COMPANY.facebook} aria-label="Facebook" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A2342] transition-all">
                <Facebook size={16} />
              </a>
              <a href={COMPANY.instagram} aria-label="Instagram" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A2342] transition-all">
                <Instagram size={16} />
              </a>
              <a href={COMPANY.linkedin} aria-label="LinkedIn" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A2342] transition-all">
                <Linkedin size={16} />
              </a>
              <a href={COMPANY.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A2342] transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-5 pb-3 border-b border-[#D4AF37]/30">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Buy Properties', path: '/buy' },
                { label: 'Rent Properties', path: '/rent' },
                { label: 'Commercial', path: '/commercial' },
                { label: 'New Projects', path: '/new-projects' },
                { label: 'Our Agents', path: '/agents' },
                { label: 'Blog', path: '/blog' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors group">
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]/50" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-5 pb-3 border-b border-[#D4AF37]/30">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Buying Property',
                'Selling Property',
                'Rental Management',
                'Investment Consultancy',
                'Property Valuation',
                'Legal Documentation',
                'Property Management',
                'Construction Consultancy',
              ].map(s => (
                <li key={s}>
                  <span className="flex items-center gap-2 text-white/60 text-sm">
                    <ChevronRight size={12} className="text-[#D4AF37]/50" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-poppins font-semibold text-white text-base mb-5 pb-3 border-b border-[#D4AF37]/30">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'List Your Property', path: '/list-your-property' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'FAQs', path: '/contact' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.path} className="flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors group">
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]/50" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm text-center md:text-left">
            © 2026 Apna Islamabad Homes. All Rights Reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Built with <Heart size={11} className="text-[#D4AF37]" fill="#D4AF37" /> in Islamabad
          </p>
        </div>
      </div>
    </footer>
  );
}
