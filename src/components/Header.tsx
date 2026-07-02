import { useState, useEffect } from 'react';
import { Link, useLocation } from '../router';
import {
  MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle,
  Menu, X, Building, PlusCircle
} from 'lucide-react';
import { COMPANY } from '../data';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Buy', path: '/buy' },
  { label: 'Rent', path: '/rent' },
  { label: 'Commercial', path: '/commercial' },
  { label: 'New Projects', path: '/new-projects' },
  { label: 'Agents', path: '/agents' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#0A2342] text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D4AF37]" />
              <span>{COMPANY.address}</span>
            </span>
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Phone size={13} className="text-[#D4AF37]" />
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Mail size={13} className="text-[#D4AF37]" />
              {COMPANY.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#D4AF37]" />
              {COMPANY.hours}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href={COMPANY.facebook} aria-label="Facebook" className="hover:text-[#D4AF37] transition-colors">
              <Facebook size={15} />
            </a>
            <a href={COMPANY.instagram} aria-label="Instagram" className="hover:text-[#D4AF37] transition-colors">
              <Instagram size={15} />
            </a>
            <a href={COMPANY.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
              <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-luxury py-3'
            : 'bg-white shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A2342] rounded-xl flex items-center justify-center flex-shrink-0">
                <Building size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="font-poppins font-bold text-[#0A2342] text-lg leading-tight">Apna Islamabad</div>
                <div className="font-inter text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Homes</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-underline px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-[#D4AF37] active'
                      : 'text-[#0A2342] hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                to="/list-your-property"
                className="hidden md:inline-flex btn-gold text-sm py-2.5 px-5"
              >
                <PlusCircle size={15} />
                List Property
              </Link>
              <button
                className="xl:hidden p-2 rounded-xl text-[#0A2342] hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A2342] flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Building size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="font-poppins font-bold text-white text-lg leading-tight">Apna Islamabad</div>
                <div className="font-inter text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Homes</div>
              </div>
            </Link>
            <button
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col px-6 pb-6 gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-4 px-4 rounded-xl text-lg font-medium transition-colors border-b border-white/10 ${
                  isActive(link.path)
                    ? 'text-[#D4AF37] bg-white/5'
                    : 'text-white hover:text-[#D4AF37] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6">
              <Link to="/list-your-property" className="btn-gold w-full justify-center text-base py-4">
                <PlusCircle size={18} />
                List Your Property
              </Link>
            </div>

            <div className="mt-6 space-y-3 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37]" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white">{COMPANY.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37]" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#D4AF37]" />
                <span>{COMPANY.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <a href={COMPANY.facebook} aria-label="Facebook" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Facebook size={20} />
              </a>
              <a href={COMPANY.instagram} aria-label="Instagram" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Instagram size={20} />
              </a>
              <a href={COMPANY.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
