import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-rose-950 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Decorative hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-white/[0.03] fill-white/[0.03]"
            style={{
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 relative z-10 text-center">
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center mx-auto mb-8 transition-all hover:-translate-y-1"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Heart divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/30" />
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/30" />
        </div>

        <p
          className="text-3xl md:text-4xl text-rose-200 mb-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Made with all my love, for you
        </p>

        <p className="text-rose-300/60 text-sm mb-6">
          Every pixel of this page was crafted thinking of you.
          <br />
          You are my everything.
        </p>

        <div className="flex items-center justify-center gap-2 text-rose-400/50 text-xs">
          <span>Forever</span>
          <Heart className="w-3 h-3 fill-current" />
          <span>Always</span>
          <Heart className="w-3 h-3 fill-current" />
          <span>No Matter What</span>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-rose-400/30 text-xs">
            A love letter in code &middot; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
