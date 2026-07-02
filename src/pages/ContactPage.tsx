import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Facebook, Instagram,
  Linkedin, MessageCircle, Send, CheckCircle
} from 'lucide-react';
import PageHero from '../components/PageHero';
import FadeInSection from '../components/FadeInSection';
import Accordion from '../components/Accordion';
import { COMPANY } from '../data';

const FAQ_ITEMS = [
  { question: 'How quickly will I receive a response?', answer: 'Our team responds to all inquiries within 2-4 business hours during working hours (Mon–Sat, 9 AM–7 PM). WhatsApp messages are typically answered fastest.' },
  { question: 'How can I speak directly with a specific agent?', answer: 'Visit our Agents page to find specific agents, or mention the agent\'s name in your contact form message and we\'ll route your inquiry directly to them.' },
  { question: 'Do you charge a consultation fee?', answer: 'No, initial consultations are completely free of charge. Our team is happy to discuss your property needs without any obligation.' },
  { question: 'Can I visit the office without an appointment?', answer: 'Yes! Our office at F-7 Markaz, Islamabad is open Mon–Sat, 9 AM–7 PM. Walk-ins are welcome, though an appointment ensures an agent is available for you.' },
  { question: 'Do you serve areas outside Islamabad?', answer: 'Currently we specialize in Islamabad. We are expanding to Rawalpindi and other regions — contact us for your specific requirements.' },
];

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: COMPANY.facebook, color: 'bg-blue-600' },
  { label: 'Instagram', icon: Instagram, href: COMPANY.instagram, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500' },
  { label: 'LinkedIn', icon: Linkedin, href: '#', color: 'bg-blue-700' },
  { label: 'WhatsApp', icon: MessageCircle, href: COMPANY.whatsapp, color: 'bg-green-500' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Contact Us' }]}
        title="Contact Us"
        subtitle="We're here to help with all your real estate needs — reach out anytime."
        image="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* CONTACT INFO CARDS */}
      <FadeInSection>
        <section className="section-pad pb-8">
          <div className="container-luxury">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}`, color: 'bg-blue-50 text-blue-700' },
                { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, color: 'bg-green-50 text-green-700' },
                { icon: MapPin, label: 'Address', value: COMPANY.address, href: `https://maps.google.com/?q=${COMPANY.address}`, color: 'bg-[#D4AF37]/10 text-[#0A2342]' },
                { icon: Clock, label: 'Business Hours', value: COMPANY.hours, href: undefined, color: 'bg-purple-50 text-purple-700' },
              ].map(item => (
                <FadeInSection key={item.label} delay={0}>
                  <div className="bg-white rounded-2xl shadow-luxury p-5 flex gap-4 hover:shadow-luxury-lg transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0A2342] text-sm mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-gray-500 text-sm hover:text-[#D4AF37] transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-gray-500 text-sm">{item.value}</span>
                      )}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CONTACT FORM + MAP */}
      <FadeInSection>
        <section className="pb-16 md:pb-24">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Form */}
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Send a Message</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl mb-6">Get In Touch</h2>
                {submitted ? (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-luxury">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={36} className="text-emerald-500" />
                    </div>
                    <h3 className="font-poppins font-bold text-[#0A2342] text-2xl mb-3">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will get back to you within 2-4 business hours.</p>
                    <button
                      className="btn-gold"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', interest: '', message: '' }); }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-luxury p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-name">
                          Full Name <span className="text-red-400">*</span> <span className="sr-only">(required)</span>
                        </label>
                        <input
                          id="contact-name" required
                          className="input-field"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-phone">
                          Phone <span className="text-red-400">*</span> <span className="sr-only">(required)</span>
                        </label>
                        <input
                          id="contact-phone" required type="tel"
                          className="input-field"
                          placeholder="+92 300 1234567"
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email" type="email"
                        className="input-field"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        className="input-field"
                        placeholder="Subject of your message"
                        value={form.subject}
                        onChange={e => setForm({...form, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-interest">Property Interest</label>
                      <select
                        id="contact-interest"
                        className="input-field"
                        value={form.interest}
                        onChange={e => setForm({...form, interest: e.target.value})}
                      >
                        <option value="">Select your interest</option>
                        <option>Buy Property</option>
                        <option>Rent Property</option>
                        <option>Commercial Property</option>
                        <option>New Projects</option>
                        <option>List My Property</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="contact-message">
                        Message <span className="text-red-400">*</span> <span className="sr-only">(required)</span>
                      </label>
                      <textarea
                        id="contact-message" required rows={5}
                        className="input-field resize-none"
                        placeholder="Tell us about your requirements..."
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        aria-required="true"
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full justify-center" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Map + Info */}
              <div>
                <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Find Us</p>
                <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl mb-6">Our Office</h2>
                <div className="rounded-2xl overflow-hidden shadow-luxury h-72 mb-6">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318!2d73.0551!3d33.7215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzE3LjQiTiA3M8KwMDMnMTguNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    aria-label="Map of F-7 Markaz, Islamabad"
                  />
                </div>

                {/* Office Hours */}
                <div className="bg-white rounded-2xl shadow-luxury p-6 mb-6">
                  <h3 className="font-poppins font-semibold text-[#0A2342] mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-[#D4AF37]" />
                    Office Hours
                  </h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        ['Monday – Friday', '9:00 AM – 7:00 PM'],
                        ['Saturday', '10:00 AM – 5:00 PM'],
                        ['Sunday', 'Closed'],
                      ].map(([day, hours]) => (
                        <tr key={day} className="border-b border-gray-50 last:border-0">
                          <td className="py-2 text-gray-600">{day}</td>
                          <td className={`py-2 font-semibold text-right ${hours === 'Closed' ? 'text-red-400' : 'text-[#0A2342]'}`}>{hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-poppins font-semibold text-[#0A2342] mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {SOCIALS.map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-transform ${s.color}`}
                      >
                        <s.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* WHATSAPP CTA */}
      <FadeInSection>
        <section className="py-12 bg-green-50 border-y border-green-100">
          <div className="container-luxury">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-[#0A2342] text-lg">Chat with Us on WhatsApp</h3>
                  <p className="text-gray-500 text-sm">Get instant responses from our property experts</p>
                </div>
              </div>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-600 hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                aria-label="Start WhatsApp chat with Apna Islamabad Homes"
              >
                <MessageCircle size={18} />
                Start Chat
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Questions?</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Frequently Asked Questions</h2>
              <div className="gold-divider mt-2" />
            </div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
