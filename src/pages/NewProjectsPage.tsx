import { useState } from 'react';
import { Link } from '../router';
import {
  Search, MapPin, Calendar,
  Users, Building, ChevronLeft, ChevronRight,
  X
} from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import Accordion from '../components/Accordion';
import { NEW_PROJECTS } from '../data';

const PAYMENT_PLANS = [
  { project: 'Islamabad Heights', down: '20%', installments: '48 Monthly', possession: 'Q4 2026', price: 'PKR 2.5 Crore' },
  { project: 'DHA Business Park', down: '25%', installments: '36 Monthly', possession: 'Q2 2027', price: 'PKR 5 Crore' },
  { project: 'Bahria Luxury Villas', down: '30%', installments: '24 Monthly', possession: 'Q1 2026', price: 'PKR 4.8 Crore' },
];

const BOOKING_STEPS = [
  { step: 1, title: 'Choose Unit', desc: 'Browse available floor plans and select your unit.' },
  { step: 2, title: 'Reserve', desc: 'Pay a small reservation fee to hold your unit.' },
  { step: 3, title: 'Submit Documents', desc: 'Provide CNIC and required documentation.' },
  { step: 4, title: 'Sign Agreement', desc: 'Sign the official booking and sale agreement.' },
  { step: 5, title: 'Confirm Booking', desc: 'Pay your down payment and receive confirmation.' },
];

const AMENITY_ICONS: Record<string, string> = {
  Pool: '🏊',
  Gym: '💪',
  Mosque: '🕌',
  Parks: '🌳',
  Security: '🔒',
  'Community Center': '🏢',
  Parking: '🅿️',
  'Conference Center': '📊',
  'Food Court': '🍽️',
  'School Nearby': '🏫',
};

const FAQ_ITEMS = [
  { question: 'How do I book a unit in a new project?', answer: 'You can book a unit by visiting our office or filling out the online booking form. A reservation fee is required to hold the unit while documents are processed.' },
  { question: 'What payment options are available?', answer: 'We offer flexible payment plans including down payment + monthly/quarterly installments. Plans vary per project — contact us for details.' },
  { question: 'When is the possession date?', answer: 'Possession dates vary per project and are clearly stated in the sale agreement. Our team keeps buyers updated on construction progress.' },
  { question: 'Is the investment secure?', answer: 'All projects we list are from verified, credible developers with a proven track record. Legal documentation is verified before listing.' },
];

