'use client';

/**
 * HUD (Heads-Up Display)
 *
 * Top bar showing level info, move counter, target folder, and controls.
 */

import { Target, Footprints, RotateCcw, ArrowLeft, Lock, Eye, TreePine, Code2, Undo2, Lightbulb, Volume2, VolumeX } from 'lucide-react';
import AvatarPicker from './AvatarPicker';
import styles from './HUD.module.css';

interface HUDProps {
  levelName: string;
  levelId: number;
  targetPath: string;
  moveCount: number;
  maxMoves: number | null;
  allowAbsolute: boolean;
  hiddenMode: boolean;
  viewMode: 'tree' | 'code';
  canUndo: boolean;
  muted: boolean;
  onToggleView: () => void;
  onReset: () => void;
  onBack: () => void;
  onUndo: () => void;
  onHint: () => void;
  onToggleMute: () => void;
}

export default function HUD({
  levelName,
  levelId,
  targetPath,
  moveCount,
  maxMoves,
  allowAbsolute,
  hiddenMode,
  viewMode,
  canUndo,
  muted,
  onToggleView,
  onReset,
  onBack,
  onUndo,
  onHint,
  onToggleMute,
}: HUDProps) {
  const movesRemaining = maxMoves !== null ? maxMoves - moveCount : null;
  const isLowMoves = movesRemaining !== null && movesRemaining <= 2;

  return (
    <div className={styles.hud}>
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={onBack} aria-label="Back to home" title="Back to home">
          <ArrowLeft size={16} /> Home
        </button>
        <div className={styles.levelInfo}>
          <span className={styles.levelBadge}>Level {levelId}</span>
          <span className={styles.levelName}>{levelName}</span>
        </div>
      </div>

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

      <div className={styles.right}>
        <div className={`${styles.moveStat} ${isLowMoves ? styles.moveStatLow : ''}`}>
          <Footprints size={14} />
          <span>
            {moveCount}
            {maxMoves !== null && ` / ${maxMoves}`}
          </span>
        </div>
        <button
          className={`${styles.iconBtn} ${!canUndo ? styles.iconBtnDisabled : ''}`}
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo last move"
          title="Undo last move"
        >
          <Undo2 size={16} />
        </button>
        <button className={styles.iconBtn} onClick={onHint} aria-label="Get a hint" title="Get a hint">
          <Lightbulb size={16} />
        </button>
        <button className={styles.iconBtn} onClick={onToggleMute} aria-label={muted ? 'Unmute sounds' : 'Mute sounds'} title={muted ? 'Unmute sounds' : 'Mute sounds'}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <AvatarPicker />
        <button className={styles.iconBtn} onClick={onToggleView} aria-label="Toggle view" title={viewMode === 'tree' ? 'Switch to Code View' : 'Switch to Tree View'}>
          {viewMode === 'tree' ? <Code2 size={16} /> : <TreePine size={16} />}
        </button>
        <button className={styles.iconBtn} onClick={onReset} aria-label="Reset level" title="Reset level">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
