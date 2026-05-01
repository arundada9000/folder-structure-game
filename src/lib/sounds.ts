/**
 * SOUND EFFECTS
 *
 * Shared AudioContext singleton and standalone sound functions.
 * Used by both the useAudio hook and components that need direct sound playback.
 */

export let sharedAudioCtx: AudioContext | null = null;

export function getSharedAudioContext(): AudioContext | null {
  if (!sharedAudioCtx) {
    try {
      sharedAudioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return sharedAudioCtx;
}

export function playWinSound() {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99];
    const noteLength = 0.15;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, now + i * noteLength);
      gain.gain.linearRampToValueAtTime(0.3, now + i * noteLength + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * noteLength + noteLength + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * noteLength);
      osc.stop(now + i * noteLength + noteLength + 0.3);
    });

    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = 'triangle';
    sparkle.frequency.value = 1046.5;
    sparkleGain.gain.setValueAtTime(0, now + notes.length * noteLength);
    sparkleGain.gain.linearRampToValueAtTime(0.2, now + notes.length * noteLength + 0.02);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + notes.length * noteLength + 0.6);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    sparkle.start(now + notes.length * noteLength);
    sparkle.stop(now + notes.length * noteLength + 0.7);
  } catch {
    /* Audio not available — fail silently */
  }
}

export function playLoseSound() {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.5);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  } catch {
    /* Audio not available — fail silently */
  }
}
