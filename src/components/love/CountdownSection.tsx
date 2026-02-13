import React, { useState, useEffect } from 'react';
import { Heart, Clock } from 'lucide-react';
import { ANNIVERSARY_DATE } from './data';

const CountdownSection: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const start = new Date(ANNIVERSARY_DATE);
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeElapsed.years },
    { label: 'Months', value: timeElapsed.months },
    { label: 'Days', value: timeElapsed.days },
    { label: 'Hours', value: timeElapsed.hours },
    { label: 'Minutes', value: timeElapsed.minutes },
    { label: 'Seconds', value: timeElapsed.seconds },
  ];

  return (
    <div className="py-12 md:py-16 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 relative overflow-hidden">
      {/* Animated hearts background */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-white/5 fill-white/5"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatGentle ${4 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm mb-4 backdrop-blur-sm">
          <Clock className="w-4 h-4" />
          <span>Time Together</span>
        </div>

        <h3
          className="text-3xl md:text-4xl text-white mb-8"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          We've Been in Love For
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {timeUnits.map((unit, i) => (
            <div
              key={unit.label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 md:p-4"
              style={{
                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-white/70 text-xs md:text-sm">{unit.label}</div>
            </div>
          ))}
        </div>

        <p
          className="text-white/80 mt-8 text-lg"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          ...and counting every beautiful second with you
        </p>
      </div>

      <style>{`
        @keyframes floatGentle {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CountdownSection;
