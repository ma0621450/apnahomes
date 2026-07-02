import { useState } from 'react';
import { Link } from '../router';
import { Heart, Share2, MapPin, Bed, Bath, Maximize2, Eye } from 'lucide-react';
import { AGENTS } from '../data';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  category: string;
  beds: number | null;
  baths: number | null;
  area: string;
  badge?: string;
  badge2?: string;
  agentId: number;
  image: string;
  status?: string;
}

interface Props {
  property: Property;
  showAgent?: boolean;
}

const badgeStyle = (badge: string) => {
  const styles: Record<string, string> = {
    'Featured': 'bg-[#D4AF37] text-[#0A2342]',
    'New Listing': 'bg-emerald-500 text-white',
    'Hot Property': 'bg-red-500 text-white',
    'Luxury': 'bg-[#0A2342] text-white',
    'Verified': 'bg-blue-600 text-white',
    'High ROI': 'bg-orange-500 text-white',
    'Furnished': 'bg-purple-600 text-white',
    'Available': 'bg-emerald-500 text-white',
    'Ready to Move': 'bg-teal-600 text-white',
    'Coming Soon': 'bg-amber-500 text-white',
  };
  return styles[badge] || 'bg-gray-500 text-white';
};

export default function PropertyCard({ property, showAgent = true }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const agent = AGENTS.find(a => a.id === property.agentId);

  return (
    <article className="card-luxury group" aria-label={`Property: ${property.title}`}>
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.badge && (
            <span className={`badge text-xs ${badgeStyle(property.badge)}`}>{property.badge}</span>
          )}
          {property.badge2 && (
            <span className={`badge text-xs ${badgeStyle(property.badge2)}`}>{property.badge2}</span>
          )}
        </div>
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${
              wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:bg-[#D4AF37] hover:text-[#0A2342] flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Share property"
          >
            <Share2 size={14} />
          </button>
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="font-poppins font-bold text-white text-base bg-[#0A2342]/80 backdrop-blur-sm px-3 py-1 rounded-lg">
            {property.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-[#0A2342] text-base mb-1.5 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin size={13} className="text-[#D4AF37] flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-gray-600 text-sm border-t border-gray-100 pt-4 pb-4">
          {property.beds !== null && (
            <span className="flex items-center gap-1.5">
              <Bed size={14} className="text-[#D4AF37]" />
              <span>{property.beds} Bed{property.beds !== 1 ? 's' : ''}</span>
            </span>
          )}
          {property.baths !== null && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} className="text-[#D4AF37]" />
              <span>{property.baths} Bath{property.baths !== 1 ? 's' : ''}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Maximize2 size={14} className="text-[#D4AF37]" />
            <span>{property.area}</span>
          </span>
        </div>

        {/* Agent + CTA */}
        {showAgent && agent && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-7 h-7 rounded-full object-cover"
                loading="lazy"
              />
              <span className="text-xs text-gray-500">{agent.name}</span>
            </div>
            <Link
              to={`/property/${property.id}`}
              className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#0A2342] transition-colors group/link"
              aria-label={`View details for ${property.title}`}
            >
              <Eye size={13} />
              <span className="group-hover/link:underline">View Details</span>
            </Link>
          </div>
        )}
        {!showAgent && (
          <Link
            to={`/property/${property.id}`}
            className="btn-gold w-full justify-center text-sm py-2.5 mt-1"
          >
            View Details
          </Link>
        )}
      </div>
    </article>
  );
}
