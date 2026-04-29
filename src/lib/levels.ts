/**
 * LEVELS
 *
 * Pre-built level configurations with increasing difficulty.
 */

import type { LevelConfig, TreeNode } from '@/types';

/* ============================================================
   LEVEL 1: Basics
   Small tree, full visibility, no restrictions.
   ============================================================ */
const level1Tree: TreeNode = {
  name: 'home',
  children: [
    {
      name: 'documents',
      children: [
        { name: 'notes', children: [] },
        { name: 'photos', children: [] },
      ],
    },
    {
      name: 'downloads',
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 2: Relative Paths
   Must use relative paths. Start not at root.
   ============================================================ */
const level2Tree: TreeNode = {
  name: 'root',
  children: [
    {
      name: 'src',
      children: [
        { name: 'components', children: [] },
        { name: 'utils', children: [] },
      ],
    },
    {
      name: 'docs',
      children: [
        { name: 'api', children: [] },
        { name: 'guides', children: [] },
      ],
    },
    {
      name: 'tests',
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 3: Hidden Structure
   Only partial tree visible (fog of war).
   ============================================================ */
const level3Tree: TreeNode = {
  name: 'server',
  children: [
    {
      name: 'config',
      children: [
        { name: 'env', children: [] },
        { name: 'keys', children: [] },
      ],
    },
    {
      name: 'data',
      children: [
        { name: 'cache', children: [] },
        {
          name: 'logs',
          children: [
            { name: 'errors', children: [] },
            { name: 'access', children: [] },
          ],
        },
      ],
    },
    {
      name: 'bin',
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 4: Constraints
   Limited moves, no absolute paths.
   ============================================================ */
const level4Tree: TreeNode = {
  name: 'project',
  children: [
    {
      name: 'frontend',
      children: [
        {
          name: 'src',
          children: [
            { name: 'pages', children: [] },
            { name: 'styles', children: [] },
          ],
        },
        { name: 'public', children: [] },
      ],
    },
    {
      name: 'backend',
      children: [
        {
          name: 'src',
          children: [
            { name: 'routes', children: [] },
            { name: 'models', children: [] },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 5: Complex Tree
   Deep hierarchy, multiple valid paths.
   ============================================================ */
const level5Tree: TreeNode = {
  name: 'system',
  children: [
    {
      name: 'usr',
      children: [
        {
          name: 'local',
          children: [
            {
              name: 'bin',
              children: [
                { name: 'scripts', children: [] },
              ],
            },
            { name: 'lib', children: [] },
            { name: 'share', children: [] },
          ],
        },
        { name: 'bin', children: [] },
      ],
    },
    {
      name: 'etc',
      children: [
        { name: 'nginx', children: [] },
        {
          name: 'systemd',
          children: [
            { name: 'services', children: [] },
          ],
        },
      ],
    },
    {
      name: 'var',
      children: [
        {
          name: 'log',
          children: [
            { name: 'syslog', children: [] },
            { name: 'auth', children: [] },
          ],
        },
        { name: 'tmp', children: [] },
      ],
    },
  ],
};

const secretLabTree: TreeNode = {
  name: 'lab',
  children: [
    {
      name: 'projects',
      children: [
        {
          name: 'alpha',
          children: [
            { name: 'source', children: [] },
            { name: 'tests', children: [] },
            { name: 'docs', children: [] }
          ]
        },
        {
          name: 'beta',
          children: [
            { name: 'experiments', children: [] },
            { name: 'data', children: [] }
          ]
        },
        {
          name: 'gamma',
          children: [
            { name: 'research', children: [] },
            { name: 'classified', children: [] }
          ]
        }
      ]
    },
    {
      name: 'secure',
      children: [
        {
          name: 'vault',
          children: [
            { name: 'level1', children: [] },
            { name: 'level2', children: [] },
            { name: 'restricted', children: [] }
          ]
        },
        {
          name: 'backup',
          children: [
            { name: 'archive', children: [] }
          ]
        }
      ]
    },
    {
      name: 'shared',
      children: [
        { name: 'public', children: [] },
        { name: 'temp', children: [] }
      ]
    }
  ]
};


/* ============================================================
   LEVEL CONFIGS
   ============================================================ */
export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'The Basics',
    description: 'Learn to navigate with simple paths. Use absolute or relative paths to reach the target folder.',
    tree: level1Tree,
    startPath: '/home',
    targetPath: '/home/documents/notes',
    maxMoves: null,
    allowAbsolute: true,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 2,
    name: 'Relative Navigation',
    description: 'Only relative paths allowed. Use .. to go up and folder names to go down.',
    tree: level2Tree,
    startPath: '/root/src/components',
    targetPath: '/root/docs/guides',
    maxMoves: null,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 3,
    name: 'Fog of War',
    description: 'The tree is hidden. Only nearby folders are visible. Explore to find your way.',
    tree: level3Tree,
    startPath: '/server/config',
    targetPath: '/server/data/logs/errors',
    maxMoves: null,
    allowAbsolute: true,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  {
    id: 4,
    name: 'Under Pressure',
    description: 'Limited moves and no absolute paths. Plan your route carefully.',
    tree: level4Tree,
    startPath: '/project/frontend/src/pages',
    targetPath: '/project/backend/src/models',
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 5,
    name: 'Deep Dive',
    description: 'A complex tree with deep nesting. Multiple valid paths exist. Find the most efficient route.',
    tree: level5Tree,
    startPath: '/system/var/log/syslog',
    targetPath: '/system/usr/local/bin/scripts',
    maxMoves: 10,
    allowAbsolute: true,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 6,
    name: 'Secret Research Lab',
    description: 'Navigate from the alpha source directory to the secure vault level2. You can only see nearby folders!',
    tree: secretLabTree,
    startPath: '/lab/projects/alpha/source',
    targetPath: '/lab/secure/vault/level2',
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 2,
  },
];
