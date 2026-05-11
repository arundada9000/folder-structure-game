'use client';

/**
 * PLAY PAGE
 *
 * Main game interface hosting level selector, game board, HUD,
 * path input, toast notifications, and overlays.
 */

import { useState, useCallback } from 'react';
import type { LevelConfig, TreeNode } from '@/types';
import { LEVELS } from '@/lib/levels';
import { generateRandomTree, getRandomNodePath } from '@/lib/treeUtils';
import { getHint } from '@/lib/hints';
import { getAchievementById } from '@/lib/achievements';
import { useGameEngine } from '@/hooks/useGameEngine';
import { useToast } from '@/hooks/useToast';
import { useProgress } from '@/hooks/useProgress';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import LevelSelector from '@/components/game/LevelSelector';
import GameBoard from '@/components/game/GameBoard';
import SidebarTreeView from '@/components/game/SidebarTreeView';
import HUD from '@/components/game/HUD';
import PathInput from '@/components/game/PathInput';
import GameOverlay from '@/components/game/GameOverlay';
import UploadModal from '@/components/game/UploadModal';
import ToastContainer from '@/components/ui/ToastContainer';
import styles from './page.module.css';

export default function PlayPage() {
  const { state, visiblePaths, loadLevel, executeMove, previewMove, undoMove, resetLevel, muted, toggleMute } = useGameEngine();
  const toast = useToast();
  const { recordWin, recordAttempt, recordLoss, getLevelProgress, isLevelCompleted } = useProgress();

  const [showMenu, setShowMenu] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'code'>('tree');

  const handleSelectLevel = useCallback(
    (level: LevelConfig) => {
      loadLevel(level);
      setShowMenu(false);
      recordAttempt(level.id);
      toast.info(`Level ${level.id}: ${level.name}`);
    },
    [loadLevel, toast, recordAttempt]
  );

  const handlePathSubmit = useCallback(
    (path: string) => {
      setInputError(false);

      if (!state.level.allowAbsolute && path.trim().startsWith('/')) {
        toast.warning('Absolute paths are not allowed in this level');
        setInputError(true);
        return;
      }

      const result = executeMove(path);

      if (!result.success) {
        toast.error(result.error || 'Invalid path');
        setInputError(true);
        return;
      }

      if (result.reachedTarget) {
        const newAchievements = recordWin(state.level.id, state.moveCount + 1, state.level.maxMoves);
        toast.success('Destination reached!');
        for (const achId of newAchievements) {
          const ach = getAchievementById(achId);
          if (ach) {
            toast.success(`Achievement unlocked: ${ach.name} ${ach.icon}`, 5000);
          }
        }
        return;
      }

      if (result.lost) {
        recordLoss();
      }

      if (
        state.level.maxMoves !== null &&
        state.level.maxMoves - (state.moveCount + 1) <= 2 &&
        state.level.maxMoves - (state.moveCount + 1) > 0
      ) {
        toast.warning(`Only ${state.level.maxMoves - state.moveCount - 1} moves remaining`);
      }
    },
    [executeMove, state.level, state.moveCount, toast, recordWin, recordLoss]
  );

  const isWon = state.status === 'won';
  const isLost = state.status === 'lost';

  const handleGenerate = useCallback(() => {
    const depth = 3 + Math.floor(Math.random() * 2);
    const branching = 2 + Math.floor(Math.random() * 2);
    const tree = generateRandomTree('root', depth, branching);
    const startPath = getRandomNodePath(tree);
    const targetPath = getRandomNodePath(tree, startPath);

    const level: LevelConfig = {
      id: 0,
      name: 'Random Challenge',
      description: 'A randomly generated tree. Find your way!',
      tree,
      startPath,
      targetPath,
      maxMoves: null,
      allowAbsolute: true,
      hiddenMode: false,
      visibilityRadius: Infinity,
    };

    handleSelectLevel(level);
  }, [handleSelectLevel]);

  const handleCustomTree = useCallback(
    (tree: TreeNode) => {
      const startPath = `/${tree.name}`;
      const targetPath = getRandomNodePath(tree, startPath);

      const level: LevelConfig = {
        id: 0,
        name: 'Custom Level',
        description: 'Your uploaded folder structure.',
        tree,
        startPath,
        targetPath,
        maxMoves: null,
        allowAbsolute: true,
        hiddenMode: false,
        visibilityRadius: Infinity,
      };

      handleSelectLevel(level);
      toast.success('Custom tree loaded successfully!');
    },
    [handleSelectLevel, toast]
  );

  const handleBack = useCallback(() => {
    setShowMenu(true);
    toast.clearAll();
  }, [toast]);

  const handleNextLevel = useCallback(() => {
    const currentIdx = LEVELS.findIndex((l) => l.id === state.level.id);
    if (currentIdx >= 0 && currentIdx < LEVELS.length - 1) {
      handleSelectLevel(LEVELS[currentIdx + 1]);
    } else {
      handleBack();
    }
  }, [state.level.id, handleSelectLevel, handleBack]);

  const handleUndo = useCallback(() => {
    const success = undoMove();
    if (success) {
      toast.info('Move undone');
    }
  }, [undoMove, toast]);

  const handleHint = useCallback(() => {
    if (state.status !== 'playing') return;

    const hint = getHint(state.level.tree, state.currentPath, state.targetPath);
    if (hint) {
      toast.info(`Hint: ${hint.explanation}`, 5000);
    } else {
      toast.warning('No hint available');
    }
  }, [state.status, state.level.tree, state.currentPath, state.targetPath, toast]);

  const hasNextLevel = LEVELS.findIndex((l) => l.id === state.level.id) < LEVELS.length - 1;

  const levelProgress = state.level.id ? getLevelProgress(state.level.id) : undefined;

  return (
    <ErrorBoundary>
    <div className={styles.page}>
      <h1 className="sr-only">PathPilot - Play Game</h1>
      {showMenu ? (
        <LevelSelector
          levels={LEVELS}
          onSelect={handleSelectLevel}
          onCustom={() => setShowUpload(true)}
          onGenerate={handleGenerate}
          getProgress={getLevelProgress}
          isCompleted={isLevelCompleted}
        />
      ) : (
        <div className={styles.gameLayout}>
          <HUD
            levelName={state.level.name}
            levelId={state.level.id}
            targetPath={state.targetPath}
            moveCount={state.moveCount}
            maxMoves={state.level.maxMoves}
            allowAbsolute={state.level.allowAbsolute}
            hiddenMode={state.level.hiddenMode}
            viewMode={viewMode}
            canUndo={state.status === 'playing' && state.moveCount > 0}
            muted={muted}
            onToggleView={() => setViewMode((prev) => (prev === 'tree' ? 'code' : 'tree'))}
            onReset={resetLevel}
            onBack={handleBack}
            onUndo={handleUndo}
            onHint={handleHint}
            onToggleMute={toggleMute}
          />

          <div className={styles.gameContent}>
            {viewMode === 'code' && (
              <SidebarTreeView
                tree={state.level.tree}
                currentPath={state.currentPath}
                targetPath={state.targetPath}
                visitedPaths={state.visitedPaths}
                hiddenMode={state.level.hiddenMode}
                visiblePaths={visiblePaths}
              />
            )}

            <div className={styles.boardArea}>
          <GameBoard
            tree={state.level.tree}
            targetPath={state.targetPath}
            displayPath={state.displayPath}
            visitedPaths={state.visitedPaths}
            hiddenMode={state.level.hiddenMode}
            visiblePaths={visiblePaths}
            celebrating={isWon}
          />

              <GameOverlay
                status={state.status}
                moveCount={state.moveCount}
                onRestart={resetLevel}
                onNextLevel={handleNextLevel}
                onBack={handleBack}
                hasNextLevel={hasNextLevel}
                bestScore={levelProgress?.bestMoveCount}
              />
            </div>
          </div>
          <PathInput
            currentPath={state.currentPath}
            tree={state.level.tree}
            onSubmit={handlePathSubmit}
            onPreview={previewMove}
            disabled={isWon || isLost}
            hasError={inputError}
          />
        </div>
      )}

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onLoad={handleCustomTree}
      />

      <ToastContainer toasts={toast.toasts} onDismiss={toast.removeToast} />
    </div>
    </ErrorBoundary>
  );
}
