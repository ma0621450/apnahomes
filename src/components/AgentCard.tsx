import { Link } from '../router';
import { Phone, MessageCircle, User, Star } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  title: string;
  experience: string;
  deals: string;
  rating: number;
  phone: string;
  email: string;
  specialty: string;
  listings: number;
  photo: string;
}

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  return (
    <div className="card-luxury p-6 text-center group">
      <div className="relative mb-4 inline-block">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-300"
          loading="lazy"
        />
        <span className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-[#0A2342] text-xs font-bold px-2 py-0.5 rounded-full">
          {agent.listings}+
        </span>
      </div>
      <h3 className="font-poppins font-bold text-[#0A2342] text-base mb-0.5">{agent.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{agent.title}</p>

      <div className="flex items-center justify-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < Math.floor(agent.rating) ? 'text-[#D4AF37]' : 'text-gray-300'}
            fill={i < Math.floor(agent.rating) ? 'currentColor' : 'none'}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">{agent.rating} out of 5</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 mb-4">
        <span className="bg-navy-50 text-navy-900 bg-[#e8edf4] text-[#0A2342] px-2 py-1 rounded-full font-medium">
          {agent.experience}
        </span>
        <span className="text-[#D4AF37] font-semibold">{agent.deals}</span>
      </div>

      <span className="inline-block badge-gold mb-5 text-xs">{agent.specialty}</span>

      <div className="flex items-center justify-center gap-2">
        <a
          href={`tel:${agent.phone}`}
          className="w-9 h-9 bg-[#0A2342] text-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A2342] transition-all"
          aria-label={`Call ${agent.name}`}
        >
          <Phone size={14} />
        </a>
        <a
          href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all"
          aria-label={`WhatsApp ${agent.name}`}
        >
          <MessageCircle size={14} />
        </a>
        <Link
          to={`/agents/${agent.id}`}
          className="w-9 h-9 bg-[#D4AF37] text-[#0A2342] rounded-full flex items-center justify-center hover:bg-[#c4a030] transition-all"
          aria-label={`View profile of ${agent.name}`}
        >
          <User size={14} />
        </Link>
      </div>
    </div>
  );
}
