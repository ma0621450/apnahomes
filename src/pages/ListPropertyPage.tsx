import { useState, useCallback } from 'react';
import { Link } from '../router';
import {
  CheckCircle, Users, Award, Camera, FileText,
  ArrowRight, ArrowLeft, Upload, X, Home, TrendingUp, Shield
} from 'lucide-react';
import PageHero from '../components/PageHero';
import OfficeMap from '../components/OfficeMap';
import FadeInSection from '../components/FadeInSection';
import Accordion from '../components/Accordion';

const BENEFITS = [
  { icon: Users, title: 'Verified Buyer Network', desc: 'Access to 10,000+ active, pre-qualified buyers and tenants.' },
  { icon: Camera, title: 'Photography Support', desc: 'Professional photography guidance to showcase your property.' },
  { icon: Shield, title: 'Legal Guidance', desc: 'Expert legal support throughout the sale/rent process.' },
  { icon: TrendingUp, title: 'Faster Sale/Rent', desc: 'Our listings close 3x faster than market average.' },
  { icon: Award, title: 'Dedicated Manager', desc: 'A dedicated listing manager assigned to your property.' },
  { icon: CheckCircle, title: 'Market Pricing', desc: 'Data-driven pricing advice for maximum returns.' },
];

const LISTING_PROCESS = [
  { step: 1, title: 'Submit Details', desc: 'Fill out our detailed property submission form.' },
  { step: 2, title: 'Verification', desc: 'Our team verifies your property documents.' },
  { step: 3, title: 'Goes Live', desc: 'Your listing is published to thousands of buyers.' },
  { step: 4, title: 'Connect with Buyers', desc: 'Receive inquiries and schedule viewings.' },
  { step: 5, title: 'Close the Deal', desc: 'We support you through to final agreement.' },
];

const AMENITIES_LIST = [
  'Swimming Pool', 'Garden', 'Servant Quarter', 'Solar System', 'Basement',
  'Security', 'Elevator', 'Gym', 'Mosque Nearby', 'School Nearby', 'Parking', 'Generator',
];

const PRICING_TIPS = [
  { title: 'Research Comparable Sales', desc: 'Look at recently sold properties in your area with similar size and features for accurate pricing.' },
  { title: 'Factor in Current Market Conditions', desc: 'Consider whether it\'s a buyer\'s or seller\'s market when setting your asking price.' },
  { title: 'Price Slightly Below Round Numbers', desc: 'Pricing at PKR 4.9 Crore instead of PKR 5 Crore increases visibility in search results.' },
];

const FAQ_ITEMS = [
  { question: 'Are there any listing fees?', answer: 'We charge a competitive commission only upon successful sale or rental — no upfront listing fees.' },
  { question: 'How long does it take for my listing to go live?', answer: 'After document verification, your listing typically goes live within 24-48 hours.' },
  { question: 'What documents are required?', answer: 'We require a copy of your CNIC, property ownership document (Fard/Registry), and any NOCs if applicable.' },
  { question: 'How will I receive buyer inquiries?', answer: 'You\'ll receive inquiries via call, WhatsApp, and email. Your dedicated manager will coordinate all viewings.' },
];

const SUCCESS_STORIES = [
  { name: 'Imran Aslam', role: 'Property Owner', result: 'Sold my F-8 villa in 3 weeks at asking price. The team was exceptional throughout.' },
  { name: 'Sana Bashir', role: 'Landlord', result: 'Got a premium tenant for my DHA apartment within 10 days. Highly professional service!' },
  { name: 'Rizwan Ahmed', role: 'Commercial Owner', result: 'Listed and closed a Blue Area commercial unit in record time. Excellent market knowledge.' },
];

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS = ['Owner Info', 'Property Info', 'Amenities', 'Upload', 'Description', 'Preview'];

