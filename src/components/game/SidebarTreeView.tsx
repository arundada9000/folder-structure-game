'use client';

/**
 * SIDEBAR TREE VIEW
 *
 * An alternative "VS Code style" file-explorer view of the tree.
 * Shows indented folder/file names with expand/collapse chevrons.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, FolderOpen, MapPin, Flag, EyeOff, File } from 'lucide-react';
import type { TreeNode } from '@/types';
import { getDisplayName } from '@/lib/pathParser';
import styles from './SidebarTreeView.module.css';

interface SidebarTreeViewProps {
  tree: TreeNode;
  currentPath: string;
  targetPath: string;
  visitedPaths: string[];
  hiddenMode: boolean;
  visiblePaths: Set<string>;
}

interface TreeItemProps {
  node: TreeNode;
  parentPath: string;
  depth: number;
  currentPath: string;
  targetPath: string;
  visitedPaths: string[];
  isNodeHidden: (path: string) => boolean;
}

function TreeItem({ node, parentPath, depth, currentPath, targetPath, visitedPaths, isNodeHidden }: TreeItemProps) {
  const displayName = getDisplayName(node);
  const nodePath = parentPath ? `${parentPath}/${displayName}` : `/${displayName}`;
  const isCurrent = currentPath === nodePath;
  const isTarget = targetPath === nodePath;
  const isVisited = visitedPaths.includes(nodePath);
  const hidden = isNodeHidden(nodePath);
  const hasChildren = node.children.length > 0;
  const isFile = node.type === 'file';

  const [expanded, setExpanded] = useState(true);

  const toggleExpand = useCallback(() => {
    if (hasChildren) setExpanded((prev) => !prev);
  }, [hasChildren]);

  if (hidden) {
    return (
      <div className={styles.item} style={{ paddingLeft: `${depth * 16 + 8}px` }}>
        <div className={styles.itemContent}>
          <EyeOff size={12} className={styles.iconHidden} />
          <span className={styles.hiddenName}>???</span>
        </div>
      </div>
    );
  }

  const itemClass = [
    styles.item,
    isCurrent && styles.itemCurrent,
    isTarget && styles.itemTarget,
    isVisited && !isCurrent && !isTarget && styles.itemVisited,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        className={itemClass}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={toggleExpand}
        data-path={nodePath}
        title={nodePath}
      >
        <div className={styles.itemContent}>
          {hasChildren ? (
            <motion.span
              className={styles.chevron}
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight size={14} />
            </motion.span>
          ) : (
            <span className={styles.chevronSpacer} />
          )}

          {isCurrent ? (
            isFile ? <File size={14} className={styles.iconFile} /> : <FolderOpen size={14} className={styles.iconCurrent} />
          ) : isTarget ? (
            <Flag size={14} className={styles.iconTarget} />
          ) : isFile ? (
            <File size={14} className={styles.iconFile} />
          ) : (
            <Folder size={14} className={styles.iconFolder} />
          )}

          <span className={styles.name}>{displayName}</span>

          {isCurrent && <MapPin size={10} className={styles.badge} />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {node.children.map((child) => (
              <TreeItem
                key={nodePath + '/' + getDisplayName(child)}
                node={child}
                parentPath={nodePath}
                depth={depth + 1}
                currentPath={currentPath}
                targetPath={targetPath}
                visitedPaths={visitedPaths}
                isNodeHidden={isNodeHidden}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SidebarTreeView({
  tree,
  currentPath,
  targetPath,
  visitedPaths,
  hiddenMode,
  visiblePaths,
}: SidebarTreeViewProps) {
  const isNodeHidden = useCallback(
    (path: string) => {
      if (!hiddenMode) return false;
      if (path === targetPath) return false;
      return !visiblePaths.has(path);
    },
    [hiddenMode, targetPath, visiblePaths]
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>EXPLORER</span>
      </div>
      <div className={styles.tree}>
        <TreeItem
          node={tree}
          parentPath=""
          depth={0}
          currentPath={currentPath}
          targetPath={targetPath}
          visitedPaths={visitedPaths}
          isNodeHidden={isNodeHidden}
        />
      </div>
    </div>
  );
}
