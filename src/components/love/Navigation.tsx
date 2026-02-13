import React, { useState, useEffect } from 'react';
import { Heart, Camera, Mail, Sparkles, Music, Gamepad2, Clock, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: Heart },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'letters', label: 'Love Letters', icon: Mail },
  { id: 'reasons', label: 'Why I Love You', icon: Sparkles },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'quiz', label: 'Love Quiz', icon: Gamepad2 },
  { id: 'song', label: 'Our Song', icon: Music },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: 0 };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        if (Math.abs(section.top) < Math.abs(closest.top)) return section;
        return closest;
      });

      setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 md:hidden ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md text-rose-500'
            : 'bg-white/20 backdrop-blur-md text-white'
        }`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-rose-950/80 backdrop-blur-md flex items-center justify-center md:hidden">
          <nav className="flex flex-col gap-4">
            {SECTIONS.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center gap-4 px-6 py-3 rounded-full transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white scale-105'
                      : 'text-rose-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-lg" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Desktop side dots */}
      <nav
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 transition-all duration-500 ${
          scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        {SECTIONS.map(section => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center justify-end"
              title={section.label}
            >
              <span
                className={`absolute right-12 px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-500 text-white opacity-100'
                    : 'bg-white/90 text-rose-600 opacity-0 group-hover:opacity-100'
                } shadow-lg`}
              >
                {section.label}
              </span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/30'
                    : 'bg-white/80 text-rose-400 hover:bg-rose-100 hover:scale-105 shadow-md'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;
