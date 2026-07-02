import { useEffect, useState } from 'react';
import { Router, Routes, Route, useLocation } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import CommercialPage from './pages/CommercialPage';
import NewProjectsPage from './pages/NewProjectsPage';
import AgentsPage from './pages/AgentsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ListPropertyPage from './pages/ListPropertyPage';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { COMPANY } from './data';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp size={22} />
    </button>
  );
}

function WhatsAppFAB() {
  return (
    <a
      href={COMPANY.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/new-projects" element={<NewProjectsPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/list-your-property" element={<ListPropertyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-poppins font-bold text-[#D4AF37] text-8xl mb-4">404</div>
      <h1 className="font-poppins font-bold text-[#0A2342] text-3xl mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="btn-gold">Return Home</a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
