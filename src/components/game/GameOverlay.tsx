'use client';

/**
 * GAME OVERLAY
 *
 * Full-screen overlay for win/loss states with animations.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, XCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import type { GameStatus } from '@/types';
import styles from './GameOverlay.module.css';

interface GameOverlayProps {
  status: GameStatus;
  moveCount: number;
  onRestart: () => void;
  onNextLevel: () => void;
  onBack: () => void;
  hasNextLevel: boolean;
}

export default function GameOverlay({
  status,
  moveCount,
  onRestart,
  onNextLevel,
  onBack,
  hasNextLevel,
}: GameOverlayProps) {
  const isVisible = status === 'won' || status === 'lost';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.card}
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {status === 'won' ? (
              <>
                <motion.div
                  className={styles.iconWin}
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Trophy size={48} />
                </motion.div>
                <h2 className={styles.titleWin}>Destination Reached!</h2>
                <p className={styles.subtitle}>
                  Completed in <strong>{moveCount}</strong> move{moveCount !== 1 ? 's' : ''}
                </p>
              </>
            ) : (
              <>
                <motion.div
                  className={styles.iconLose}
                  initial={{ rotate: 20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <XCircle size={48} />
                </motion.div>
                <h2 className={styles.titleLose}>Out of Moves</h2>
                <p className={styles.subtitle}>
                  You ran out of moves. Try a different path.
                </p>
              </>
            )}

            <div className={styles.actions}>
              <button className={styles.btnSecondary} onClick={onBack}>
                <ArrowLeft size={14} /> Home
              </button>
              <button className={styles.btnSecondary} onClick={onRestart}>
                <RotateCcw size={14} /> Retry
              </button>
              {status === 'won' && hasNextLevel && (
                <button className={styles.btnPrimary} onClick={onNextLevel}>
                  Next Level <ArrowRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
