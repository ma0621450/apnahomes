import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={15}
            className={i < testimonial.rating ? 'text-[#D4AF37]' : 'text-gray-300'}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-[#0A2342] text-sm">{testimonial.name}</div>
          <div className="text-gray-500 text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
