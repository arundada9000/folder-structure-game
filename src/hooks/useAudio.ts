'use client';

import { useCallback, useRef, useEffect } from 'react';

/**
 * USE AUDIO
 *
 * Simple Web Audio API synthesizer for retro/arcade sound effects.
 * No external assets required.
 */
export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize lazily to respect browser autoplay policies
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol = 0.1) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playStart = useCallback(() => {
    // Ascending chime
    playTone(440, 'sine', 0.1, 0.05);
    setTimeout(() => playTone(554, 'sine', 0.1, 0.05), 100);
    setTimeout(() => playTone(659, 'sine', 0.2, 0.05), 200);
  }, [playTone]);

  const playMove = useCallback(() => {
    // Short blip
    playTone(600, 'square', 0.05, 0.02);
  }, [playTone]);

  const playError = useCallback(() => {
    // Low buzz
    playTone(150, 'sawtooth', 0.2, 0.05);
    setTimeout(() => playTone(140, 'sawtooth', 0.3, 0.05), 100);
  }, [playTone]);

  const playWin = useCallback(() => {
    // Triumphant fanfare
    playTone(523.25, 'triangle', 0.15, 0.08); // C5
    setTimeout(() => playTone(659.25, 'triangle', 0.15, 0.08), 150); // E5
    setTimeout(() => playTone(783.99, 'triangle', 0.15, 0.08), 300); // G5
    setTimeout(() => playTone(1046.50, 'triangle', 0.4, 0.08), 450); // C6
  }, [playTone]);

  return { playStart, playMove, playError, playWin };
}
