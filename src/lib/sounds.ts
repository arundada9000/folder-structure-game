/**
 * SOUND EFFECTS
 *
 * Web Audio API synthesized sounds — no external files needed.
 */

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/** Play a happy ascending chime for level completion */
export function playWinSound() {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Three ascending notes: C5, E5, G5
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

    // Final sparkle chord
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = 'triangle';
    sparkle.frequency.value = 1046.5; // C6
    sparkleGain.gain.setValueAtTime(0, now + notes.length * noteLength);
    sparkleGain.gain.linearRampToValueAtTime(0.2, now + notes.length * noteLength + 0.02);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + notes.length * noteLength + 0.6);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    sparkle.start(now + notes.length * noteLength);
    sparkle.stop(now + notes.length * noteLength + 0.7);
  } catch {
    // Audio not available — fail silently
  }
}

/** Play a sad descending tone for loss */
export function playLoseSound() {
  try {
    const ctx = getCtx();
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
    // Audio not available — fail silently
  }
}
