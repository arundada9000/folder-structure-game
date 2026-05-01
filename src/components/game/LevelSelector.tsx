'use client';

/**
 * LEVEL SELECTOR
 *
 * Card-based level selection with difficulty indicators, progress tracking,
 * and custom level upload.
 */

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, Gauge, Eye, Shuffle, Upload, TerminalSquare, CheckCircle2, Star } from 'lucide-react';
import type { LevelConfig, LevelProgress } from '@/types';
import styles from './LevelSelector.module.css';

interface LevelSelectorProps {
  levels: LevelConfig[];
  onSelect: (level: LevelConfig) => void;
  onCustom: () => void;
  onGenerate: () => void;
  getProgress: (levelId: number) => LevelProgress | undefined;
  isCompleted: (levelId: number) => boolean;
}

const DIFFICULTY_COLORS: Record<number, string> = {
  1: 'var(--color-success)',
  2: 'var(--color-info)',
  3: 'var(--color-warning)',
  4: 'var(--color-accent)',
  5: 'var(--color-error)',
};

interface TiltCardProps {
  children: React.ReactNode;
  onClick: () => void;
  delay: number;
  accentColor: string;
  className?: string;
}

function TiltCard({ children, onClick, delay, accentColor, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`${styles.card} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      whileTap={{ scale: 0.95 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        '--card-accent': accentColor,
      } as React.CSSProperties}
    >
      <div className={styles.cardInner} style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </motion.button>
  );
}

function StarsDisplay({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className={styles.starsRow}>
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= count ? styles.starFilled : styles.starEmpty}
          fill={star <= count ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

export default function LevelSelector({ levels, onSelect, onCustom, onGenerate, getProgress, isCompleted }: LevelSelectorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Select a Mission</h2>
        <p className={styles.subtitle}>Navigate the file tree to reach the target folder</p>
      </div>

      <div className={styles.grid}>
        {levels.map((level, idx) => {
          const progress = getProgress(level.id);
          const completed = isCompleted(level.id);

          return (
            <TiltCard
              key={level.id}
              onClick={() => onSelect(level)}
              delay={idx * 0.1}
              accentColor={DIFFICULTY_COLORS[level.id] || 'var(--color-primary)'}
              className={completed ? styles.cardCompleted : ''}
            >
              {completed && (
                <div className={styles.completedBadge}>
                  <CheckCircle2 size={14} />
                </div>
              )}

              <div className={styles.cardHeader}>
                <span className={styles.levelNum}>Mission {level.id}</span>
                <div className={styles.difficultyDots}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.dot} ${i < level.id ? styles.dotActive : ''}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{level.name}</h3>
              <p className={styles.cardDesc}>{level.description}</p>

              <div className={styles.cardTags}>
                {!level.allowAbsolute && (
                  <span className={styles.tag}>
                    <Lock size={10} /> Relative Only
                  </span>
                )}
                {level.hiddenMode && (
                  <span className={styles.tag}>
                    <Eye size={10} /> Hidden
                  </span>
                )}
                {level.maxMoves !== null && (
                  <span className={styles.tag}>
                    <Gauge size={10} /> {level.maxMoves} moves
                  </span>
                )}
              </div>

              {progress && progress.bestMoveCount < 999999 && (
                <div className={styles.progressRow}>
                  <span className={styles.bestScore}>
                    Best: {progress.bestMoveCount} moves
                  </span>
                  <StarsDisplay count={progress.bestStars} />
                </div>
              )}

              <div className={styles.playIcon}>
                <TerminalSquare size={16} />
              </div>
            </TiltCard>
          );
        })}

        <TiltCard
          className={styles.cardSpecial}
          onClick={onCustom}
          delay={levels.length * 0.1}
          accentColor="var(--color-info)"
        >
          <Upload size={24} className={styles.specialIcon} />
          <h3 className={styles.cardTitle}>Upload Custom</h3>
          <p className={styles.cardDesc}>Import your own folder structure as JSON</p>
        </TiltCard>

        <TiltCard
          className={styles.cardSpecial}
          onClick={onGenerate}
          delay={(levels.length + 1) * 0.1}
          accentColor="var(--color-secondary)"
        >
          <Shuffle size={24} className={styles.specialIcon} />
          <h3 className={styles.cardTitle}>Random Challenge</h3>
          <p className={styles.cardDesc}>Generate a randomized tree to test your skills</p>
        </TiltCard>
      </div>
    </div>
  );
}
