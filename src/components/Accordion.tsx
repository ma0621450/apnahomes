import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface Item {
  question: string;
  answer: string | ReactNode;
}

interface Props {
  items: Item[];
  className?: string;
}

export default function Accordion({ items, className = '' }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#0A2342] hover:text-[#D4AF37] transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`accordion-panel-${i}`}
          >
            <span className="text-sm pr-4">{item.question}</span>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 transition-transform duration-300 text-[#D4AF37] ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            id={`accordion-panel-${i}`}
            className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
