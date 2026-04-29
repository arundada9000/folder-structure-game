'use client';

/**
 * PLAYER
 *
 * Animated robot avatar that moves between folder nodes.
 * Tracks position via DOM queries and animates with Framer Motion.
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Ghost, Rocket, UserCircle2 } from 'lucide-react';
import { useAvatar } from '@/hooks/useAvatar';
import styles from './Player.module.css';

interface PlayerProps {
  targetPath: string;
  boardRef: React.RefObject<HTMLDivElement | null>;
  celebrating: boolean;
}

interface Position {
  x: number;
  y: number;
}

export default function Player({ targetPath, boardRef, celebrating }: PlayerProps) {
  const [pos, setPos] = useState<Position | null>(null);
  const rafRef = useRef<number>(0);
  const { avatar } = useAvatar();

  useEffect(() => {
    function updatePosition() {
      if (!boardRef.current || !targetPath) return;

      const nodeEl = boardRef.current.querySelector(`[data-path="${targetPath}"]`);
      if (!nodeEl) return;

      const boardRect = boardRef.current.getBoundingClientRect();
      const nodeRect = nodeEl.getBoundingClientRect();

      setPos({
        x: nodeRect.left - boardRect.left + nodeRect.width / 2,
        y: nodeRect.top - boardRect.top - 8,
      });
    }

    /* Small delay to ensure nodes have rendered */
    rafRef.current = requestAnimationFrame(() => {
      setTimeout(updatePosition, 50);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [targetPath, boardRef]);

  /* Also update on window resize */
  useEffect(() => {
    function handleResize() {
      if (!boardRef.current || !targetPath) return;

      const nodeEl = boardRef.current.querySelector(`[data-path="${targetPath}"]`);
      if (!nodeEl) return;

      const boardRect = boardRef.current.getBoundingClientRect();
      const nodeRect = nodeEl.getBoundingClientRect();

      setPos({
        x: nodeRect.left - boardRect.left + nodeRect.width / 2,
        y: nodeRect.top - boardRect.top - 8,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [targetPath, boardRef]);

  if (!pos) return null;

  return (
    <motion.div
      className={`${styles.player} ${celebrating ? styles.celebrating : ''}`}
      animate={{ x: pos.x - 18, y: pos.y - 36 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {avatar === 'bot' && <Bot size={22} />}
      {avatar === 'ghost' && <Ghost size={22} />}
      {avatar === 'rocket' && <Rocket size={22} />}
      {avatar.startsWith('data:image') && (
        <img src={avatar} alt="Player" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
      )}
      {avatar !== 'bot' && avatar !== 'ghost' && avatar !== 'rocket' && !avatar.startsWith('data:image') && (
        <UserCircle2 size={22} />
      )}
      
      <AnimatePresence>
        {celebrating && (
          <motion.div
            className={styles.celebrationBurst}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
