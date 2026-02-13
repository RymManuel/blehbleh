import React, { useState } from 'react';
import { Gamepad2, Heart, ArrowRight, RotateCcw, Trophy, Star } from 'lucide-react';
import { QUIZ_QUESTIONS } from './data';

const LoveQuizSection: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFinished(false);
    setAnswers([]);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === QUIZ_QUESTIONS[currentQuestion].answer;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, index]);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getResultMessage = () => {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    if (percentage === 100) return { title: 'Perfect Score!', message: 'You know our love story by heart!', stars: 5 };
    if (percentage >= 80) return { title: 'Amazing!', message: 'You really know us so well!', stars: 4 };
    if (percentage >= 60) return { title: 'Great Job!', message: 'Our love story is in your heart!', stars: 3 };
    if (percentage >= 40) return { title: 'Not Bad!', message: 'There\'s more to discover about us!', stars: 2 };
    return { title: 'Keep Trying!', message: 'Let\'s make more memories together!', stars: 1 };
  };

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-pink-50 to-purple-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm mb-4">
            <Gamepad2 className="w-4 h-4" />
            <span>Love Quiz</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            How Well Do You Know Us?
          </h2>
          <p className="text-rose-600/70 max-w-md mx-auto">
            Take this fun quiz about our relationship!
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {!started && (
            <div className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Play?</h3>
              <p className="text-gray-500 mb-8">
                {QUIZ_QUESTIONS.length} questions about our love story. Let's see how well you know us!
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Start Quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {started && !finished && (
            <div className="p-6 md:p-8">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-rose-500 font-medium">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-sm text-purple-500 font-medium">
                  Score: {score}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3
                className="text-xl md:text-2xl text-gray-800 mb-6 text-center"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem' }}
              >
                {question.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.answer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                        showCorrect
                          ? 'border-green-400 bg-green-50 text-green-700 scale-105'
                          : showWrong
                          ? 'border-red-300 bg-red-50 text-red-600'
                          : isSelected
                          ? 'border-purple-400 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
                      } ${!showResult ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            showCorrect
                              ? 'bg-green-400 text-white'
                              : showWrong
                              ? 'bg-red-400 text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Result feedback */}
              {showResult && (
                <div className="mt-6 text-center" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <p className={`text-lg font-medium mb-4 ${
                    selectedAnswer === question.answer ? 'text-green-600' : 'text-rose-500'
                  }`}>
                    {selectedAnswer === question.answer
                      ? 'You know it! '
                      : 'Not quite, but that\'s okay! '}
                    <Heart className={`w-4 h-4 inline ${
                      selectedAnswer === question.answer ? 'text-green-500 fill-green-500' : 'text-rose-400 fill-rose-400'
                    }`} />
                  </p>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {currentQuestion + 1 >= QUIZ_QUESTIONS.length ? 'See Results' : 'Next Question'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {finished && (
            <div className="p-8 md:p-12 text-center" style={{ animation: 'scaleIn 0.5s ease-out' }}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {getResultMessage().title}
              </h3>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 transition-all ${
                      i < getResultMessage().stars
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200'
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              <p className="text-gray-500 mb-2">{getResultMessage().message}</p>
              <p className="text-2xl font-bold text-rose-500 mb-6">
                {score} / {QUIZ_QUESTIONS.length}
              </p>

              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default LoveQuizSection;
