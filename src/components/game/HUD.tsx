'use client';

/**
 * HUD (Heads-Up Display)
 *
 * Top bar showing level info, move counter, target folder, and controls.
 */

import { motion } from 'framer-motion';
import { Target, Footprints, Map, RotateCcw, ArrowLeft, Lock, Eye } from 'lucide-react';
import styles from './HUD.module.css';

interface HUDProps {
  levelName: string;
  levelId: number;
  currentPath: string;
  targetPath: string;
  moveCount: number;
  maxMoves: number | null;
  allowAbsolute: boolean;
  hiddenMode: boolean;
  onReset: () => void;
  onBack: () => void;
}

export default function HUD({
  levelName,
  levelId,
  currentPath,
  targetPath,
  moveCount,
  maxMoves,
  allowAbsolute,
  hiddenMode,
  onReset,
  onBack,
}: HUDProps) {
  const movesRemaining = maxMoves !== null ? maxMoves - moveCount : null;
  const isLowMoves = movesRemaining !== null && movesRemaining <= 2;

  return (
    <div className={styles.hud}>
      {/* Left: back + level info */}
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={onBack} aria-label="Back to home" title="Back to home">
          <ArrowLeft size={16} /> Home
        </button>
        <div className={styles.levelInfo}>
          <span className={styles.levelBadge}>Level {levelId}</span>
          <span className={styles.levelName}>{levelName}</span>
        </div>
      </div>

      {/* Center: target + constraints */}
      <div className={styles.center}>
        <div className={styles.stat}>
          <Target size={14} className={styles.statIconTarget} />
          <span className={styles.statLabel}>Target:</span>
          <code className={styles.pathCode}>{targetPath}</code>
        </div>

        <div className={styles.badges}>
          {!allowAbsolute && (
            <span className={styles.constraintBadge} title="Absolute paths disabled">
              <Lock size={10} />
              Relative only
            </span>
          )}
          {hiddenMode && (
            <span className={styles.constraintBadge} title="Tree partially hidden">
              <Eye size={10} />
              Fog of War
            </span>
          )}
        </div>
      </div>

      {/* Right: moves + reset */}
      <div className={styles.right}>
        <div className={`${styles.moveStat} ${isLowMoves ? styles.moveStatLow : ''}`}>
          <Footprints size={14} />
          <span>
            {moveCount}
            {maxMoves !== null && ` / ${maxMoves}`}
          </span>
        </div>
        <button className={styles.iconBtn} onClick={onReset} aria-label="Reset level" title="Reset level">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