interface FormData {
  // Step 1
  ownerName: string; phone: string; email: string; cnic: string;
  // Step 2
  propertyTitle: string; propertyType: string; category: string;
  listingType: 'sale' | 'rent'; city: string; area: string;
  address: string; price: string; areaSize: string; areaSizeUnit: string;
  beds: string; baths: string; floors: string; parking: string; yearBuilt: string;
  // Step 3
  amenities: string[];
  // Step 4
  images: File[]; videoFile: File | null; docsFile: File | null; floorPlanFile: File | null;
  // Step 5
  description: string;
}

export default function ListPropertyPage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    ownerName: '', phone: '', email: '', cnic: '',
    propertyTitle: '', propertyType: '', category: '', listingType: 'sale',
    city: 'Islamabad', area: '', address: '', price: '', areaSize: '',
    areaSizeUnit: 'Marla', beds: '', baths: '', floors: '', parking: '', yearBuilt: '',
    amenities: [], images: [], videoFile: null, docsFile: null, floorPlanFile: null,
    description: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const setField = (k: keyof FormData, v: FormData[keyof FormData]) => setForm(prev => ({ ...prev, [k]: v }));

  const toggleAmenity = (a: string) => {
    setField('amenities', form.amenities.includes(a)
      ? form.amenities.filter(x => x !== a)
      : [...form.amenities, a]
    );
  };

  const handleImages = useCallback((files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 10);
    setField('images', [...form.images, ...arr].slice(0, 10) as File[]);
    arr.forEach(f => {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreviews(prev => [...prev, e.target?.result as string].slice(0, 10));
      reader.readAsDataURL(f);
    });
  }, [form.images]);

  const removeImage = (i: number) => {
    setField('images', form.images.filter((_, idx) => idx !== i) as File[]);
    setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  // progress used via (step/6)*100 inline

  const nextStep = () => setStep(s => Math.min(s + 1, 6) as Step);
  const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step);

  return (
    <main>
      <PageHero
        crumbs={[{ label: 'List Your Property' }]}
        title="List Your Property with Confidence"
        subtitle="Reach thousands of verified buyers and tenants across Islamabad."
        image="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* BENEFITS */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Why List With Us</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">The Smarter Way to List</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((b, i) => (
                <FadeInSection key={b.title} delay={i * 80}>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all border border-gray-50">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <b.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] mb-1 text-sm">{b.title}</h3>
                      <p className="text-gray-500 text-sm">{b.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* LISTING PROCESS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">How It Works</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl md:text-4xl mb-3">Listing Process</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {LISTING_PROCESS.map((p, i) => (
                  <FadeInSection key={p.step} delay={i * 80}>
                    <div className="relative z-10 text-center">
                      <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3 text-[#0A2342] font-poppins font-bold text-lg shadow-gold">{p.step}</div>
                      <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-1.5">{p.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* MULTI-STEP FORM */}
      <section className="section-pad bg-[#F8F9FB]" id="listing-form">
        <div className="container-luxury max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Get Started</p>
            <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Submit Your Property</h2>
            <div className="gold-divider mt-2" />
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-luxury p-12 text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h3 className="font-poppins font-bold text-[#0A2342] text-2xl mb-3">Property Submitted Successfully!</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">Your property listing has been received. Our team will verify your documents and go live within 24-48 hours.</p>
              <div className="flex justify-center gap-4">
                <button className="btn-gold" onClick={() => { setSubmitted(false); setStep(1); }}>List Another Property</button>
                <Link to="/buy" className="btn-outline-navy">View All Properties</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-luxury overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gray-50 p-5 border-b border-gray-100">
                <div
                  className="flex items-center justify-between text-xs text-gray-400 mb-3 font-medium"
                  aria-live="polite"
                  aria-label={`Step ${step} of 6: ${STEP_LABELS[step - 1]}`}
                >
                  <span>Step {step} of 6</span>
                  <span className="font-semibold text-[#0A2342]">{STEP_LABELS[step - 1]}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={6}>
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  {STEP_LABELS.map((label, i) => (
                    <span
                      key={label}
                      className={`text-xs font-medium transition-colors hidden sm:block ${i + 1 <= step ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {/* STEP 1 - Owner Info */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-5">Owner Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="owner-name">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input id="owner-name" required className="input-field" placeholder="Your full name" value={form.ownerName} onChange={e => setField('ownerName', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="owner-phone">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input id="owner-phone" required type="tel" className="input-field" placeholder="+92 300 1234567" value={form.phone} onChange={e => setField('phone', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="owner-email">Email</label>
                        <input id="owner-email" type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={e => setField('email', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="owner-cnic">CNIC (Optional)</label>
                        <input id="owner-cnic" className="input-field" placeholder="XXXXX-XXXXXXX-X" value={form.cnic} onChange={e => setField('cnic', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 - Property Info */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-5">Property Information</h3>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-title">
                        Property Title <span className="text-red-400">*</span>
                      </label>
                      <input id="prop-title" required className="input-field" placeholder="e.g., Designer Villa in F-7" value={form.propertyTitle} onChange={e => setField('propertyTitle', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-type">Property Type</label>
                        <select id="prop-type" className="input-field" value={form.propertyType} onChange={e => setField('propertyType', e.target.value)}>
                          <option value="">Select type</option>
                          <option>House</option>
                          <option>Apartment</option>
                          <option>Penthouse</option>
                          <option>Farmhouse</option>
                          <option>Plot</option>
                          <option>Commercial</option>
                          <option>Villa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-2">Listing Type</label>
                        <div className="flex gap-4">
                          {(['sale', 'rent'] as const).map(t => (
                            <label key={t} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="listingType"
                                value={t}
                                checked={form.listingType === t}
                                onChange={() => setField('listingType', t)}
                                className="accent-[#D4AF37]"
                              />
                              <span className="text-sm font-medium text-gray-700 capitalize">{t === 'sale' ? 'For Sale' : 'For Rent'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-area">Area/Sector</label>
                        <input id="prop-area" className="input-field" placeholder="e.g., F-7, DHA Phase II" value={form.area} onChange={e => setField('area', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-price">Price (PKR)</label>
                        <input id="prop-price" className="input-field" placeholder="e.g., 12,000,000" value={form.price} onChange={e => setField('price', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-address">Full Address</label>
                      <input id="prop-address" className="input-field" placeholder="Street, Sector, City" value={form.address} onChange={e => setField('address', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-beds">Bedrooms</label>
                        <select id="prop-beds" className="input-field" value={form.beds} onChange={e => setField('beds', e.target.value)}>
                          {['', '1', '2', '3', '4', '5', '6', '7+'].map(n => <option key={n}>{n || 'Select'}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-baths">Bathrooms</label>
                        <select id="prop-baths" className="input-field" value={form.baths} onChange={e => setField('baths', e.target.value)}>
                          {['', '1', '2', '3', '4', '5', '6', '7+'].map(n => <option key={n}>{n || 'Select'}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-size">Area Size</label>
                        <input id="prop-size" className="input-field" placeholder="e.g., 1" value={form.areaSize} onChange={e => setField('areaSize', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-unit">Unit</label>
                        <select id="prop-unit" className="input-field" value={form.areaSizeUnit} onChange={e => setField('areaSizeUnit', e.target.value)}>
                          <option>Marla</option>
                          <option>Kanal</option>
                          <option>sqft</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-floors">Floors</label>
                        <input id="prop-floors" className="input-field" placeholder="e.g., 2" value={form.floors} onChange={e => setField('floors', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-parking">Parking</label>
                        <select id="prop-parking" className="input-field" value={form.parking} onChange={e => setField('parking', e.target.value)}>
                          <option value="">Select</option>
                          <option>1 Car</option>
                          <option>2 Cars</option>
                          <option>3+ Cars</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2342] mb-1.5" htmlFor="prop-year">Year Built</label>
                        <input id="prop-year" className="input-field" placeholder="e.g., 2020" value={form.yearBuilt} onChange={e => setField('yearBuilt', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 - Amenities */}
                {step === 3 && (
                  <div>
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-5">Amenities</h3>
                    <p className="text-gray-500 text-sm mb-5">Select all amenities available at your property.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {AMENITIES_LIST.map(a => (
                        <label
                          key={a}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.amenities.includes(a) ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-200 hover:border-[#D4AF37]/50'}`}
                        >
                          <input
                            type="checkbox"
                            checked={form.amenities.includes(a)}
                            onChange={() => toggleAmenity(a)}
                            className="flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 font-medium">{a}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 - Upload */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-5">Upload Files</h3>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-3">Property Images (up to 10)</label>
                      <div
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${dragOver ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-200 hover:border-[#D4AF37]/50'}`}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleImages(e.dataTransfer.files); }}
                      >
                        <Upload size={32} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-gray-500 text-sm mb-2">Drag & drop images here, or</p>
                        <label className="btn-outline-navy text-sm py-2 px-5 cursor-pointer">
                          Browse Files
                          <input type="file" multiple accept="image/*" className="hidden" onChange={e => handleImages(e.target.files)} />
                        </label>
                      </div>
                      {imagePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {imagePreviews.map((src, i) => (
                            <div key={i} className="relative w-20 h-20">
                              <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                              <button
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                                onClick={() => removeImage(i)}
                                aria-label={`Remove image ${i + 1}`}
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Video */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-2">Property Video (optional)</label>
                      <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 transition-colors">
                        <Camera size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{form.videoFile ? form.videoFile.name : 'Upload property tour video (MP4, max 200MB)'}</span>
                        <input type="file" accept="video/*" className="hidden" onChange={e => { const f = e.target.files; setField('videoFile', f ? f[0] : null); }} />
                      </label>
                    </div>

                    {/* Documents */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-2">Ownership Documents</label>
                      <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 transition-colors">
                        <FileText size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{form.docsFile ? form.docsFile.name : 'Upload Fard, Registry, or NOC (PDF)'}</span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => { const f = e.target.files; setField('docsFile', f ? f[0] : null); }} />
                      </label>
                    </div>

                    {/* Floor Plan */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A2342] mb-2">Floor Plan (optional)</label>
                      <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 transition-colors">
                        <Home size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{form.floorPlanFile ? form.floorPlanFile.name : 'Upload floor plan image or PDF'}</span>
                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => { const f = e.target.files; setField('floorPlanFile', f ? f[0] : null); }} />
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 5 - Description */}
                {step === 5 && (
                  <div>
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-3">Property Description</h3>
                    <p className="text-gray-500 text-sm mb-5">Write a detailed, compelling description of your property to attract serious buyers.</p>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="flex gap-2 p-2 bg-gray-50 border-b border-gray-200">
                        {['Bold', 'Italic', 'List'].map(btn => (
                          <button key={btn} className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white hover:text-[#0A2342] rounded-lg transition-colors border border-transparent hover:border-gray-200" aria-label={`${btn} formatting`}>
                            {btn}
                          </button>
                        ))}
                      </div>
                      <textarea
                        rows={10}
                        className="w-full p-4 text-sm text-gray-700 focus:outline-none resize-none"
                        placeholder="Describe your property in detail: architecture style, special features, neighborhood highlights, nearby facilities, any renovations... Example: This stunning 1 Kanal designer villa in the heart of F-7 offers panoramic views of the Margalla Hills with 5 bedrooms, 6 bathrooms..."
                        value={form.description}
                        onChange={e => setField('description', e.target.value)}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">{form.description.length} characters</div>
                  </div>
                )}

                {/* STEP 6 - Preview */}
                {step === 6 && (
                  <div>
                    <h3 className="font-poppins font-bold text-[#0A2342] text-xl mb-5">Preview Your Listing</h3>
                    <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-poppins font-bold text-[#0A2342] text-lg">{form.propertyTitle || 'Your Property Title'}</h4>
                          <p className="text-gray-500 text-sm mt-0.5">{form.area}, {form.city}</p>
                        </div>
                        <span className="badge-gold text-xs">{form.listingType === 'sale' ? 'For Sale' : 'For Rent'}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                        <div className="bg-white rounded-xl p-3 text-center">
                          <div className="font-bold text-[#0A2342]">{form.propertyType || '-'}</div>
                          <div className="text-gray-400 text-xs">Type</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center">
                          <div className="font-bold text-[#0A2342]">{form.beds || '-'}</div>
                          <div className="text-gray-400 text-xs">Beds</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center">
                          <div className="font-bold text-[#0A2342]">{form.areaSize ? `${form.areaSize} ${form.areaSizeUnit}` : '-'}</div>
                          <div className="text-gray-400 text-xs">Area</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center">
                          <div className="font-bold text-[#D4AF37]">{form.price ? `PKR ${form.price}` : '-'}</div>
                          <div className="text-gray-400 text-xs">Price</div>
                        </div>
                      </div>
                      {form.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {form.amenities.map(a => <span key={a} className="badge badge-navy text-xs">{a}</span>)}
                        </div>
                      )}
                      {form.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{form.description}</p>
                      )}
                      {imagePreviews.length > 0 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                          {imagePreviews.map((src, i) => (
                            <img key={i} src={src} alt={`Preview ${i + 1}`} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mt-4 text-center">This is how your listing will appear to buyers. Click "Submit Property" to publish.</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                  <div>
                    {step > 1 && (
                      <button className="btn-outline-navy text-sm py-2.5 px-5" onClick={prevStep}>
                        <ArrowLeft size={15} />
                        Previous
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button className="text-sm font-semibold text-gray-400 hover:text-gray-600 px-4 py-2.5 transition-colors">
                      Save Draft
                    </button>
                    {step < 6 ? (
                      <button className="btn-gold text-sm py-2.5 px-6" onClick={nextStep}>
                        Next Step
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        className="btn-gold text-sm py-2.5 px-6"
                        onClick={() => setSubmitted(true)}
                      >
                        Submit Property
                        <CheckCircle size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </section>

      {/* PRICING TIPS */}
      <FadeInSection>
        <section className="section-pad">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Pro Tips</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Pricing Tips</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_TIPS.map((tip, i) => (
                <FadeInSection key={tip.title} delay={i * 80}>
                  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-luxury transition-all border border-gray-50 text-center">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp size={20} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="font-poppins font-semibold text-[#0A2342] text-sm mb-2">{tip.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* SUCCESS STORIES */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Results</p>
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Owner Success Stories</h2>
              <div className="gold-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUCCESS_STORIES.map((s, i) => (
                <FadeInSection key={s.name} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-luxury border border-gray-100">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#D4AF37] text-sm">★</span>)}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 italic">"{s.result}"</p>
                    <div>
                      <div className="font-semibold text-[#0A2342] text-sm">{s.name}</div>
                      <div className="text-gray-500 text-xs">{s.role}</div>
                    </div>
                  </div>
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
              <h2 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Listing FAQs</h2>
              <div className="gold-divider mt-2" />
            </div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </section>
      </FadeInSection>

      {/* CONTACT LISTING TEAM */}
      <FadeInSection>
        <section className="section-pad bg-[#F8F9FB]">
          <div className="container-luxury max-w-xl text-center">
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-3">Need Help?</p>
            <h2 className="font-poppins font-bold text-[#0A2342] text-2xl md:text-3xl mb-4">Contact Our Listing Team</h2>
            <p className="text-gray-500 mb-6">Struggling to complete your submission? Our listing specialists are happy to assist.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+923001234567" className="btn-navy">Call Us Now</a>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Us</a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <OfficeMap />
    </main>
  );
}
