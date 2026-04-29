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
import { useGameEngine } from '@/hooks/useGameEngine';
import { useToast } from '@/hooks/useToast';
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
  const { state, visiblePaths, loadLevel, executeMove, previewMove, resetLevel } = useGameEngine();
  const toast = useToast();

  const [showMenu, setShowMenu] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'code'>('tree');

  /* Load a level and switch to game view */
  const handleSelectLevel = useCallback(
    (level: LevelConfig) => {
      loadLevel(level);
      setShowMenu(false);
      toast.info(`Level ${level.id}: ${level.name}`);
    },
    [loadLevel, toast]
  );

  /* Handle path submission from input */
  const handlePathSubmit = useCallback(
    (path: string) => {
      setInputError(false);

      /* Check absolute path restriction before executing */
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

      /* Win! */
      if (result.reachedTarget) {
        toast.success('Destination reached!');
        return;
      }

      /* Check move limit warning */
      if (
        state.level.maxMoves !== null &&
        state.level.maxMoves - (state.moveCount + 1) <= 2 &&
        state.level.maxMoves - (state.moveCount + 1) > 0
      ) {
        toast.warning(`Only ${state.level.maxMoves - state.moveCount - 1} moves remaining`);
      }
    },
    [executeMove, state.level, state.moveCount, toast]
  );

  /* Handle win/loss detection */
  const isWon = state.status === 'won';
  const isLost = state.status === 'lost';

  /* Generate random level */
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

  /* Handle custom tree upload */
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

  /* Go back to menu */
  const handleBack = useCallback(() => {
    setShowMenu(true);
    toast.clearAll();
  }, [toast]);

  /* Next level */
  const handleNextLevel = useCallback(() => {
    const currentIdx = LEVELS.findIndex((l) => l.id === state.level.id);
    if (currentIdx >= 0 && currentIdx < LEVELS.length - 1) {
      handleSelectLevel(LEVELS[currentIdx + 1]);
    } else {
      handleBack();
    }
  }, [state.level.id, handleSelectLevel, handleBack]);

  const hasNextLevel = LEVELS.findIndex((l) => l.id === state.level.id) < LEVELS.length - 1;

  return (
    <div className={styles.page}>
      {showMenu ? (
        <LevelSelector
          levels={LEVELS}
          onSelect={handleSelectLevel}
          onCustom={() => setShowUpload(true)}
          onGenerate={handleGenerate}
        />
      ) : (
        <div className={styles.gameLayout}>
          <HUD
            levelName={state.level.name}
            levelId={state.level.id}
            currentPath={state.currentPath}
            targetPath={state.targetPath}
            moveCount={state.moveCount}
            maxMoves={state.level.maxMoves}
            allowAbsolute={state.level.allowAbsolute}
            hiddenMode={state.level.hiddenMode}
            viewMode={viewMode}
            onToggleView={() => setViewMode((prev) => (prev === 'tree' ? 'code' : 'tree'))}
            onReset={resetLevel}
            onBack={handleBack}
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
                currentPath={state.currentPath}
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

      {/* Upload modal */}
      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onLoad={handleCustomTree}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.removeToast} />
    </div>
  );
}
