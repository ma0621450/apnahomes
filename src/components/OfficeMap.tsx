import { COMPANY } from '../data';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Props {
  className?: string;
}

export default function OfficeMap({ className = '' }: Props) {
  return (
    <section className={`section-pad bg-[#F8F9FB] ${className}`}>
      <div className="container-luxury">
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Find Us</p>
          <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-4">Visit Our Office</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-luxury-lg h-80 md:h-[420px] bg-gray-200">
            <iframe
              title="Apna Islamabad Homes Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.1!2d73.0551!3d33.7215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzE3LjQiTiA3M8KwMDMnMTguNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              aria-label="Map showing location of Apna Islamabad Homes office at F-7 Markaz, Islamabad"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A2342] text-sm mb-0.5">Address</div>
                    <div className="text-gray-600 text-sm">{COMPANY.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A2342] text-sm mb-0.5">Phone</div>
                    <a href={`tel:${COMPANY.phone}`} className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors">{COMPANY.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A2342] text-sm mb-0.5">Email</div>
                    <a href={`mailto:${COMPANY.email}`} className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors">{COMPANY.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A2342] text-sm mb-0.5">Business Hours</div>
                    <div className="text-gray-600 text-sm">{COMPANY.hours}</div>
                    <div className="text-gray-400 text-xs">Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=F-7+Markaz,+Islamabad`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy inline-flex"
            >
              <MapPin size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
