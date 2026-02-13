import React, { useState, useCallback } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, ChevronUp, ChevronDown, Heart, SkipBack, SkipForward } from 'lucide-react';
import WelcomeOverlay from './love/WelcomeOverlay';
import FloatingHearts from './love/FloatingHearts';
import Navigation from './love/Navigation';
import HeroSection from './love/HeroSection';
import CountdownSection from './love/CountdownSection';
import MemoriesSection from './love/MemoriesSection';
import LoveLettersSection from './love/LoveLettersSection';
import WhyILoveYouSection from './love/WhyILoveYouSection';
import TimelineSection from './love/TimelineSection';
import LoveJarSection from './love/LoveJarSection';
import PromiseSection from './love/PromiseSection';
import LoveQuizSection from './love/LoveQuizSection';
import LoveMeter from './love/LoveMeter';
import OurSongSection from './love/OurSongSection';
import LoveLetterWriter from './love/LoveLetterWriter';
import CoupleGoalsSection from './love/CoupleGoalsSection';
import SecretMessages from './love/SecretMessages';
import Footer from './love/Footer';
import { AudioProvider, useAudio } from './love/AudioContext';
import { SONG_TITLE, SONG_ARTIST } from './love/data';

/* ─── Floating Mini Music Player ─── */
const MiniMusicPlayer: React.FC = () => {
  const audio = useAudio();
  const [expanded, setExpanded] = useState(false);

  const formatTime = (s: number) => {
    if (!isFinite(s) || s < 0) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  const pct = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40" style={{ pointerEvents: 'none' }}>
      <div
        className="mx-auto max-w-lg px-3 pb-3"
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-rose-500/10 border border-rose-200/50 overflow-hidden transition-all duration-300 ${
            expanded ? 'pb-4' : ''
          }`}
        >
          {/* Thin progress bar on top */}
          <div className="h-1 bg-rose-100 w-full">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Main compact row */}
          <div className="flex items-center gap-3 px-4 py-2.5">
            {/* Album icon */}
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md ${
                audio.isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>

            {/* Song info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{SONG_TITLE}</p>
              <p className="text-xs text-gray-400 truncate">{SONG_ARTIST}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={audio.togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                {audio.isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setExpanded(!expanded)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
              >
                {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expanded controls */}
          {expanded && (
            <div className="px-4 space-y-3" style={{ animation: 'miniSlideUp 0.25s ease-out' }}>
              {/* Seek bar */}
              <div>
                <div
                  className="h-2 bg-gray-100 rounded-full overflow-hidden cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    audio.seekPercent(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
                  }}
                  onTouchStart={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    audio.seekPercent(Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width)));
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full relative transition-all duration-200"
                    style={{ width: `${pct}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow border border-rose-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>{formatTime(audio.currentTime)}</span>
                  <span>{formatTime(audio.duration)}</span>
                </div>
              </div>

              {/* Playback controls row */}
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={() => audio.seek(audio.currentTime - 15)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors active:scale-90"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={audio.togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {audio.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={() => audio.seek(audio.currentTime + 15)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors active:scale-90"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button onClick={audio.toggleMute} className="text-gray-400 hover:text-rose-500 transition-colors">
                  {audio.isMuted || audio.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={audio.isMuted ? 0 : audio.volume}
                  onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:shadow-md"
                />
                <span className="text-[10px] text-gray-400 w-7 text-right">{Math.round((audio.isMuted ? 0 : audio.volume) * 100)}%</span>
              </div>

              {/* Status */}
              {audio.hasError && (
                <p className="text-xs text-red-400 text-center">{audio.errorMessage}</p>
              )}
              {!audio.hasError && !audio.isLoaded && (
                <p className="text-xs text-gray-400 text-center">Loading audio...</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes miniSlideUp {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 200px; }
        }
      `}</style>
    </div>
  );
};

/* ─── Main Layout ─── */
const AppContent: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const scrollToMemories = useCallback(() => {
    const el = document.getElementById('memories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 overflow-x-hidden">
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fff1f2; }
        ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #fb7185; }
        ::selection { background: #fda4af; color: #881337; }
      `}</style>

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay onEnter={handleEnter} />}

      {/* Floating Hearts */}
      {!showWelcome && <FloatingHearts />}

      {/* Navigation */}
      {!showWelcome && <Navigation />}

      {/* Secret Messages Button */}
      {!showWelcome && <SecretMessages />}

      {/* Floating Mini Music Player — persists across all sections */}
      {!showWelcome && <MiniMusicPlayer />}

      {/* Main Content */}
      {!showWelcome && (
        <main className="pb-20">
          <HeroSection onScrollDown={scrollToMemories} />
          <CountdownSection />
          <MemoriesSection />
          <LoveJarSection />
          <LoveLettersSection />
          <WhyILoveYouSection />
          <LoveMeter />
          <TimelineSection />
          <PromiseSection />
          <LoveQuizSection />
          <CoupleGoalsSection />
          <LoveLetterWriter />
          <OurSongSection />
          <Footer />
        </main>
      )}
    </div>
  );
};

/* ─── Root with AudioProvider ─── */
const AppLayout: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};

export default AppLayout;
