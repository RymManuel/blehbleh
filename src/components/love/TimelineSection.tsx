import React, { useState } from 'react';
import { Smile, Zap, Music, Sparkles, Heart, Laugh, Moon, Sun } from 'lucide-react';

const TimelineSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const funFacts = [
    {
      icon: Smile,
      title: "Your Smile",
      description: "Makes my heart skip a beat every single time. That smile could light up the darkest day.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Heart,
      title: "My Favorite Person",
      description: "You're not just my favorite person, you're my person. My best friend, my love, my home.",
      color: "from-rose-400 to-pink-500"
    },
    {
      icon: Music,
      title: "Your Laugh",
      description: "I could listen to your laugh forever. It's the most beautiful sound in the world to me.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "The Little Things",
      description: "The way you look at me, your random texts, how you hold my hand... every moment matters.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Zap,
      title: "Your Energy",
      description: "You bring so much joy and life into everything you do. You inspire me every single day.",
      color: "from-amber-400 to-yellow-500"
    },
    {
      icon: Laugh,
      title: "The Inside Jokes",
      description: "Our inside jokes, our silly moments together... they're some of my favorite memories.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Sun,
      title: "Bright Future",
      description: "I see an amazing future with you. Every day with you is a gift I never want to lose.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Moon,
      title: "Late Night Talks",
      description: "Those 3am conversations with you... where we talk about everything and nothing. Pure magic.",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="timeline" className="py-16 md:py-24 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/20 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm mb-4">
            <Heart className="w-4 h-4" />
            <span>Why I Love You</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Things I Adore About You
          </h2>
          <p className="text-rose-600/70 max-w-2xl mx-auto text-lg">
            Just a few of the countless reasons why you make me the happiest person alive
          </p>
        </div>

        {/* Fun Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {funFacts.map((fact, index) => {
            const Icon = fact.icon;
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                onClick={() => setActiveCard(isActive ? null : index)}
                className={`relative group cursor-pointer transition-all duration-300 transform ${
                  isActive ? 'md:col-span-2 md:row-span-2 lg:col-span-2' : ''
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  className={`h-full rounded-3xl p-6 transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${fact.color} shadow-2xl`
                      : `bg-white shadow-lg hover:shadow-xl border border-rose-100`
                  }`}
                >
                  <div
                    className={`flex flex-col h-full transition-all duration-300 ${
                      isActive ? 'text-white' : ''
                    }`}
                  >
                    <div className="mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-white/30 text-white scale-110'
                            : `bg-gradient-to-br ${fact.color} text-white`
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-2 transition-all ${
                        isActive ? 'text-white' : 'text-rose-900'
                      }`}
                    >
                      {fact.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed transition-all ${
                        isActive
                          ? 'text-white/95 flex-grow'
                          : 'text-rose-600/70 line-clamp-2 group-hover:line-clamp-none'
                      }`}
                      style={isActive ? { fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem' } : {}}
                    >
                      {fact.description}
                    </p>

                    {isActive && (
                      <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-white/80" />
                          <span className="text-sm text-white/80">Click to collapse</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-1">
            <div className="bg-white rounded-3xl px-8 py-6">
              <p
                className="text-rose-700 text-lg"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                And most importantly... you make me believe in forever. 💕
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;