export default function NewProjectsPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Upcoming' | 'Completed'>('Ongoing');

  const GALLERY_IMAGES = [
    'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const filtered = NEW_PROJECTS.filter(p =>
    activeTab === 'Completed' ? false : p.status === activeTab
  );

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'New Projects' }]}
        title="New Projects in Islamabad"
        subtitle="Exclusive early-access opportunities in Islamabad's most anticipated residential and commercial developments."
        image="https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* FILTER BAR */}
      <section className="py-6 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-luxury">
          <div className="flex flex-wrap items-center gap-3">
            <input className="input-field text-sm max-w-xs" placeholder="Location" aria-label="Location" />
            <select className="input-field text-sm w-auto" aria-label="Developer">
              <option>Developer</option>
              <option>Capital Developers</option>
              <option>DHA Islamabad</option>
              <option>Bahria Town</option>
            </select>
            <select className="input-field text-sm w-auto" aria-label="Project type">
              <option>Project Type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Mixed Use</option>
            </select>
            <select className="input-field text-sm w-auto" aria-label="Status">
              <option>Status</option>
              <option>Ongoing</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
            <button className="btn-gold text-sm py-2.5">
              <Search size={15} />
              Search Projects
            </button>
          </div>
        </div>
      </section>

      {/* STATUS TABS + PROJECTS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Discover</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-4">Featured New Projects</h2>
              <div className="flex justify-center gap-2 mt-4">
                {(['Ongoing', 'Upcoming', 'Completed'] as const).map(tab => (
                  <button
                    key={tab}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab ? 'bg-[#D4AF37] text-[#0A2342]' : 'border border-gray-200 text-gray-600 hover:border-[#D4AF37]'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 && activeTab === 'Completed' && (
              <div className="text-center py-16 text-gray-400">
                <Building size={48} className="mx-auto mb-4 opacity-30" />
                <p>Completed projects coming soon</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((project, i) => (
                <FadeInSection key={project.id} delay={i * 100}>
                  <article className="card-luxury group">
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className={`absolute top-3 left-3 badge text-xs ${project.status === 'Ongoing' ? 'bg-emerald-500 text-white' : 'bg-[#D4AF37] text-[#0A2342]'}`}>
                        {project.status}
                      </span>
                      <span className="absolute top-3 right-3 badge bg-[#0A2342] text-white text-xs">{project.type}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-poppins font-bold text-[#0A2342] text-lg mb-1 group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                      <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <Users size={12} className="text-[#D4AF37]" /> {project.developer}
                      </div>
                      <div className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                        <MapPin size={12} className="text-[#D4AF37]" /> {project.location}
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                      {/* Progress Bar */}
                      {project.status === 'Ongoing' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Construction Progress</span>
                            <span className="font-semibold text-[#D4AF37]">{project.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#D4AF37] rounded-full transition-all duration-1000"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[#D4AF37] font-bold text-sm">From {project.priceFrom}</div>
                          <div className="text-gray-400 text-xs flex items-center gap-1">
                            <Calendar size={10} /> Completion: {project.completion}
                          </div>
                        </div>
                        <Link to="/contact" className="btn-gold text-xs py-2 px-4">
                          {project.status === 'Upcoming' ? 'Register Interest' : 'View Project'}
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* PROJECT GALLERY */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Visual Tour</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Project Gallery</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:shadow-luxury-lg transition-all"
                  onClick={() => { setGalleryIndex(i); setLightboxOpen(true); }}
                >
                  <img src={img} alt={`Project gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white hover:text-[#D4AF37] transition-colors" aria-label="Close gallery">
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D4AF37] transition-colors"
            onClick={e => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={GALLERY_IMAGES[galleryIndex]}
            alt={`Gallery image ${galleryIndex + 1}`}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D4AF37] transition-colors"
            onClick={e => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % GALLERY_IMAGES.length); }}
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`rounded-full transition-all ${i === galleryIndex ? 'w-4 h-2 bg-[#D4AF37]' : 'w-2 h-2 bg-white/50'}`}
                onClick={e => { e.stopPropagation(); setGalleryIndex(i); }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* PAYMENT PLANS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Flexible Finance</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Payment Plans</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PAYMENT_PLANS.map((plan, i) => (
                <FadeInSection key={plan.project} delay={i * 100}>
                  <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 p-6 hover:border-[#D4AF37] transition-all">
                    <div className="font-poppins font-bold text-[#0A2342] text-base mb-4 pb-3 border-b border-gray-100">{plan.project}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Starting Price</span>
                        <span className="font-semibold text-[#D4AF37]">{plan.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Down Payment</span>
                        <span className="font-semibold text-[#0A2342]">{plan.down}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Installments</span>
                        <span className="font-semibold text-[#0A2342]">{plan.installments}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Possession</span>
                        <span className="font-semibold text-[#0A2342]">{plan.possession}</span>
                      </div>
                    </div>
                    <Link to="/contact" className="btn-gold w-full justify-center mt-5 text-sm py-2.5">Book a Unit</Link>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* BOOKING PROCESS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Easy Steps</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Booking Process</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {BOOKING_STEPS.map((step, i) => (
                  <FadeInSection key={step.step} delay={i * 80}>
                    <div className="relative z-10 text-center">
                      <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3 text-[#0A2342] font-poppins font-bold text-lg shadow-gold">
                        {step.step}
                      </div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-1.5">{step.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* AMENITIES */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">World-Class Amenities</h2>
              <p className="text-gray-500">Premium lifestyle facilities across all our featured projects.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(AMENITY_ICONS).map(([name, icon], i) => (
                <FadeInSection key={name} delay={i * 40}>
                  <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all text-center border border-gray-50">
                    <span className="text-3xl mb-2">{icon}</span>
                    <span className="text-xs font-medium text-[#0A2342]">{name}</span>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Frequently Asked Questions</h2>
              <div className="gold-divider mt-2" />
            </div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </section>
      </FadeInSection>

      <CTABand
        title="Reserve Your Unit Today"
        subtitle="Book a site visit or download a project brochure from our team of specialists."
        primaryLabel="Book a Site Visit"
        primaryPath="/contact"
        secondaryLabel="Download Brochure"
        secondaryPath="/contact"
      />

      <OfficeMap />
    </main>
  );
}
