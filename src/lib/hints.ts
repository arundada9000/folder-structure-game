'use client';

/**
 * HINT SYSTEM
 *
 * Calculates the optimal path from the current position to the target,
 * then reveals the next step as a hint.
 */

import { pathToSegments, segmentsToPath, getNodeByPath } from '@/lib/pathParser';
import type { TreeNode } from '@/types';

/**
 * Find the shortest path between two nodes in the tree using BFS.
 * Returns an array of absolute paths representing each step.
 */
export function findShortestPath(
  root: TreeNode,
  fromPath: string,
  toPath: string
): string[] | null {
  const fromSegments = pathToSegments(fromPath);
  const toSegments = pathToSegments(toPath);

  if (fromSegments[0] !== root.name || toSegments[0] !== root.name) {
    return null;
  }

  const commonLength = getCommonPrefixLength(fromSegments, toSegments);

  const steps: string[] = [fromPath];
  const currentSegments = [...fromSegments];

  for (let i = fromSegments.length - 1; i >= commonLength; i--) {
    currentSegments.pop();
    if (currentSegments.length > 0) {
      steps.push(segmentsToPath(currentSegments));
    }
  }

  for (let i = commonLength; i < toSegments.length; i++) {
    currentSegments.push(toSegments[i]);
    steps.push(segmentsToPath(currentSegments));
  }

  return steps;
}

function getCommonPrefixLength(a: string[], b: string[]): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/**
 * Get a hint for the next move from current position toward target.
 * Returns the next path segment to use, or null if already at target.
 */
export function getHint(
  root: TreeNode,
  currentPath: string,
  targetPath: string
): { hint: string; explanation: string } | null {
  if (currentPath === targetPath) {
    return null;
  }

  const currentSegments = pathToSegments(currentPath);
  const targetSegments = pathToSegments(targetPath);
  const commonLength = getCommonPrefixLength(currentSegments, targetSegments);

  if (commonLength === 0) {
    return null;
  }

  const needsToGoUp = currentSegments.length - commonLength;
  const needsToGoDown = targetSegments.length - commonLength;

  if (needsToGoUp > 0) {
    if (needsToGoUp === 1) {
      const targetName = targetSegments[commonLength];
      return {
        hint: `../${targetName}`,
        explanation: `Go up to parent, then into "${targetName}"`,
      };
    }
    return {
      hint: '..'.repeat(needsToGoUp).split('').join('/').replace(/\//g, '/'),
      explanation: `Go up ${needsToGoUp} level${needsToGoUp > 1 ? 's' : ''} to reach "${segmentsToPath(currentSegments.slice(0, commonLength))}"`,
    };
  }

  if (needsToGoDown > 0) {
    const nextSegment = targetSegments[commonLength];
    const node = getNodeByPath(root, currentPath);
    if (node && node.children.find((c) => c.name === nextSegment)) {
      return {
        hint: nextSegment,
        explanation: `Enter "${nextSegment}"`,
      };
    }
  }

  return null;
}
