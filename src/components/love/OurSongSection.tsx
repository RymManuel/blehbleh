import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Heart, SkipForward, SkipBack, AlertCircle, Info } from 'lucide-react';
import { SONG_TITLE, SONG_ARTIST } from './data';
import { useAudio } from './AudioContext';

const OurSongSection: React.FC = () => {
  const audio = useAudio();
  const [showLyrics, setShowLyrics] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(20).fill(3));

  // Animated visualizer bars driven by real playback state
  useEffect(() => {
    if (!audio.isPlaying) {
      setBars(Array(20).fill(3));
      return;
    }
    const interval = setInterval(() => {
      setBars(Array(20).fill(0).map(() => 5 + Math.random() * 45));
    }, 150);
    return () => clearInterval(interval);
  }, [audio.isPlaying]);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const lyrics = [
    { time: 0, text: "Every moment with you feels like a dream" },
    { time: 15, text: "Your eyes shine brighter than the stars" },
    { time: 30, text: "I found my forever in your arms" },
    { time: 45, text: "You're the melody to my heart's song" },
    { time: 60, text: "Dancing through life, hand in hand" },
    { time: 75, text: "Every heartbeat whispers your name" },
    { time: 90, text: "In this beautiful chaos, you're my calm" },
    { time: 105, text: "Love like ours is written in the stars" },
    { time: 120, text: "Through every season, my love grows stronger" },
    { time: 135, text: "You are my today and all of my tomorrows" },
    { time: 150, text: "With you, every day is Valentine's Day" },
    { time: 165, text: "My heart chose you, and it always will" },
    { time: 180, text: "In your smile, I found my home" },
    { time: 195, text: "Forever isn't long enough with you" },
    { time: 210, text: "You're the love story I always dreamed of" },
    { time: 225, text: "And I'd choose you, in every lifetime" },
  ];

  const currentLyric = lyrics.reduce((closest, lyric) => {
    if (lyric.time <= audio.currentTime) return lyric;
    return closest;
  }, lyrics[0]);

  const progressPct = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <section id="song" className="py-16 md:py-24 bg-gradient-to-b from-purple-900 via-rose-900 to-pink-900 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulse ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm mb-4 backdrop-blur-sm">
            <Music className="w-4 h-4" />
            <span>Our Song</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            The Song of Us
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            The melody that plays in my heart whenever I think of you. Press play and let it fill the air.
          </p>
        </div>

        {/* Music Player Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">
          {/* Album art / Visualizer */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 shadow-2xl shadow-rose-500/30 flex items-center justify-center overflow-hidden">
            {/* Spinning disc effect */}
            <div
              className={`absolute inset-4 rounded-full border-4 border-white/10 ${audio.isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '8s' }}
            >
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
            </div>
            {/* Center */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            {/* Glow effect when playing */}
            {audio.isPlaying && (
              <div className="absolute inset-0 rounded-full animate-pulse bg-rose-400/20" />
            )}
          </div>

          {/* Song info */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-1">{SONG_TITLE}</h3>
            <p className="text-white/60">{SONG_ARTIST}</p>
            {audio.isLoaded && !audio.hasError && (
              <p className="text-green-300/60 text-xs mt-1 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Audio loaded &middot; Ready to play
              </p>
            )}
          </div>

          {/* Error message */}
          {audio.hasError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{audio.errorMessage}</span>
            </div>
          )}

          {/* Visualizer bars */}
          <div className="flex items-end justify-center gap-1 h-12 mb-6">
            {bars.map((height, i) => (
              <div
                key={i}
                className="w-1.5 md:w-2 rounded-full bg-gradient-to-t from-rose-400 to-pink-300 transition-all duration-150"
                style={{ height: `${height}%`, minHeight: '3px' }}
              />
            ))}
          </div>

          {/* Progress bar — clickable to seek */}
          <div className="mb-4">
            <div
              className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                audio.seekPercent(Math.max(0, Math.min(1, pct)));
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.touches[0].clientX - rect.left) / rect.width;
                audio.seekPercent(Math.max(0, Math.min(1, pct)));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-200 relative"
                style={{ width: `${progressPct}%` }}
              >
                {/* Thumb dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-white/40">
              <span>{formatTime(audio.currentTime)}</span>
              <span>{formatTime(audio.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => audio.seek(audio.currentTime - 15)}
              className="p-2 text-white/60 hover:text-white transition-colors active:scale-90"
              title="Rewind 15s"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={audio.togglePlay}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              {audio.isPlaying ? (
                <Pause className="w-7 h-7 text-rose-600" />
              ) : (
                <Play className="w-7 h-7 text-rose-600 ml-1" />
              )}
            </button>

            <button
              onClick={() => audio.seek(audio.currentTime + 15)}
              className="p-2 text-white/60 hover:text-white transition-colors active:scale-90"
              title="Forward 15s"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={audio.toggleMute}
              className="text-white/60 hover:text-white transition-colors"
            >
              {audio.isMuted || audio.volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audio.isMuted ? 0 : audio.volume}
              onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
              className="w-28 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
            />
            <span className="text-white/40 text-xs w-8 text-right">{Math.round((audio.isMuted ? 0 : audio.volume) * 100)}%</span>
          </div>

          {/* Lyrics toggle */}
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="w-full py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm"
          >
            {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
          </button>

          {/* Lyrics display */}
          {showLyrics && (
            <div
              className="mt-4 p-4 rounded-xl bg-white/5 max-h-48 overflow-y-auto"
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              {lyrics.map((lyric, i) => (
                <p
                  key={i}
                  className={`py-2 text-center transition-all duration-300 ${
                    currentLyric.time === lyric.time
                      ? 'text-white text-lg scale-105'
                      : lyric.time < audio.currentTime
                      ? 'text-white/30 text-sm'
                      : 'text-white/50 text-sm'
                  }`}
                  style={{
                    fontFamily: currentLyric.time === lyric.time ? "'Dancing Script', cursive" : 'inherit',
                  }}
                >
                  {lyric.text}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Instructions toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            {showInstructions ? 'Hide setup instructions' : 'How to add your own song'}
          </button>

          {showInstructions && (
            <div
              className="mt-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 text-left text-white/70 text-sm border border-white/10 max-w-md mx-auto"
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Music className="w-4 h-4" />
                Replace with "Her" (your song)
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-white/90 font-medium mb-1">Option 1 — Local file (best):</p>
                  <ol className="list-decimal list-inside space-y-1 text-white/60">
                    <li>Place your MP3 in the <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">/public</code> folder</li>
                    <li>Open <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">src/components/love/data.ts</code></li>
                    <li>Change <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">SONG_URL</code> to <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">'/her.mp3'</code></li>
                  </ol>
                </div>
                <div>
                  <p className="text-white/90 font-medium mb-1">Option 2 — External link:</p>
                  <ol className="list-decimal list-inside space-y-1 text-white/60">
                    <li>Upload MP3 to Google Drive, Dropbox, etc.</li>
                    <li>Get the direct download URL</li>
                    <li>Paste it as the <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">SONG_URL</code> value</li>
                  </ol>
                </div>
                <p className="text-white/40 text-xs pt-2 border-t border-white/10">
                  On mobile, browsers require a tap to start audio playback. The mini player at the bottom lets her listen while browsing all sections.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          from { transform: translate(-50%, -50%) scale(0.95); opacity: 0.3; }
          to { transform: translate(-50%, -50%) scale(1.05); opacity: 0.1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default OurSongSection;
