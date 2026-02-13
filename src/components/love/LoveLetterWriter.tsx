import React, { useState } from 'react';
import { PenTool, Heart, Send, Check } from 'lucide-react';

const LoveLetterWriter: React.FC = () => {
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [savedLetters, setSavedLetters] = useState<Array<{ name: string; letter: string; date: string }>>([]);

  const handleSend = () => {
    if (!letter.trim()) return;
    const newLetter = {
      name: name || 'Anonymous',
      letter: letter.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setSavedLetters(prev => [newLetter, ...prev]);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setLetter('');
      setName('');
    }, 3000);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-rose-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-rose-100/40 rounded-full blur-2xl" />

      <div className="max-w-2xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm mb-4">
            <PenTool className="w-4 h-4" />
            <span>Write Back</span>
          </div>
          <h3
            className="text-3xl md:text-4xl text-rose-900 mb-3"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Write Me a Love Letter
          </h3>
          <p className="text-rose-500/70 text-sm">
            I'd love to hear what's in your heart too
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-rose-100">
          {!sent ? (
            <>
              <div className="mb-4">
                <label className="text-sm text-rose-400 mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your beautiful name..."
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-700 placeholder:text-rose-300"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-rose-400 mb-1.5 block">Your Love Letter</label>
                <textarea
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  placeholder="Dear love, I want you to know..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-700 placeholder:text-rose-300 resize-none"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem', lineHeight: '1.8' }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-300">{letter.length} characters of love</span>
                <button
                  onClick={handleSend}
                  disabled={!letter.trim()}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                    letter.trim()
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Send with Love
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8" style={{ animation: 'scaleIn 0.5s ease-out' }}>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4
                className="text-2xl text-rose-700 mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Letter Saved!
              </h4>
              <p className="text-rose-500/70 text-sm">
                Your beautiful words have been saved to our love collection
              </p>
            </div>
          )}
        </div>

        {/* Saved letters */}
        {savedLetters.length > 0 && (
          <div className="mt-8">
            <h4 className="text-sm text-rose-400 mb-4 text-center">Your Love Letters ({savedLetters.length})</h4>
            <div className="space-y-3">
              {savedLetters.map((saved, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-rose-100"
                  style={{ animation: 'fadeInUp 0.3s ease-out' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-rose-600">{saved.name}</span>
                    <span className="text-xs text-rose-300">{saved.date}</span>
                  </div>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.95rem' }}
                  >
                    {saved.letter}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default LoveLetterWriter;
