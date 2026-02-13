import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface WelcomeOverlayProps {
  onEnter: () => void;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onEnter }) => {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-rose-900 via-pink-900 to-purple-900 transition-all duration-700 ${
        exiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(255, ${150 + Math.random() * 105}, ${180 + Math.random() * 75}, ${0.2 + Math.random() * 0.4})`,
              animation: `floatParticle ${3 + Math.random() * 5}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center px-6 relative z-10">
        {/* Animated heart */}
        <div
          className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <div
            className="inline-block mb-8"
            style={{ animation: step >= 1 ? 'heartPulse 1.5s ease-in-out infinite' : 'none' }}
          >
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-rose-400 fill-rose-400 drop-shadow-2xl" />
          </div>
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-1000 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-rose-200/80 text-sm tracking-[0.3em] uppercase mb-4">
            A Special Gift For
          </p>
          <h1
            className="text-5xl md:text-7xl text-white mb-4"
            style={{ fontFamily: "'Great Vibes', cursive", textShadow: '0 4px 30px rgba(255,100,150,0.3)' }}
          >
            My Love
          </h1>
          <p
            className="text-rose-200/70 text-lg md:text-xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            I made something special just for you...
          </p>
        </div>

        {/* Enter button */}
        <div
          className={`mt-12 transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Heart className="w-5 h-5 text-rose-300 group-hover:fill-rose-300 transition-all" />
            <span
              className="text-lg tracking-wide"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Open Your Gift
            </span>
            <Heart className="w-5 h-5 text-rose-300 group-hover:fill-rose-300 transition-all" />
          </button>
          <p className="text-white/30 text-xs mt-4">Tap to begin</p>
        </div>
      </div>

      <style>{`
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(244,63,94,0.3)); }
          15% { transform: scale(1.2); filter: drop-shadow(0 0 30px rgba(244,63,94,0.5)); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); filter: drop-shadow(0 0 25px rgba(244,63,94,0.4)); }
        }
        @keyframes floatParticle {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-20px) translateX(10px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      `}</style>
    </div>
  );
};

export default WelcomeOverlay;
