'use client';

/**
 * GAME BOARD
 *
 * Visual tree rendering with connecting lines, folder/file nodes, and player overlay.
 * Uses recursive rendering with CSS-based tree connectors.
 */

import { useRef } from 'react';
import type { TreeNode } from '@/types';
import { getDisplayName } from '@/lib/pathParser';
import FolderNode from './FolderNode';
import Player from './Player';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  tree: TreeNode;
  targetPath: string;
  displayPath: string;
  visitedPaths: string[];
  hiddenMode: boolean;
  visiblePaths: Set<string>;
  celebrating: boolean;
}

export default function GameBoard({
  tree,
  targetPath,
  displayPath,
  visitedPaths,
  hiddenMode,
  visiblePaths,
  celebrating,
}: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);

  function isNodeHidden(path: string): boolean {
    if (!hiddenMode) return false;
    if (path === targetPath) return false;
    return !visiblePaths.has(path);
  }

  function renderSubtree(node: TreeNode, parentPath: string) {
    const nodeName = getDisplayName(node);
    const nodePath = parentPath ? `${parentPath}/${nodeName}` : `/${nodeName}`;
    const hidden = isNodeHidden(nodePath);

    return (
      <div className={styles.subtree} key={nodePath}>
        <FolderNode
          name={node.name}
          path={nodePath}
          isCurrent={displayPath === nodePath}
          isTarget={targetPath === nodePath}
          isVisited={visitedPaths.includes(nodePath)}
          isHidden={hidden}
          isOnGhostPath={false}
          nodeType={node.type}
          extension={node.extension}
        />

        {node.children.length > 0 && (
          <div className={styles.childrenContainer}>
            <div className={styles.verticalLine} />

            <div className={styles.childrenRow}>
              {node.children.map((child, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === node.children.length - 1;
                const isOnly = node.children.length === 1;

                return (
                  <div
                    className={`${styles.childWrapper} ${
                      isOnly ? styles.childOnly : isFirst ? styles.childFirst : isLast ? styles.childLast : styles.childMiddle
                    }`}
                    key={nodePath + '/' + getDisplayName(child)}
                  >
                    <div className={styles.childConnector} />
                    {renderSubtree(child, nodePath)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.board} ref={boardRef}>
      <div className={styles.treeContainer}>
        {tree.name && renderSubtree(tree, '')}
      </div>
      <Player
        targetPath={displayPath}
        boardRef={boardRef}
        celebrating={celebrating}
      />
    </div>
  );
}
