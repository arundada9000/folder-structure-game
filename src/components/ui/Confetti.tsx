'use client';

/**
 * CONFETTI
 *
 * Pure CSS confetti burst using randomly positioned/colored particles.
 * No dependencies required — just mount when celebrating.
 */

import { useMemo } from 'react';
import styles from './Confetti.module.css';

const COLORS = ['#00f0ff', '#ff0055', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];
const PARTICLE_COUNT = 60;

export default function Confetti() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 0.8;
      const duration = 2 + Math.random() * 2;
      const size = 4 + Math.random() * 6;
      const rotation = Math.random() * 360;
      const drift = -30 + Math.random() * 60;

      return (
        <span
          key={i}
          className={styles.particle}
          style={{
            '--left': `${left}%`,
            '--delay': `${delay}s`,
            '--duration': `${duration}s`,
            '--size': `${size}px`,
            '--rotation': `${rotation}deg`,
            '--drift': `${drift}px`,
            '--color': color,
          } as React.CSSProperties}
        />
      );
    });
  }, []);

  return <div className={styles.confetti}>{particles}</div>;
}
