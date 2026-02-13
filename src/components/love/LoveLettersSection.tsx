import React, { useState } from 'react';
import { Mail, ChevronDown, Heart, X } from 'lucide-react';
import { LOVE_LETTERS } from './data';

const LoveLettersSection: React.FC = () => {
  const [openLetter, setOpenLetter] = useState<number | null>(null);
  const [readLetters, setReadLetters] = useState<Set<number>>(new Set());

  const handleOpen = (id: number) => {
    setOpenLetter(id);
    setReadLetters(prev => new Set(prev).add(id));
  };

  const handleClose = () => {
    setOpenLetter(null);
  };

  const currentLetter = LOVE_LETTERS.find(l => l.id === openLetter);

  return (
    <section id="letters" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-rose-200/40 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-rose-200/30 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-rose-300 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-200 rounded-full" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm mb-4">
            <Mail className="w-4 h-4" />
            <span>Love Letters</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Letters From My Heart
          </h2>
          <p className="text-rose-600/70 max-w-md mx-auto">
            Each letter holds a piece of my heart. Tap to open and read the words I wrote just for you.
          </p>
          <div className="mt-3 text-sm text-rose-400">
            {readLetters.size} of {LOVE_LETTERS.length} letters opened
          </div>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOVE_LETTERS.map((letter, index) => {
            const isRead = readLetters.has(letter.id);
            return (
              <div
                key={letter.id}
                onClick={() => handleOpen(letter.id)}
                className="group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isRead ? 'ring-2 ring-rose-200' : ''
                }`}>
                  {/* Gradient top */}
                  <div className={`h-2 bg-gradient-to-r ${letter.color}`} />
                  
                  <div className="p-5 md:p-6 bg-white">
                    {/* Envelope icon */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${letter.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {letter.title}
                    </h3>
                    <p className="text-sm text-rose-400 mb-3">{letter.date}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {letter.preview}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-rose-400 flex items-center gap-1">
                        {isRead ? (
                          <>
                            <Heart className="w-3 h-3 fill-rose-400" /> Opened
                          </>
                        ) : (
                          'Tap to open'
                        )}
                      </span>
                      <ChevronDown className="w-4 h-4 text-rose-300 group-hover:translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Letter Modal */}
      {currentLetter && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl animate-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'scaleIn 0.4s ease-out',
            }}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${currentLetter.color} p-6 relative`}>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <Mail className="w-8 h-8 text-white/80 mb-3" />
              <h3 className="text-2xl font-bold text-white">{currentLetter.title}</h3>
              <p className="text-white/80 text-sm mt-1">{currentLetter.date}</p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[55vh]">
              <div
                className="text-gray-600 leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.15rem', lineHeight: '1.8' }}
              >
                {currentLetter.content}
              </div>

              {/* Decorative footer */}
              <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-rose-100">
                <div className="h-px w-12 bg-rose-200" />
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <div className="h-px w-12 bg-rose-200" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default LoveLettersSection;
