'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { getSharedAudioContext } from '@/lib/sounds';

const MUTED_KEY = 'pathpilot-muted';

function getStoredMuted(): boolean {
  try {
    return localStorage.getItem(MUTED_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * USE AUDIO
 *
 * Web Audio API synthesizer for game sound effects.
 * Shares a singleton AudioContext with sounds.ts to avoid duplication.
 * No external assets required.
 */
export function useAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(getStoredMuted);
  const mutedRef = useRef(muted);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTED_KEY, String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol = 0.1) => {
    const ctx = audioCtxRef.current ?? getSharedAudioContext();
    if (!ctx || mutedRef.current) return;

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
    playTone(440, 'sine', 0.1, 0.05);
    setTimeout(() => playTone(554, 'sine', 0.1, 0.05), 100);
    setTimeout(() => playTone(659, 'sine', 0.2, 0.05), 200);
  }, [playTone]);

  const playMove = useCallback(() => {
    playTone(600, 'square', 0.05, 0.02);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(150, 'sawtooth', 0.2, 0.05);
    setTimeout(() => playTone(140, 'sawtooth', 0.3, 0.05), 100);
  }, [playTone]);

  const playWin = useCallback(() => {
    playTone(523.25, 'triangle', 0.15, 0.08);
    setTimeout(() => playTone(659.25, 'triangle', 0.15, 0.08), 150);
    setTimeout(() => playTone(783.99, 'triangle', 0.15, 0.08), 300);
    setTimeout(() => playTone(1046.50, 'triangle', 0.4, 0.08), 450);
  }, [playTone]);

  const playLose = useCallback(() => {
    playTone(400, 'sawtooth', 0.5, 0.12);
  }, [playTone]);

  const playUndo = useCallback(() => {
    playTone(500, 'sine', 0.08, 0.04);
    setTimeout(() => playTone(400, 'sine', 0.1, 0.04), 80);
  }, [playTone]);

  const playHint = useCallback(() => {
    playTone(800, 'sine', 0.1, 0.03);
    setTimeout(() => playTone(1000, 'sine', 0.15, 0.03), 100);
  }, [playTone]);

  return { playStart, playMove, playError, playWin, playLose, playUndo, playHint, muted, toggleMute };
}
