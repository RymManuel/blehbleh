import React, { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

const LOVE_NOTES = [
  "I love the way your eyes light up when you smile",
  "You make every ordinary day feel extraordinary",
  "My favorite place in the world is next to you",
  "You're the reason I believe in magic",
  "I love you more than all the stars in the sky",
  "Being with you feels like coming home",
  "You're the best thing that ever happened to me",
  "I can't imagine my life without you in it",
  "Your laugh is my favorite sound in the world",
  "I love how you make me feel so safe and loved",
  "Every moment with you is a moment I treasure",
  "You're my person, my forever, my everything",
  "I love the little things about you the most",
  "You make my heart feel so full",
  "I'm so lucky to call you mine",
  "You're the missing piece I never knew I needed",
  "I love you to the moon and back, infinity times",
  "You're the first thing I want to see every morning",
  "My heart beats for you and only you",
  "Thank you for loving me the way you do",
];

const LoveJarSection: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pickedNotes, setPickedNotes] = useState<Set<number>>(new Set());

  const pickNote = () => {
    setIsAnimating(true);
    setCurrentNote(null);

    // Find unpicked notes
    const available = LOVE_NOTES.map((_, i) => i).filter(i => !pickedNotes.has(i));
    const pool = available.length > 0 ? available : LOVE_NOTES.map((_, i) => i);

    // If all picked, reset
    if (available.length === 0) {
      setPickedNotes(new Set());
    }

    setTimeout(() => {
      const randomIndex = pool[Math.floor(Math.random() * pool.length)];
      setCurrentNote(LOVE_NOTES[randomIndex]);
      setPickedNotes(prev => new Set(prev).add(randomIndex));
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl" />

      <div className="max-w-lg mx-auto px-4 md:px-6 relative z-10 text-center">
        <h3
          className="text-3xl md:text-4xl text-rose-900 mb-3"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Love Note Jar
        </h3>
        <p className="text-rose-500/70 text-sm mb-8">
          Pick a note from our love jar! ({pickedNotes.size}/{LOVE_NOTES.length} picked)
        </p>

        {/* Jar visual */}
        <div className="relative w-48 h-56 mx-auto mb-8">
          {/* Jar body */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-48 bg-gradient-to-b from-rose-100/60 to-rose-200/40 rounded-b-3xl rounded-t-lg border-2 border-rose-200/50 overflow-hidden">
            {/* Hearts inside jar */}
            {Array.from({ length: Math.max(0, LOVE_NOTES.length - pickedNotes.size) }).map((_, i) => (
              <Heart
                key={i}
                className="absolute text-rose-300 fill-rose-300"
                style={{
                  width: `${12 + Math.random() * 10}px`,
                  height: `${12 + Math.random() * 10}px`,
                  left: `${10 + Math.random() * 70}%`,
                  bottom: `${5 + (i / LOVE_NOTES.length) * 70}%`,
                  opacity: 0.4 + Math.random() * 0.4,
                  transform: `rotate(${Math.random() * 40 - 20}deg)`,
                }}
              />
            ))}
          </div>
          {/* Jar lid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-300 rounded-t-lg border-2 border-rose-400/50" />
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-16 h-4 bg-rose-400 rounded-t-md" />
        </div>

        {/* Pick button */}
        <button
          onClick={pickNote}
          disabled={isAnimating}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium shadow-lg transition-all ${
            isAnimating
              ? 'bg-rose-300 text-white cursor-wait'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {isAnimating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Picking...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Pick a Love Note
            </>
          )}
        </button>

        {/* Note display */}
        {currentNote && !isAnimating && (
          <div
            className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-rose-100 max-w-sm mx-auto"
            style={{ animation: 'noteAppear 0.5s ease-out' }}
          >
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 mx-auto mb-3" />
            <p
              className="text-rose-700 text-lg leading-relaxed"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              "{currentNote}"
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes noteAppear {
          0% { opacity: 0; transform: translateY(20px) rotate(-3deg); }
          60% { transform: translateY(-5px) rotate(1deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default LoveJarSection;
