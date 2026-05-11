import { describe, it, expect } from 'vitest';
import { resolvePath, pathToSegments, segmentsToPath, getNodeByPath, getDisplayName, getAllPaths } from './pathParser';
import type { TreeNode } from '@/types';

const tree: TreeNode = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'components', type: 'folder', children: [] },
        { name: 'utils', type: 'folder', children: [] },
      ],
    },
    {
      name: 'docs',
      type: 'folder',
      children: [
        { name: 'readme', type: 'file', extension: 'md', children: [] },
      ],
    },
    { name: 'tests', type: 'folder', children: [] },
  ],
};

describe('pathToSegments', () => {
  it('splits absolute path into segments', () => {
    expect(pathToSegments('/root/src/components')).toEqual(['root', 'src', 'components']);
  });

  it('handles root path', () => {
    expect(pathToSegments('/root')).toEqual(['root']);
  });

  it('filters empty segments from trailing slash', () => {
    expect(pathToSegments('/root/src/')).toEqual(['root', 'src']);
  });
});

describe('segmentsToPath', () => {
  it('joins segments into absolute path', () => {
    expect(segmentsToPath(['root', 'src', 'components'])).toBe('/root/src/components');
  });

  it('handles single segment', () => {
    expect(segmentsToPath(['root'])).toBe('/root');
  });
});

describe('getDisplayName', () => {
  it('returns name for folders', () => {
    expect(getDisplayName({ name: 'src', type: 'folder', children: [] })).toBe('src');
  });

  it('returns name.extension for files', () => {
    expect(getDisplayName({ name: 'readme', type: 'file', extension: 'md', children: [] })).toBe('readme.md');
  });

  it('returns plain name for files without extension', () => {
    expect(getDisplayName({ name: 'data', type: 'file', children: [] })).toBe('data');
  });
});

describe('getNodeByPath', () => {
  it('finds a valid path', () => {
    const node = getNodeByPath(tree, '/root/src/components');
    expect(node).not.toBeNull();
    expect(node!.name).toBe('components');
  });

  it('finds a file node with extension', () => {
    const node = getNodeByPath(tree, '/root/docs/readme.md');
    expect(node).not.toBeNull();
    expect(node!.name).toBe('readme');
    expect(node!.extension).toBe('md');
  });

  it('returns null for invalid path', () => {
    expect(getNodeByPath(tree, '/root/nonexistent')).toBeNull();
  });

  it('returns null if root name does not match', () => {
    expect(getNodeByPath(tree, '/other/path')).toBeNull();
  });

  it('finds file by base name without extension', () => {
    const node = getNodeByPath(tree, '/root/docs/readme');
    expect(node).not.toBeNull();
    expect(node!.name).toBe('readme');
  });
});

describe('getAllPaths', () => {
  it('returns all absolute paths in the tree', () => {
    const paths = getAllPaths(tree);
    expect(paths).toContain('/root');
    expect(paths).toContain('/root/src');
    expect(paths).toContain('/root/src/components');
    expect(paths).toContain('/root/src/utils');
    expect(paths).toContain('/root/docs');
    expect(paths).toContain('/root/docs/readme.md');
    expect(paths).toContain('/root/tests');
  });
});

describe('resolvePath', () => {
  it('resolves absolute path from root', () => {
    const result = resolvePath(tree, '/root', '/root/src/components');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/src/components');
    expect(result.steps).toHaveLength(3);
  });

  it('resolves relative path with ..', () => {
    const result = resolvePath(tree, '/root/src/components', '../utils');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/src/utils');
    expect(result.steps).toHaveLength(2);
  });

  it('resolves multiple .. segments', () => {
    const result = resolvePath(tree, '/root/src/components', '../../tests');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/tests');
  });

  it('resolves current directory (.)', () => {
    const result = resolvePath(tree, '/root/src', '.');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/src');
  });

  it('resolves child folder name', () => {
    const result = resolvePath(tree, '/root', 'src');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/src');
  });

  it('resolves path to a file with extension', () => {
    const result = resolvePath(tree, '/root', '/root/docs/readme.md');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/docs/readme.md');
  });

  it('fails for non-existent folder', () => {
    const result = resolvePath(tree, '/root/src', 'nonexistent');
    expect(result.success).toBe(false);
    expect(result.error).toContain('does not exist');
  });

  it('fails for wrong root', () => {
    const result = resolvePath(tree, '/root', '/wrong/foo');
    expect(result.success).toBe(false);
    expect(result.error).toContain('does not exist');
  });

  it('fails for empty path', () => {
    const result = resolvePath(tree, '/root', '');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Empty path');
  });

  it('fails for whitespace-only path', () => {
    const result = resolvePath(tree, '/root', '   ');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Empty path');
  });

  it('handles trailing slash in input', () => {
    const result = resolvePath(tree, '/root', 'src/');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root/src');
  });

  it('handles leading .. to stay at root', () => {
    const result = resolvePath(tree, '/root', '..');
    expect(result.success).toBe(true);
    expect(result.finalPath).toBe('/root');
  });
});
