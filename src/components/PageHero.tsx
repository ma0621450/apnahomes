import { Link } from '../router';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  path?: string;
}

interface Props {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({ crumbs, title, subtitle, image }: Props) {
  const bgImage = image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600';

  return (
    <section
      className="relative min-h-[300px] md:min-h-[380px] flex items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342]/90 via-[#0A2342]/75 to-[#0A2342]/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-5">
          <Link to="/" className="flex items-center gap-1 text-white/70 hover:text-[#D4AF37] transition-colors">
            <Home size={13} />
            <span>Home</span>
          </Link>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={13} className="text-white/40" />
              {crumb.path ? (
                <Link to={crumb.path} className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#D4AF37]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="font-poppins font-bold text-white text-3xl md:text-5xl text-shadow mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {/* Gold underline */}
        <div className="gold-divider-left mt-5" />
      </div>
    </section>
  );
}
