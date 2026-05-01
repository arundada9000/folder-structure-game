/**
 * ACHIEVEMENTS
 *
 * Definitions for achievements the player can unlock.
 * Each achievement has a check function that evaluates player stats.
 */

import type { AchievementDef, PlayerStats } from '@/types';

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first level',
    icon: '🎯',
    check: (stats) => stats.totalGamesWon >= 1,
  },
  {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Complete any level in 3 moves or fewer',
    icon: '⚡',
    check: (stats) => stats.fastestWin !== null && stats.fastestWin.moves <= 3,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Complete 5 different levels',
    icon: '🗺️',
    check: (stats) => stats.levelsCompleted.length >= 5,
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a level with half the allowed moves or fewer',
    icon: '💎',
    check: (stats) => stats.perfectGames >= 1,
  },
  {
    id: 'veteran',
    name: 'Veteran',
    description: 'Complete all 10 levels',
    icon: '🏆',
    check: (stats) => stats.levelsCompleted.length >= 10,
  },
  {
    id: 'marathon',
    name: 'Marathon',
    description: 'Make 100 total moves across all games',
    icon: '🏃',
    check: (stats) => stats.totalMoves >= 100,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Play 25 games',
    icon: '🎮',
    check: (stats) => stats.totalGamesPlayed >= 25,
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Win 20 games',
    icon: '🔥',
    check: (stats) => stats.totalGamesWon >= 20,
  },
];

/**
 * Check which achievements a player has unlocked.
 * Returns array of newly unlocked achievement IDs.
 */
export function checkNewAchievements(
  stats: PlayerStats,
  currentAchievements: string[]
): string[] {
  const newUnlocks: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!currentAchievements.includes(achievement.id) && achievement.check(stats)) {
      newUnlocks.push(achievement.id);
    }
  }

  return newUnlocks;
}

/**
 * Get achievement definition by ID.
 */
export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
