import React, { useState } from 'react';
import { Heart, Check } from 'lucide-react';

const PROMISES = [
  { text: "I promise to always make you laugh", icon: "laugh" },
  { text: "I promise to hold your hand through every storm", icon: "hand" },
  { text: "I promise to be your biggest cheerleader", icon: "cheer" },
  { text: "I promise to never go to bed angry", icon: "moon" },
  { text: "I promise to always listen with my whole heart", icon: "ear" },
  { text: "I promise to surprise you when you least expect it", icon: "gift" },
  { text: "I promise to love you more with each passing day", icon: "heart" },
  { text: "I promise to be patient and understanding always", icon: "peace" },
  { text: "I promise to support your dreams no matter what", icon: "star" },
  { text: "I promise to make every day an adventure with you", icon: "map" },
  { text: "I promise to always be honest and true", icon: "shield" },
  { text: "I promise to grow old with you, still holding hands", icon: "infinity" },
];

const PromiseSection: React.FC = () => {
  const [acceptedPromises, setAcceptedPromises] = useState<Set<number>>(new Set());

  const togglePromise = (index: number) => {
    setAcceptedPromises(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allAccepted = acceptedPromises.size === PROMISES.length;

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-50 rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <h3
            className="text-3xl md:text-4xl text-rose-900 mb-3"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            My Promises to You
          </h3>
          <p className="text-rose-500/70 text-sm mb-4">
            Tap each promise to accept it into your heart
          </p>
          <div className="max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-rose-400 mb-1">
              <span>{acceptedPromises.size} accepted</span>
              <span>{PROMISES.length} promises</span>
            </div>
            <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${(acceptedPromises.size / PROMISES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROMISES.map((promise, index) => {
            const isAccepted = acceptedPromises.has(index);
            return (
              <button
                key={index}
                onClick={() => togglePromise(index)}
                className={`flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                  isAccepted
                    ? 'bg-rose-50 border-2 border-rose-300 shadow-md'
                    : 'bg-gray-50 border-2 border-transparent hover:border-rose-200 hover:bg-rose-50/50'
                }`}
                style={{
                  animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isAccepted
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-200 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-sm leading-relaxed transition-colors ${
                    isAccepted ? 'text-rose-700' : 'text-gray-600'
                  }`}
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem' }}
                >
                  {promise.text}
                </span>
              </button>
            );
          })}
        </div>

        {allAccepted && (
          <div
            className="text-center mt-8 p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200"
            style={{ animation: 'scaleIn 0.5s ease-out' }}
          >
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto mb-3" />
            <p
              className="text-rose-700 text-xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              All promises sealed with love
            </p>
            <p className="text-rose-500/70 text-sm mt-2">
              These are my forever promises to you
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default PromiseSection;
