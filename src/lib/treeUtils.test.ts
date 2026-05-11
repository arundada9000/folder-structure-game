import { describe, it, expect } from 'vitest';
import { getParentPath, getVisiblePaths, countNodes, getPathDepth } from './treeUtils';
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
        { name: 'api', type: 'folder', children: [] },
        { name: 'guides', type: 'folder', children: [] },
      ],
    },
    { name: 'tests', type: 'folder', children: [] },
  ],
};

describe('getParentPath', () => {
  it('returns parent of a nested path', () => {
    expect(getParentPath('/root/src/components')).toBe('/root/src');
  });

  it('returns root for a direct child of root', () => {
    expect(getParentPath('/root/src')).toBe('/root');
  });

  it('returns null for root path', () => {
    expect(getParentPath('/root')).toBeNull();
  });
});

describe('getPathDepth', () => {
  it('returns 0 for root', () => {
    expect(getPathDepth('/root')).toBe(0);
  });

  it('returns depth for nested paths', () => {
    expect(getPathDepth('/root/src/components')).toBe(2);
  });
});

describe('getVisiblePaths', () => {
  it('returns all paths with infinite radius', () => {
    const visible = getVisiblePaths(tree, '/root', Infinity);
    expect(visible.has('/root')).toBe(true);
    expect(visible.has('/root/src')).toBe(true);
    expect(visible.has('/root/src/components')).toBe(true);
    expect(visible.has('/root/docs')).toBe(true);
    expect(visible.has('/root/tests')).toBe(true);
  });

  it('returns limited paths with radius 1', () => {
    const visible = getVisiblePaths(tree, '/root/src', 1);
    expect(visible.has('/root')).toBe(true);
    expect(visible.has('/root/src')).toBe(true);
    expect(visible.has('/root/src/components')).toBe(true);
    expect(visible.has('/root/src/utils')).toBe(true);
    expect(visible.has('/root/docs')).toBe(false);
    expect(visible.has('/root/tests')).toBe(false);
  });

  it('shows itself only with radius 0', () => {
    const visible = getVisiblePaths(tree, '/root/src', 0);
    expect(visible.has('/root/src')).toBe(true);
    expect(visible.has('/root/src/components')).toBe(false);
    expect(visible.has('/root')).toBe(false);
  });

  it('handles radius 2 from leaf to show siblings and parent siblings', () => {
    const visible = getVisiblePaths(tree, '/root/src/components', 2);
    expect(visible.has('/root/src')).toBe(true);
    expect(visible.has('/root/src/components')).toBe(true);
    expect(visible.has('/root/src/utils')).toBe(true);
    expect(visible.has('/root')).toBe(true);
  });
});

describe('countNodes', () => {
  it('counts all nodes in the tree', () => {
    expect(countNodes(tree)).toBe(8);
  });

  it('returns 1 for a leaf node', () => {
    expect(countNodes({ name: 'leaf', type: 'folder', children: [] })).toBe(1);
  });
});
