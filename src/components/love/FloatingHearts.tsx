import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  color: string;
}

const HEART_COLORS = [
  '#ff6b8a', '#ff8fa3', '#ffb3c1', '#ff4d6d', '#c9184a',
  '#ff758f', '#ff85a1', '#fbb1bd', '#f9bec7', '#ff99ac',
];

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const generateHeart = () => {
      const id = Date.now() + Math.random();
      const heart: HeartParticle = {
        id,
        x: Math.random() * 100,
        y: 100 + Math.random() * 10,
        size: 12 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.5,
        duration: 8 + Math.random() * 12,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      };
      setHearts(prev => {
        const filtered = prev.length > 20 ? prev.slice(-15) : prev;
        return [...filtered, heart];
      });
    };

    generateHeart();
    const interval = setInterval(generateHeart, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: var(--start-opacity); }
          25% { transform: translateY(-25vh) translateX(20px) rotate(15deg) scale(1.1); }
          50% { transform: translateY(-50vh) translateX(-15px) rotate(-10deg) scale(0.9); }
          75% { transform: translateY(-75vh) translateX(10px) rotate(20deg) scale(1.05); }
          100% { transform: translateY(-110vh) translateX(-5px) rotate(-5deg) scale(0.8); opacity: 0; }
        }
      `}</style>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            ['--start-opacity' as string]: heart.opacity,
            animation: `floatUp ${heart.duration}s ease-in-out forwards`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: `drop-shadow(0 0 4px ${heart.color}40)` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
