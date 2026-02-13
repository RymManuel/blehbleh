import React, { useState, useCallback } from 'react';
import { Sparkles, Heart, Shuffle, Eye, EyeOff } from 'lucide-react';
import { REASONS } from './data';

const CARD_COLORS = [
  'from-rose-400 to-pink-500',
  'from-purple-400 to-violet-500',
  'from-amber-400 to-orange-500',
  'from-teal-400 to-cyan-500',
  'from-pink-400 to-rose-500',
  'from-indigo-400 to-blue-500',
  'from-fuchsia-400 to-pink-500',
  'from-red-400 to-rose-500',
  'from-violet-400 to-purple-500',
  'from-orange-400 to-amber-500',
];

const WhyILoveYouSection: React.FC = () => {
  const [reasons, setReasons] = useState(REASONS);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const toggleCard = (index: number) => {
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const shuffleReasons = useCallback(() => {
    const shuffled = [...reasons].sort(() => Math.random() - 0.5);
    setReasons(shuffled);
    setRevealedCards(new Set());
    setShuffleKey(prev => prev + 1);
  }, [reasons]);

  const toggleAll = () => {
    if (showAll) {
      setRevealedCards(new Set());
      setShowAll(false);
    } else {
      setRevealedCards(new Set(reasons.map((_, i) => i)));
      setShowAll(true);
    }
  };

  return (
    <section id="reasons" className="py-16 md:py-24 bg-gradient-to-b from-rose-50 to-pink-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Why I Love You</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {reasons.length} Reasons I Love You
          </h2>
          <p className="text-rose-600/70 max-w-md mx-auto mb-6">
            Tap each card to reveal a reason. Can you find them all?
          </p>

          {/* Progress */}
          <div className="max-w-xs mx-auto mb-6">
            <div className="flex justify-between text-sm text-rose-500 mb-2">
              <span>{revealedCards.size} discovered</span>
              <span>{reasons.length} total</span>
            </div>
            <div className="h-2 bg-rose-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${(revealedCards.size / reasons.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={shuffleReasons}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-rose-500 shadow-md hover:shadow-lg hover:bg-rose-50 transition-all text-sm"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </button>
            <button
              onClick={toggleAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-all text-sm"
            >
              {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAll ? 'Hide All' : 'Reveal All'}
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div key={shuffleKey} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {reasons.map((reason, index) => {
            const isRevealed = revealedCards.has(index);
            const colorClass = CARD_COLORS[index % CARD_COLORS.length];
            return (
              <div
                key={`${shuffleKey}-${index}`}
                className="perspective-1000 cursor-pointer"
                onClick={() => toggleCard(index)}
                style={{
                  animation: `fadeInUp 0.4s ease-out ${(index % 10) * 0.05}s both`,
                  perspective: '1000px',
                }}
              >
                <div
                  className={`relative w-full aspect-square transition-transform duration-600 preserve-3d ${
                    isRevealed ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.6s ease-in-out',
                  }}
                >
                  {/* Front - Hidden */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center p-3 shadow-lg hover:shadow-xl transition-shadow`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-white/80 mb-2" />
                    <span className="text-white/90 text-xs font-medium">#{index + 1}</span>
                    <span className="text-white/60 text-[10px] mt-1">Tap to reveal</span>
                  </div>

                  {/* Back - Revealed */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center p-3 md:p-4 shadow-lg border-2 border-rose-100"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="text-center">
                      <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mx-auto mb-2" />
                      <p
                        className="text-rose-700 text-xs md:text-sm leading-relaxed"
                        style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(0.7rem, 2vw, 0.95rem)' }}
                      >
                        {reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion message */}
        {revealedCards.size === reasons.length && (
          <div
            className="text-center mt-10 p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto"
            style={{ animation: 'scaleIn 0.5s ease-out' }}
          >
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto mb-3" />
            <h3
              className="text-2xl text-rose-800 mb-2"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              You Found Them All!
            </h3>
            <p className="text-rose-500 text-sm">
              And there are a million more reasons I haven't written yet...
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default WhyILoveYouSection;
