import React, { useState, useRef, useCallback } from 'react';
import { Heart, X, Sparkles } from 'lucide-react';

const SECRET_MESSAGES = [
  "You are the most beautiful person I've ever known",
  "I fall in love with you more every single day",
  "You make my heart skip a beat just by being you",
  "I'm so grateful the universe brought us together",
  "Every love song makes me think of you",
  "You're my favorite notification",
  "I love the way you make me feel alive",
  "You're not just my love, you're my best friend",
  "My heart smiles every time I see your face",
  "I'd choose you in every universe, every timeline",
];

const SecretMessages: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const tapTimer = useRef<NodeJS.Timeout | null>(null);

  const showMessage = useCallback(() => {
    const idx = messageIndex % SECRET_MESSAGES.length;
    setMessage(SECRET_MESSAGES[idx]);
    setMessageIndex(prev => prev + 1);
  }, [messageIndex]);

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      showMessage();
    }, 800);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTap = () => {
    setTapCount(prev => prev + 1);
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      if (tapCount >= 1) {
        showMessage();
      }
      setTapCount(0);
    }, 300);
  };

  return (
    <>
      {/* Secret trigger area - floating heart button */}
      <button
        className="fixed bottom-20 left-4 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onClick={handleTap}
        title="Hold or double-tap for a surprise!"
      >
        <Sparkles className="w-5 h-5 text-white" />
      </button>

      {/* Message popup */}
      {message && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setMessage(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'popIn 0.4s ease-out' }}
          >
            <button
              onClick={() => setMessage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-4"
              style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>

            <p className="text-xs text-rose-400 uppercase tracking-widest mb-3">Secret Message</p>

            <p
              className="text-rose-800 text-xl leading-relaxed"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {message}
            </p>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-8 bg-rose-200" />
              <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
              <div className="h-px w-8 bg-rose-200" />
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Keep tapping the sparkle button for more!
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          70% { transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
        }
      `}</style>
    </>
  );
};

export default SecretMessages;
