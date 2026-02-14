import React, { useEffect, useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { HERO_IMAGE, COUPLE_NAME_1 } from './data';

interface HeroSectionProps {
  onScrollDown: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  const [loaded, setLoaded] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 300);
    const t2 = setTimeout(() => setShowSubtext(true), 1200);
    const t3 = setTimeout(() => setShowButton(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Our Love Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-rose-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-transparent" />
      </div>

      {/* Animated sparkle dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      `}</style>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl mx-auto">
        {/* Heartbeat Heart */}
        <div
          className={`mb-6 transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <div
            className="inline-block"
            style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
          >
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-rose-400 fill-rose-400 drop-shadow-lg mx-auto" />
          </div>
        </div>

        {/* Names */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: "'Great Vibes', cursive", textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          {COUPLE_NAME_1}
        </h1>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p
            className="text-xl md:text-2xl text-rose-100/90 mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Happy Valentine's Day My Baby
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-rose-300/60" />
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-rose-300/60" />
          </div>
          <p className="text-rose-200/70 mt-4 text-sm md:text-base tracking-widest uppercase">
            Since May 9, 2024
          </p>
        </div>

        {/* Scroll Button */}
        <div
          className={`mt-12 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <button
            onClick={onScrollDown}
            className="group inline-flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
            >
              Explore Our Love
            </span>
            <div style={{ animation: 'gentleBounce 2s ease-in-out infinite' }}>
              <ChevronDown className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-50 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
