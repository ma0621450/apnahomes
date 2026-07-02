import { Link } from '../router';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryPath: string;
  secondaryLabel?: string;
  secondaryPath?: string;
}

export default function CTABand({
  title, subtitle, primaryLabel, primaryPath, secondaryLabel, secondaryPath
}: Props) {
  return (
    <section className="bg-[#0A2342] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-poppins font-bold text-white text-3xl md:text-4xl mb-4">{title}</h2>
          <p className="text-white/70 text-base md:text-lg mb-8">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={primaryPath} className="btn-gold">
              {primaryLabel}
              <ArrowRight size={16} />
            </Link>
            {secondaryLabel && secondaryPath && (
              <Link to={secondaryPath} className="btn-outline-gold">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
