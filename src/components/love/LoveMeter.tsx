import React, { useState, useEffect } from 'react';
import { Heart, Zap } from 'lucide-react';

const LoveMeter: React.FC = () => {
  const [measuring, setMeasuring] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    if (!isHolding) return;
    const interval = setInterval(() => {
      setHoldTime(prev => {
        if (prev >= 100) {
          setIsHolding(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isHolding]);

  useEffect(() => {
    if (holdTime >= 100 && !showResult) {
      setMeasuring(true);
      // Animate to final percentage
      let current = 0;
      const target = 95 + Math.floor(Math.random() * 6); // Always 95-100%
      const interval = setInterval(() => {
        current += 2;
        if (current >= target) {
          current = target;
          clearInterval(interval);
          setMeasuring(false);
          setShowResult(true);
        }
        setPercentage(current);
      }, 30);
    }
  }, [holdTime]);

  const reset = () => {
    setHoldTime(0);
    setPercentage(0);
    setShowResult(false);
    setMeasuring(false);
  };

  const getMessage = () => {
    if (percentage >= 99) return "You two are SOULMATES! Written in the stars!";
    if (percentage >= 97) return "Your love is legendary! Nothing can break this bond!";
    if (percentage >= 95) return "Off the charts! This love is one in a billion!";
    return "Your love is absolutely incredible!";
  };

  return (
    <div className="py-12 md:py-16 bg-gradient-to-b from-white to-rose-50 relative">
      <div className="max-w-md mx-auto px-4 md:px-6 text-center">
        <h3
          className="text-3xl md:text-4xl text-rose-900 mb-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Love Meter
        </h3>
        <p className="text-rose-500/70 text-sm mb-8">
          Hold the heart to measure our love!
        </p>

        {/* Meter circle */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="#fce7f3"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#loveGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showResult ? (
              <>
                <span className="text-4xl font-bold text-rose-600">{percentage}%</span>
                <span className="text-xs text-rose-400">Love Level</span>
              </>
            ) : measuring ? (
              <Zap className="w-10 h-10 text-rose-500 animate-pulse" />
            ) : (
              <>
                <Heart className="w-10 h-10 text-rose-300" />
                <span className="text-xs text-rose-300 mt-1">Hold below</span>
              </>
            )}
          </div>
        </div>

        {/* Hold button */}
        {!showResult && (
          <div className="relative">
            <button
              onMouseDown={() => { setIsHolding(true); reset(); }}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
              onTouchStart={() => { setIsHolding(true); reset(); }}
              onTouchEnd={() => setIsHolding(false)}
              className={`relative w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                isHolding
                  ? 'bg-rose-500 scale-110 shadow-xl shadow-rose-500/40'
                  : 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg hover:scale-105'
              }`}
            >
              <Heart className={`w-8 h-8 text-white ${isHolding ? 'fill-white animate-pulse' : ''}`} />
              {/* Progress ring */}
              {isHolding && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40" cy="40" r="38"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - holdTime / 100)}`}
                    opacity="0.5"
                  />
                </svg>
              )}
            </button>
            <p className="text-xs text-rose-300 mt-3">
              {isHolding ? 'Keep holding...' : 'Press and hold'}
            </p>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <p
              className="text-rose-600 text-lg mb-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {getMessage()}
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 rounded-full bg-rose-100 text-rose-500 text-sm hover:bg-rose-200 transition-all"
            >
              Measure Again
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoveMeter;
