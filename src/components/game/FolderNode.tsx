'use client';

/**
 * FOLDER NODE
 *
 * Visual representation of a single node (folder or file) in the tree.
 * Shows icon, name with extension, and status indicators.
 */

import { motion } from 'framer-motion';
import { Folder, FolderOpen, MapPin, Flag, EyeOff, FileText } from 'lucide-react';
import styles from './FolderNode.module.css';

interface FolderNodeProps {
  name: string;
  path: string;
  isCurrent: boolean;
  isTarget: boolean;
  isVisited: boolean;
  isHidden: boolean;
  isOnGhostPath: boolean;
  nodeType?: 'folder' | 'file';
  extension?: string;
}

export default function FolderNode({
  name,
  path,
  isCurrent,
  isTarget,
  isVisited,
  isHidden,
  isOnGhostPath,
  nodeType = 'folder',
  extension,
}: FolderNodeProps) {
  if (isHidden) {
    return (
      <div className={styles.nodeHidden} data-path={path}>
        <EyeOff size={16} />
        <span className={styles.hiddenLabel}>???</span>
      </div>
    );
  }

  const nodeClass = [
    styles.node,
    isCurrent && styles.current,
    isTarget && styles.target,
    isVisited && !isCurrent && !isTarget && styles.visited,
    isOnGhostPath && styles.ghost,
  ]
    .filter(Boolean)
    .join(' ');

  const displayName = nodeType === 'file' && extension ? `${name}.${extension}` : name;

  return (
    <motion.div
      className={nodeClass}
      data-path={path}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      layout
      title={path}
    >
      {isCurrent && (
        <div className={styles.indicator}>
          <MapPin size={12} />
        </div>
      )}
      {isTarget && !isCurrent && (
        <div className={`${styles.indicator} ${styles.indicatorTarget}`}>
          <Flag size={12} />
        </div>
      )}

      <div className={styles.icon}>
        {isCurrent ? (
          nodeType === 'file' ? <FileText size={20} /> : <FolderOpen size={20} />
        ) : isHidden ? (
          <EyeOff size={20} />
        ) : nodeType === 'file' ? (
          <FileText size={20} />
        ) : (
          <Folder size={20} />
        )}
      </div>

      <span className={styles.label}>{displayName}</span>
    </motion.div>
  );
}
