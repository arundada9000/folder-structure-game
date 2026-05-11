'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { LevelProgress, PlayerStats } from '@/types';
import { checkNewAchievements } from '@/lib/achievements';

const PROGRESS_KEY = 'pathpilot_progress';
const STATS_KEY = 'pathpilot_stats';

function loadProgress(): Map<number, LevelProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return new Map();
    const data: LevelProgress[] = JSON.parse(raw);
    return new Map(data.map((p) => [p.levelId, p]));
  } catch {
    return new Map();
  }
}

function saveProgress(progress: Map<number, LevelProgress>) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(progress.values())));
  } catch {
    /* localStorage full or blocked */
  }
}

function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return createEmptyStats();
    return { ...createEmptyStats(), ...JSON.parse(raw) };
  } catch {
    return createEmptyStats();
  }
}

function saveStats(stats: PlayerStats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* localStorage full or blocked */
  }
}

function createEmptyStats(): PlayerStats {
  return {
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalMoves: 0,
    perfectGames: 0,
    levelsCompleted: [],
    achievements: [],
    fastestWin: null,
  };
}

interface UseProgressReturn {
  progress: Map<number, LevelProgress>;
  stats: PlayerStats;
  recordWin: (levelId: number, moveCount: number, maxMoves: number | null) => string[];
  recordAttempt: (levelId: number) => void;
  recordLoss: () => void;
  getLevelProgress: (levelId: number) => LevelProgress | undefined;
  isLevelCompleted: (levelId: number) => boolean;
  resetProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgress] = useState<Map<number, LevelProgress>>(loadProgress);
  const [stats, setStats] = useState<PlayerStats>(loadStats);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      setProgress(loadProgress);
      setStats(loadStats);
    }
  }, []);

  const recordWin = useCallback((levelId: number, moveCount: number, maxMoves: number | null): string[] => {
    let newAchievements: string[] = [];
    let updatedStats: PlayerStats | null = null;

    setProgress((prev) => {
      const next = new Map(prev);
      const existing = next.get(levelId);
      const stars = maxMoves !== null ? (moveCount <= maxMoves - 2 ? 3 : moveCount <= maxMoves ? 2 : 1) : moveCount <= 3 ? 3 : moveCount <= 5 ? 2 : 1;

      if (!existing || moveCount < existing.bestMoveCount) {
        next.set(levelId, {
          levelId,
          completed: true,
          bestMoveCount: moveCount,
          bestStars: Math.max(existing?.bestStars ?? 0, stars),
          attempts: (existing?.attempts ?? 0) + 1,
        });
      } else {
        next.set(levelId, { ...existing, completed: true, attempts: (existing?.attempts ?? 0) + 1 });
      }

      saveProgress(next);
      return next;
    });

    setStats((prev) => {
      const next: PlayerStats = {
        ...prev,
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        totalGamesWon: prev.totalGamesWon + 1,
        totalMoves: prev.totalMoves + moveCount,
        levelsCompleted: prev.levelsCompleted.includes(levelId) ? prev.levelsCompleted : [...prev.levelsCompleted, levelId],
        fastestWin:
          !prev.fastestWin || (moveCount < prev.fastestWin.moves && levelId === prev.fastestWin.levelId)
            ? { levelId, moves: moveCount }
            : prev.fastestWin,
        perfectGames: prev.perfectGames + (maxMoves !== null && moveCount <= Math.floor(maxMoves / 2) ? 1 : 0),
        achievements: [...prev.achievements],
      };

      newAchievements = checkNewAchievements(next, prev.achievements);

      if (newAchievements.length > 0) {
        updatedStats = { ...next, achievements: [...prev.achievements, ...newAchievements] };
        saveStats(updatedStats);
        return updatedStats;
      }

      saveStats(next);
      return next;
    });

    return newAchievements;
  }, []);

  const recordAttempt = useCallback((levelId: number) => {
    setProgress((prev) => {
      const next = new Map(prev);
      const existing = next.get(levelId);
      if (existing) {
        next.set(levelId, { ...existing, attempts: existing.attempts + 1 });
      } else {
        next.set(levelId, {
          levelId,
          completed: false,
          bestMoveCount: 999999,
          bestStars: 0,
          attempts: 1,
        });
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const recordLoss = useCallback(() => {
    setStats((prev) => {
      const next = { ...prev, totalGamesPlayed: prev.totalGamesPlayed + 1 };
      saveStats(next);
      return next;
    });
  }, []);

  const getLevelProgress = useCallback(
    (levelId: number): LevelProgress | undefined => {
      return progress.get(levelId);
    },
    [progress]
  );

  const isLevelCompleted = useCallback(
    (levelId: number): boolean => {
      return progress.get(levelId)?.completed ?? false;
    },
    [progress]
  );

  const resetProgress = useCallback(() => {
    setProgress(new Map());
    setStats(createEmptyStats());
    try {
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(STATS_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    progress,
    stats,
    recordWin,
    recordAttempt,
    recordLoss,
    getLevelProgress,
    isLevelCompleted,
    resetProgress,
  };
}
