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

const mazeTree: TreeNode = {
  name: 'maze',
  children: [
    {
      name: 'level1',
      children: [
        { name: 'room_a', children: [] },
        { name: 'room_b', children: [] },
        {
          name: 'hub',
          children: [
            { name: 'north', children: [] },
            { name: 'south', children: [] },
            { name: 'east', children: [] },
            { name: 'west', children: [] }
          ]
        }
      ]
    },
    {
      name: 'level2',
      children: [
        {
          name: 'secret',
          children: [
            { name: 'treasure', children: [] },
            { name: 'decoy', children: [] }
          ]
        },
        { name: 'trap', children: [] }
      ]
    },
    {
      name: 'level3',
      children: [
        {
          name: 'warp',
          children: [
            { name: 'zone_a', children: [] },
            { name: 'zone_b', children: [] },
            {
              name: 'portal',
              children: [
                { name: 'exit', children: [] }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const deepSystemTree: TreeNode = {
  name: 'system',
  children: [
    {
      name: 'root',
      children: [
        {
          name: 'bin',
          children: [
            { name: 'core', children: [] },
            { name: 'utils', children: [] }
          ]
        },
        {
          name: 'var',
          children: [
            {
              name: 'log',
              children: [
                { name: 'apache', children: [] },
                { name: 'mysql', children: [] },
                {
                  name: 'system',
                  children: [
                    { name: 'critical', children: [] },
                    { name: 'debug', children: [] }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'usr',
          children: [
            {
              name: 'local',
              children: [
                {
                  name: 'share',
                  children: [
                    { name: 'documents', children: [] }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
const spyTree: TreeNode = {
  name: 'agency',
  children: [
    {
      name: 'ops',
      children: [
        { name: 'alpha', children: [] },
        { name: 'bravo', children: [] },
        {
          name: 'charlie',
          children: [
            { name: 'intel', children: [] },
            {
              name: 'classified',
              children: [
                { name: 'top_secret', children: [] },
                { name: 'eyes_only', children: [] }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'safehouse',
      children: [
        {
          name: 'cache',
          children: [
            { name: 'dropbox', children: [] }
          ]
        }
      ]
    },
    {
      name: 'dead_drop',
      children: [
        { name: 'package', children: [] }
      ]
    }
  ]
};

const quantumTree: TreeNode = {
  name: 'quantum',
  children: [
    {
      name: 'dimension_a',
      children: [
        {
          name: 'reality_1',
          children: [
            {
              name: 'timeline_alpha',
              children: [
                { name: 'past', children: [] },
                { name: 'present', children: [] },
                { name: 'future', children: [] }
              ]
            }
          ]
        },
        {
          name: 'reality_2',
          children: [
            { name: 'alternate', children: [] },
            {
              name: 'parallel',
              children: [
                { name: 'universe_x', children: [] }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'dimension_b',
      children: [
        {
          name: 'reality_3',
          children: [
            {
              name: 'timeline_beta',
              children: [
                { name: 'quantum_anchor', children: [] }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'nexus',
      children: [
        { name: 'stabilizer', children: [] }
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
  {
    id: 7,
    name: 'The Maze',
    description: 'Find your way from the hub to the treasure. The maze has many dead ends!',
    tree: mazeTree,
    startPath: '/maze/level1/hub',
    targetPath: '/maze/level2/secret/treasure',
    maxMoves: 4,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 8,
    name: 'Deep System Recovery',
    description: 'Recover the critical logs starting from the documents folder. Use relative paths only!',
    tree: deepSystemTree,
    startPath: '/system/root/usr/local/share/documents',
    targetPath: '/system/root/var/log/system/critical',
    maxMoves: null,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 9,
    name: 'The Spy Mission',
    description: 'Escape from the classified eyes_only room to the safehouse dropbox. Maximum security - no absolute paths, limited moves!',
    tree: spyTree,
    startPath: '/agency/ops/charlie/classified/eyes_only',
    targetPath: '/agency/safehouse/cache/dropbox',
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 10,
    name: 'Quantum Leap',
    description: 'Navigate from the past timeline to the quantum anchor. Extreme difficulty - fog of war, limited visibility, and absolute paths disabled!',
    tree: quantumTree,
    startPath: '/quantum/dimension_a/reality_1/timeline_alpha/past',
    targetPath: '/quantum/dimension_b/reality_3/timeline_beta/quantum_anchor',
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
];
