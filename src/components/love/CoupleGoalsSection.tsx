import React, { useState } from 'react';
import { MapPin, Check, Heart } from 'lucide-react';

const GOALS = [
  { text: "Watch the sunrise together", category: "adventure" },
  { text: "Cook a fancy dinner at home", category: "home" },
  { text: "Take a spontaneous road trip", category: "adventure" },
  { text: "Dance in the rain", category: "romance" },
  { text: "Write each other love letters", category: "romance" },
  { text: "Build a blanket fort and watch movies", category: "home" },
  { text: "Visit Paris together", category: "travel" },
  { text: "Learn to dance together", category: "adventure" },
  { text: "Have a picnic under the stars", category: "romance" },
  { text: "Take matching silly photos", category: "fun" },
  { text: "Try a new restaurant every month", category: "food" },
  { text: "Plant a garden together", category: "home" },
  { text: "Watch every sunset for a week", category: "romance" },
  { text: "Go on a hot air balloon ride", category: "adventure" },
  { text: "Create a scrapbook of our memories", category: "romance" },
  { text: "Adopt a pet together", category: "home" },
];

const CATEGORY_COLORS: Record<string, string> = {
  adventure: 'bg-amber-100 text-amber-600',
  home: 'bg-green-100 text-green-600',
  romance: 'bg-rose-100 text-rose-600',
  travel: 'bg-blue-100 text-blue-600',
  fun: 'bg-purple-100 text-purple-600',
  food: 'bg-orange-100 text-orange-600',
};

const CoupleGoalsSection: React.FC = () => {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string>('all');

  const toggleGoal = (index: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const categories = ['all', ...Array.from(new Set(GOALS.map(g => g.category)))];
  const filteredGoals = filter === 'all' ? GOALS : GOALS.filter(g => g.category === filter);

  return (
    <section className="py-16 md:py-20 bg-rose-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>Couple Goals</span>
          </div>
          <h3
            className="text-3xl md:text-4xl text-rose-900 mb-3"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Bucket List
          </h3>
          <p className="text-rose-500/70 text-sm mb-2">
            Things we want to do together. Check off what we've done!
          </p>
          <p className="text-rose-400 text-sm font-medium">
            {completed.size} / {GOALS.length} completed
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                filter === cat
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-rose-50 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredGoals.map((goal, i) => {
            const originalIndex = GOALS.indexOf(goal);
            const isDone = completed.has(originalIndex);
            return (
              <button
                key={originalIndex}
                onClick={() => toggleGoal(originalIndex)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                  isDone
                    ? 'bg-white border-2 border-green-300 shadow-md'
                    : 'bg-white border-2 border-transparent hover:border-rose-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isDone ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${isDone ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {goal.text}
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${CATEGORY_COLORS[goal.category]} flex-shrink-0`}>
                  {goal.category}
                </span>
              </button>
            );
          })}
        </div>

        {completed.size === GOALS.length && (
          <div className="text-center mt-8 p-6 bg-white rounded-2xl shadow-lg" style={{ animation: 'scaleIn 0.5s ease-out' }}>
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto mb-3" />
            <p className="text-rose-700 text-xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
              We did it all! Time to make a new list!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default CoupleGoalsSection;
