/**
 * VALIDATOR
 *
 * Validates user-uploaded JSON tree structures for safety and correctness.
 */

import type { TreeNode } from '@/types';

/** Maximum allowed tree depth */
const MAX_DEPTH = 10;
/** Maximum total nodes allowed */
const MAX_NODES = 200;
/** Maximum name length for a folder */
const MAX_NAME_LENGTH = 50;
/** Valid folder name pattern (alphanumeric, hyphens, underscores, dots) */
const VALID_NAME_REGEX = /^[a-zA-Z0-9._-]+$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
  tree?: TreeNode;
}

/**
 * Validate and sanitize a user-uploaded tree structure.
 */
export function validateUploadedTree(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object') {
    return { valid: false, error: 'Input must be a JSON object' };
  }

  const obj = input as Record<string, unknown>;

  if (typeof obj.name !== 'string') {
    return { valid: false, error: 'Root node must have a "name" string property' };
  }

  if (!Array.isArray(obj.children)) {
    return { valid: false, error: 'Root node must have a "children" array property' };
  }

  let nodeCount = 0;

  function validateNode(
    node: unknown,
    depth: number,
    parentPath: string
  ): { valid: boolean; error?: string; result?: TreeNode } {
    if (depth > MAX_DEPTH) {
      return { valid: false, error: `Tree exceeds maximum depth of ${MAX_DEPTH}` };
    }

    nodeCount++;
    if (nodeCount > MAX_NODES) {
      return { valid: false, error: `Tree exceeds maximum of ${MAX_NODES} nodes` };
    }

    if (!node || typeof node !== 'object') {
      return { valid: false, error: `Invalid node at ${parentPath}` };
    }

    const n = node as Record<string, unknown>;

    if (typeof n.name !== 'string' || n.name.trim().length === 0) {
      return { valid: false, error: `Node at ${parentPath} must have a non-empty "name"` };
    }

    const name = n.name.trim();

    if (name.length > MAX_NAME_LENGTH) {
      return { valid: false, error: `Folder name "${name}" exceeds ${MAX_NAME_LENGTH} characters` };
    }

    if (!VALID_NAME_REGEX.test(name)) {
      return {
        valid: false,
        error: `Folder name "${name}" contains invalid characters. Use only letters, numbers, hyphens, underscores, and dots.`,
      };
    }

    const children: TreeNode[] = [];
    if (n.children !== undefined) {
      if (!Array.isArray(n.children)) {
        return { valid: false, error: `"children" must be an array at ${parentPath}/${name}` };
      }

      const childNames = new Set<string>();
      for (const child of n.children) {
        const childResult = validateNode(child, depth + 1, `${parentPath}/${name}`);
        if (!childResult.valid) return childResult;
        if (childResult.result) {
          if (childNames.has(childResult.result.name)) {
            return {
              valid: false,
              error: `Duplicate folder name "${childResult.result.name}" in ${parentPath}/${name}`,
            };
          }
          childNames.add(childResult.result.name);
          children.push(childResult.result);
        }
      }
    }

    return { valid: true, result: { name, type: 'folder', children } };
  }

  const result = validateNode(input, 0, '');
  if (!result.valid) return { valid: false, error: result.error };
  return { valid: true, tree: result.result };
}

/**
 * Parse a JSON string into a validated tree.
 */
export function parseTreeJSON(jsonString: string): ValidationResult {
  try {
    const parsed = JSON.parse(jsonString);
    return validateUploadedTree(parsed);
  } catch {
    return { valid: false, error: 'Invalid JSON format. Please check your syntax.' };
  }
}
