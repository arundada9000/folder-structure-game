'use client';

/**
 * USE GAME ENGINE
 *
 * Central game state manager. Handles path execution with instant movement,
 * free exploration, and win detection on each move.
 *
 * Key design: Players can freely navigate the tree. Every move immediately
 * teleports the robot. If you land on the target, you win.
 */

import { useState, useCallback, useEffect } from 'react';
import type { GameState, GameStatus, LevelConfig } from '@/types';
import { resolvePath } from '@/lib/pathParser';
import { getVisiblePaths } from '@/lib/treeUtils';
import { useAudio } from '@/hooks/useAudio';

interface UseGameEngineReturn {
  state: GameState;
  visiblePaths: Set<string>;
  loadLevel: (level: LevelConfig) => void;
  executeMove: (input: string) => { success: boolean; error?: string; reachedTarget?: boolean };
  previewMove: (input: string) => void;
  resetLevel: () => void;
}

function createInitialState(level: LevelConfig): GameState {
  return {
    level,
    currentPath: level.startPath,
    targetPath: level.targetPath,
    moveCount: 0,
    status: 'playing',
    pathHistory: [],
    visitedPaths: [level.startPath],
    isAnimating: false,
    displayPath: level.startPath,
  };
}

export function useGameEngine(): UseGameEngineReturn {
  const [state, setState] = useState<GameState>(() => ({
    level: {} as LevelConfig,
    currentPath: '',
    targetPath: '',
    moveCount: 0,
    status: 'menu' as GameStatus,
    pathHistory: [],
    visitedPaths: [],
    isAnimating: false,
    displayPath: '',
  }));

  const { playStart, playMove, playWin, playError } = useAudio();

  const loadLevel = useCallback((level: LevelConfig) => {
    setState(createInitialState(level));
    playStart();
  }, [playStart]);

  const resetLevel = useCallback(() => {
    setState((prev) => {
      if (!prev.level.id && prev.level.id !== 0) return prev;
      return createInitialState(prev.level);
    });
    playStart();
  }, [playStart]);

  const executeMove = useCallback(
    (input: string): { success: boolean; error?: string; reachedTarget?: boolean } => {
      if (state.status !== 'playing') {
        return { success: false, error: 'Game is not active' };
      }

      /* Check absolute path restriction */
      if (!state.level.allowAbsolute && input.trim().startsWith('/')) {
        return { success: false, error: 'Absolute paths are not allowed in this level' };
      }

      /* Check move limit */
      if (state.level.maxMoves !== null && state.moveCount >= state.level.maxMoves) {
        return { success: false, error: 'No moves remaining' };
      }

      const result = resolvePath(state.level.tree, state.currentPath, input);

      if (!result.success) {
        playError();
        return { success: false, error: result.error };
      }

      /* Don't count moves that stay in place */
      if (result.finalPath === state.currentPath && result.steps.length <= 1) {
        playError();
        return { success: false, error: 'You are already here' };
      }

      /* Instant movement — no step-by-step queue */
      const newMoveCount = state.moveCount + 1;
      const reachedTarget = result.finalPath === state.targetPath;
      
      if (reachedTarget) {
        playWin();
      } else {
        playMove();
      }
      const outOfMoves =
        state.level.maxMoves !== null &&
        newMoveCount >= state.level.maxMoves &&
        !reachedTarget;

      /* Mark all intermediate steps + final as visited */
      const allVisited = new Set(state.visitedPaths);
      result.steps.forEach((s) => allVisited.add(s));
      allVisited.add(result.finalPath);

      setState((prev) => ({
        ...prev,
        currentPath: result.finalPath,
        displayPath: result.finalPath,
        moveCount: newMoveCount,
        pathHistory: [...prev.pathHistory, input],
        visitedPaths: Array.from(allVisited),
        status: reachedTarget ? 'won' : outOfMoves ? 'lost' : 'playing',
        isAnimating: false,
      }));

      return { success: true, reachedTarget };
    },
    [state.status, state.level, state.moveCount, state.currentPath, state.visitedPaths, state.targetPath, playError, playMove, playWin]
  );

  const previewMove = useCallback((input: string) => {
    if (state.status !== 'playing') return;

    if (!input.trim()) {
      setState(prev => ({ ...prev, displayPath: prev.currentPath }));
      return;
    }

    /* Check absolute path restriction */
    if (!state.level.allowAbsolute && input.trim().startsWith('/')) {
      setState(prev => ({ ...prev, displayPath: prev.currentPath }));
      return;
    }

    const result = resolvePath(state.level.tree, state.currentPath, input);
    if (result.success) {
      if (state.displayPath !== result.finalPath) {
        setState(prev => ({ ...prev, displayPath: result.finalPath }));
      }
    } else {
      if (state.displayPath !== state.currentPath) {
        setState(prev => ({ ...prev, displayPath: prev.currentPath }));
      }
    }
  }, [state.status, state.level, state.currentPath, state.displayPath]);

  /* Compute visible paths for hidden mode */
  const visiblePaths: Set<string> = state.level.hiddenMode
    ? getVisiblePaths(state.level.tree, state.displayPath, state.level.visibilityRadius)
    : new Set<string>();

  return { state, visiblePaths, loadLevel, executeMove, previewMove, resetLevel };
}
