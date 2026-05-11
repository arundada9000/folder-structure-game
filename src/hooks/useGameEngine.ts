'use client';

/**
 * USE GAME ENGINE
 *
 * Central game state manager. Handles path execution with instant movement,
 * free exploration, undo, and win detection on each move.
 */

import { useState, useCallback, useMemo } from 'react';
import type { GameState, LevelConfig } from '@/types';
import { resolvePath } from '@/lib/pathParser';
import { getVisiblePaths } from '@/lib/treeUtils';
import { useAudio } from '@/hooks/useAudio';

interface HistoryEntry {
  previousPath: string;
  input: string;
  previousMoveCount: number;
}

interface UseGameEngineReturn {
  state: GameState;
  visiblePaths: Set<string>;
  loadLevel: (level: LevelConfig) => void;
  executeMove: (input: string) => { success: boolean; error?: string; reachedTarget?: boolean; lost?: boolean };
  previewMove: (input: string) => void;
  undoMove: () => boolean;
  resetLevel: () => void;
  muted: boolean;
  toggleMute: () => void;
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

const INITIAL_LEVEL: LevelConfig = {
  id: 0,
  name: '',
  description: '',
  tree: { name: '', type: 'folder', children: [] },
  startPath: '',
  targetPath: '',
  maxMoves: null,
  allowAbsolute: false,
  hiddenMode: false,
  visibilityRadius: 0,
};

export function useGameEngine(): UseGameEngineReturn {
  const [state, setState] = useState<GameState>({
    level: INITIAL_LEVEL,
    currentPath: '',
    targetPath: '',
    moveCount: 0,
    status: 'menu',
    pathHistory: [],
    visitedPaths: [],
    isAnimating: false,
    displayPath: '',
  });

  const [moveHistory, setMoveHistory] = useState<HistoryEntry[]>([]);

  const { playStart, playMove, playError, playUndo, muted, toggleMute } = useAudio();

  const loadLevel = useCallback((level: LevelConfig) => {
    setState(createInitialState(level));
    setMoveHistory([]);
    playStart();
  }, [playStart]);

  const resetLevel = useCallback(() => {
    setState((prev) => {
      if (!prev.level.id && prev.level.id !== 0) return prev;
      return createInitialState(prev.level);
    });
    setMoveHistory([]);
    playStart();
  }, [playStart]);

  const executeMove = useCallback(
    (input: string): { success: boolean; error?: string; reachedTarget?: boolean; lost?: boolean } => {
      if (state.status !== 'playing') {
        return { success: false, error: 'Game is not active' };
      }

      if (!state.level.allowAbsolute && input.trim().startsWith('/')) {
        return { success: false, error: 'Absolute paths are not allowed in this level' };
      }

      if (state.level.maxMoves !== null && state.moveCount >= state.level.maxMoves) {
        return { success: false, error: 'No moves remaining' };
      }

      const result = resolvePath(state.level.tree, state.currentPath, input);

      if (!result.success) {
        playError();
        return { success: false, error: result.error };
      }

      if (result.finalPath === state.currentPath && result.steps.length <= 1) {
        playError();
        return { success: false, error: 'You are already here' };
      }

      const newMoveCount = state.moveCount + 1;
      const reachedTarget = result.finalPath === state.targetPath;

      if (!reachedTarget) {
        playMove();
      }

      const outOfMoves =
        state.level.maxMoves !== null &&
        newMoveCount >= state.level.maxMoves &&
        !reachedTarget;

      const allVisited = new Set(state.visitedPaths);
      result.steps.forEach((s) => allVisited.add(s));
      allVisited.add(result.finalPath);

      setMoveHistory((prev) => [
        ...prev,
        {
          previousPath: state.currentPath,
          input,
          previousMoveCount: state.moveCount,
        },
      ]);

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

      return { success: true, reachedTarget, lost: outOfMoves };
    },
    [state.status, state.level, state.moveCount, state.currentPath, state.visitedPaths, state.targetPath, playError, playMove]
  );

  const undoMove = useCallback((): boolean => {
    if (state.status !== 'playing' || moveHistory.length === 0) {
      return false;
    }

    const lastMove = moveHistory[moveHistory.length - 1];
    playUndo();

    setMoveHistory((prev) => prev.slice(0, -1));

    setState((prev) => ({
      ...prev,
      currentPath: lastMove.previousPath,
      displayPath: lastMove.previousPath,
      moveCount: lastMove.previousMoveCount,
      pathHistory: prev.pathHistory.slice(0, -1),
    }));

    return true;
  }, [state.status, moveHistory, playUndo]);

  const previewMove = useCallback((input: string) => {
    if (state.status !== 'playing') return;

    if (!input.trim()) {
      setState((prev) => ({ ...prev, displayPath: prev.currentPath }));
      return;
    }

    if (!state.level.allowAbsolute && input.trim().startsWith('/')) {
      setState((prev) => ({ ...prev, displayPath: prev.currentPath }));
      return;
    }

    const result = resolvePath(state.level.tree, state.currentPath, input);

    if (state.displayPath !== result.finalPath) {
      setState((prev) => ({ ...prev, displayPath: result.finalPath }));
    }
  }, [state.status, state.level, state.currentPath, state.displayPath]);

  const visiblePaths = useMemo(() => {
    if (!state.level.hiddenMode || !state.level.tree.name) return new Set<string>();
    return getVisiblePaths(state.level.tree, state.displayPath, state.level.visibilityRadius);
  }, [state.level.hiddenMode, state.level.tree, state.displayPath, state.level.visibilityRadius]);

  return { state, visiblePaths, loadLevel, executeMove, previewMove, undoMove, resetLevel, muted, toggleMute };
}
