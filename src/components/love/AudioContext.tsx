import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { SONG_URL } from './data';

interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLoaded: boolean;
  hasError: boolean;
  errorMessage: string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  seek: (time: number) => void;
  seekPercent: (pct: number) => void;
}

const AudioCtx = createContext<AudioState>({
  isPlaying: false,
  isMuted: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  isLoaded: false,
  hasError: false,
  errorMessage: '',
  play: () => {},
  pause: () => {},
  togglePlay: () => {},
  toggleMute: () => {},
  setVolume: () => {},
  seek: () => {},
  seekPercent: () => {},
});

export const useAudio = () => useContext(AudioCtx);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.7;
    audio.src = SONG_URL;
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
      setHasError(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
      const code = audio.error?.code;
      if (code === 1) setErrorMessage('Audio playback was aborted.');
      else if (code === 2) setErrorMessage('A network error occurred while loading the audio.');
      else if (code === 3) setErrorMessage('Audio decoding failed. The file may be corrupted.');
      else if (code === 4) setErrorMessage('Audio file not found or format not supported.');
      else setErrorMessage('Could not load audio. Check the file URL in data.ts.');
    };

    const onCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const promise = audio.play();
    if (promise) {
      promise.then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch((err) => {
        console.warn('Audio play failed:', err.message);
        setHasError(true);
        setErrorMessage('Tap the play button to start music (browser requires user interaction).');
      });
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    setVolumeState(v);
    if (v > 0 && isMuted) {
      audio.muted = false;
      setIsMuted(false);
    }
  }, [isMuted]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(time)) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
  }, []);

  const seekPercent = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const d = audio.duration;
    if (d && isFinite(d)) {
      audio.currentTime = pct * d;
    }
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        isLoaded,
        hasError,
        errorMessage,
        play,
        pause,
        togglePlay,
        toggleMute,
        setVolume,
        seek,
        seekPercent,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
};
