'use client';

/**
 * GAME OVERLAY
 *
 * Full-screen overlay for win/loss states with:
 * - Confetti burst on win
 * - Celebratory sound effects
 * - Avatar popping up and celebrating
 * - Glassmorphism modal
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, XCircle, RotateCcw, ArrowRight, ArrowLeft, Bot, Ghost, Rocket, UserCircle2, Star, Sparkles } from 'lucide-react';
import type { GameStatus } from '@/types';
import { useAvatar } from '@/hooks/useAvatar';
import { playWinSound, playLoseSound } from '@/lib/sounds';
import Confetti from '@/components/ui/Confetti';
import styles from './GameOverlay.module.css';

interface GameOverlayProps {
  status: GameStatus;
  moveCount: number;
  onRestart: () => void;
  onNextLevel: () => void;
  onBack: () => void;
  hasNextLevel: boolean;
  bestScore?: number;
}

function AvatarIcon({ avatar, size }: { avatar: string; size: number }) {
  if (avatar === 'bot') return <Bot size={size} />;
  if (avatar === 'ghost') return <Ghost size={size} />;
  if (avatar === 'rocket') return <Rocket size={size} />;
  if (avatar.startsWith('data:image')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatar} alt="Avatar" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  }
  return <UserCircle2 size={size} />;
}

export default function GameOverlay({
  status,
  moveCount,
  onRestart,
  onNextLevel,
  onBack,
  hasNextLevel,
  bestScore,
}: GameOverlayProps) {
  const isVisible = status === 'won' || status === 'lost';
  const { avatar } = useAvatar();
  const soundPlayed = useRef(false);

  // Play sound when status changes
  useEffect(() => {
    if (status === 'won' && !soundPlayed.current) {
      soundPlayed.current = true;
      playWinSound();
    } else if (status === 'lost' && !soundPlayed.current) {
      soundPlayed.current = true;
      playLoseSound();
    } else if (status === 'playing') {
      soundPlayed.current = false;
    }
  }, [status]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti on win only */}
          {status === 'won' && <Confetti />}

          <motion.div
            className={styles.card}
            initial={{ scale: 0.6, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
          >
            {status === 'won' ? (
              <>
                {/* Celebrating avatar */}
                <div className={styles.avatarSection}>
                  {/* Sparkle ring */}
                  <motion.div
                    className={styles.sparkleRing}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
                  >
                    <Sparkles size={16} className={styles.sparkle1} />
                    <Star size={12} className={styles.sparkle2} />
                    <Sparkles size={14} className={styles.sparkle3} />
                    <Star size={10} className={styles.sparkle4} />
                  </motion.div>

                  {/* Avatar bouncing */}
                  <motion.div
                    className={styles.avatarWin}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <AvatarIcon avatar={avatar} size={48} />
                  </motion.div>
                </div>

                {/* Trophy */}
                <motion.div
                  className={styles.iconWin}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Trophy size={28} />
                </motion.div>

                <motion.h2
                  className={styles.titleWin}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Mission Complete!
                </motion.h2>

                <motion.p
                  className={styles.subtitle}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Navigated in <strong>{moveCount}</strong> move{moveCount !== 1 ? 's' : ''}
                  {bestScore !== undefined && moveCount <= bestScore && (
                    <span className={styles.newBest}> New Best!</span>
                  )}
                </motion.p>

                {/* Stars rating based on moves */}
                <motion.div
                  className={styles.stars}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
                >
                  {[1, 2, 3].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + star * 0.12, type: 'spring', stiffness: 300 }}
                    >
                      <Star
                        size={24}
                        className={moveCount <= star + 1 ? styles.starFilled : styles.starEmpty}
                        fill={moveCount <= star + 1 ? 'currentColor' : 'none'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <>
                {/* Loss avatar */}
                <motion.div
                  className={styles.avatarLose}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <AvatarIcon avatar={avatar} size={40} />
                </motion.div>

                <motion.div
                  className={styles.iconLose}
                  initial={{ rotate: 20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <XCircle size={36} />
                </motion.div>

                <h2 className={styles.titleLose}>Out of Moves</h2>
                <p className={styles.subtitle}>
                  You ran out of moves. Try a different route.
                </p>
              </>
            )}

            <motion.div
              className={styles.actions}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <button className={styles.btnSecondary} onClick={onBack}>
                <ArrowLeft size={14} /> Home
              </button>
              <button className={styles.btnSecondary} onClick={onRestart}>
                <RotateCcw size={14} /> Retry
              </button>
              {status === 'won' && hasNextLevel && (
                <button className={styles.btnPrimary} onClick={onNextLevel}>
                  Next Mission <ArrowRight size={14} />
                </button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
