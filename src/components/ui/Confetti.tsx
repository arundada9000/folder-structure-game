'use client';

import { useMemo, useState } from 'react';
import styles from './Confetti.module.css';

const COLORS = ['#00f0ff', '#ff0055', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];
const PARTICLE_COUNT = 60;

interface ParticleConfig {
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
}

let nextSeed = 0;

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateParticles(seed: number): ParticleConfig[] {
  const rand = seededRandom(seed);
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    color: COLORS[Math.floor(rand() * COLORS.length)],
    left: rand() * 100,
    delay: rand() * 0.8,
    duration: 2 + rand() * 2,
    size: 4 + rand() * 6,
    rotation: rand() * 360,
    drift: -30 + rand() * 60,
  }));
}

export default function Confetti() {
  const particles = useState(() => generateParticles(nextSeed++))[0];

  const rendered = useMemo(() => {
    return particles.map((p, i) => (
      <span
        key={i}
        className={styles.particle}
        style={{
          '--left': `${p.left}%`,
          '--delay': `${p.delay}s`,
          '--duration': `${p.duration}s`,
          '--size': `${p.size}px`,
          '--rotation': `${p.rotation}deg`,
          '--drift': `${p.drift}px`,
          '--color': p.color,
        } as React.CSSProperties}
      />
    ));
  }, [particles]);

  return <div className={styles.confetti}>{rendered}</div>;
}
