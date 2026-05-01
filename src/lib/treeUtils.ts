/**
 * TREE UTILITIES
 *
 * Helpers for generating, traversing, and querying file trees.
 */

import type { TreeNode } from '@/types';
import { pathToSegments, segmentsToPath, getDisplayName } from './pathParser';

/** Folder name pools for random tree generation */
const FOLDER_NAMES = [
  'src', 'lib', 'app', 'components', 'utils', 'hooks',
  'pages', 'styles', 'assets', 'config', 'tests', 'docs',
  'public', 'dist', 'build', 'scripts', 'data', 'api',
  'models', 'services', 'middleware', 'helpers', 'types',
  'constants', 'templates', 'views', 'controllers', 'routes',
];

/**
 * Generate a random tree with configurable depth and branching factor.
 */
export function generateRandomTree(
  rootName: string,
  maxDepth: number,
  maxBranching: number,
  currentDepth: number = 0
): TreeNode {
  const node: TreeNode = { name: rootName, type: 'folder', children: [] };

  if (currentDepth >= maxDepth) return node;

  /* Fewer children at deeper levels */
  const scaledBranching = Math.max(1, maxBranching - currentDepth);
  const childCount = Math.floor(Math.random() * scaledBranching) + 1;

  const usedNames = new Set<string>();
  for (let i = 0; i < childCount; i++) {
    let name: string;
    do {
      name = FOLDER_NAMES[Math.floor(Math.random() * FOLDER_NAMES.length)];
    } while (usedNames.has(name));
    usedNames.add(name);

    node.children.push(
      generateRandomTree(name, maxDepth, maxBranching, currentDepth + 1)
    );
  }

  return node;
}

/**
 * Get the depth (distance from root) of a path.
 */
export function getPathDepth(path: string): number {
  return pathToSegments(path).length - 1;
}

/**
 * Get the parent path of a given absolute path.
 * Returns null for the root path.
 */
export function getParentPath(path: string): string | null {
  const segments = pathToSegments(path);
  if (segments.length <= 1) return null;
  return segmentsToPath(segments.slice(0, -1));
}

/**
 * Get all paths within a given radius of the center path.
 * Used for the hidden/fog-of-war mode.
 */
export function getVisiblePaths(
  root: TreeNode,
  centerPath: string,
  radius: number
): Set<string> {
  const visible = new Set<string>();
  const centerSegments = pathToSegments(centerPath);

  function dfs(node: TreeNode, path: string, depth: number) {
    const nodeSegments = pathToSegments(path);

    /* Calculate distance: how many steps between this node and center */
    const commonLength = getCommonPrefixLength(centerSegments, nodeSegments);
    const upSteps = centerSegments.length - commonLength;
    const downSteps = nodeSegments.length - commonLength;
    const distance = upSteps + downSteps;

    if (distance <= radius) {
      visible.add(path);
      /* Also make the path to this node visible */
      for (let i = 1; i <= nodeSegments.length; i++) {
        const partialPath = segmentsToPath(nodeSegments.slice(0, i));
        const partialSegments = pathToSegments(partialPath);
        const pCommon = getCommonPrefixLength(centerSegments, partialSegments);
        const pDist = (centerSegments.length - pCommon) + (partialSegments.length - pCommon);
        if (pDist <= radius) {
          visible.add(partialPath);
        }
      }
    }

    for (const child of node.children) {
      dfs(child, path + '/' + getDisplayName(child), depth + 1);
    }
  }

  dfs(root, '/' + root.name, 0);
  return visible;
}

/**
 * Get the length of the common prefix between two segment arrays.
 */
function getCommonPrefixLength(a: string[], b: string[]): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/**
 * Pick a random leaf or inner node from the tree.
 * Avoids picking the root itself unless it's the only node.
 */
export function getRandomNodePath(root: TreeNode, excludePath?: string): string {
  const allPaths: string[] = [];
  function dfs(node: TreeNode, path: string) {
    if (path !== excludePath) {
      allPaths.push(path);
    }
    for (const child of node.children) {
      dfs(child, path + '/' + getDisplayName(child));
    }
  }
  dfs(root, '/' + root.name);

  const nonRoot = allPaths.filter((p) => pathToSegments(p).length > 1);
  const pool = nonRoot.length > 0 ? nonRoot : allPaths;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Count total nodes in the tree.
 */
export function countNodes(node: TreeNode): number {
  let count = 1;
  for (const child of node.children) {
    count += countNodes(child);
  }
  return count;
}
