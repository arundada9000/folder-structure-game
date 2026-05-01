/**
 * LEVELS
 *
 * Pre-built level configurations with increasing difficulty.
 */

import type { LevelConfig, TreeNode } from "@/types";

/* ============================================================
   LEVEL 1: Basics
   Small tree, full visibility, no restrictions.
   ============================================================ */
const level1Tree: TreeNode = {
  name: "home",
  type: "folder",
  children: [
    {
      name: "documents",
      type: "folder",
      children: [
        { name: "notes", type: "folder", children: [] },
        { name: "photos", type: "folder", children: [] },
      ],
    },
    {
      name: "downloads",
      type: "folder",
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 2: Relative Paths
   Must use relative paths. Start not at root.
   ============================================================ */
const level2Tree: TreeNode = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "components", type: "folder", children: [] },
        { name: "utils", type: "folder", children: [] },
      ],
    },
    {
      name: "docs",
      type: "folder",
      children: [
        { name: "api", type: "folder", children: [] },
        { name: "guides", type: "folder", children: [] },
      ],
    },
    {
      name: "tests",
      type: "folder",
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 3: Hidden Structure
   Only partial tree visible (fog of war).
   ============================================================ */
const level3Tree: TreeNode = {
  name: "server",
  type: "folder",
  children: [
    {
      name: "config",
      type: "folder",
      children: [
        { name: "env", type: "folder", children: [] },
        { name: "keys", type: "folder", children: [] },
      ],
    },
    {
      name: "data",
      type: "folder",
      children: [
        { name: "cache", type: "folder", children: [] },
        {
          name: "logs",
          type: "folder",
          children: [
            { name: "errors", type: "folder", children: [] },
            { name: "access", type: "folder", children: [] },
          ],
        },
      ],
    },
    {
      name: "bin",
      type: "folder",
      children: [],
    },
  ],
};

/* ============================================================
   LEVEL 4: Constraints
   Limited moves, no absolute paths.
   ============================================================ */
const level4Tree: TreeNode = {
  name: "project",
  type: "folder",
  children: [
    {
      name: "frontend",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "pages", type: "folder", children: [] },
            { name: "styles", type: "folder", children: [] },
          ],
        },
        { name: "public", type: "folder", children: [] },
      ],
    },
    {
      name: "backend",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "routes", type: "folder", children: [] },
            { name: "models", type: "folder", children: [] },
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
  name: "system",
  type: "folder",
  children: [
    {
      name: "usr",
      type: "folder",
      children: [
        {
          name: "local",
          type: "folder",
          children: [
            {
              name: "bin",
              type: "folder",
              children: [{ name: "scripts", type: "folder", children: [] }],
            },
            { name: "lib", type: "folder", children: [] },
            { name: "share", type: "folder", children: [] },
          ],
        },
        { name: "bin", type: "folder", children: [] },
      ],
    },
    {
      name: "etc",
      type: "folder",
      children: [
        { name: "nginx", type: "folder", children: [] },
        {
          name: "systemd",
          type: "folder",
          children: [{ name: "services", type: "folder", children: [] }],
        },
      ],
    },
    {
      name: "var",
      type: "folder",
      children: [
        {
          name: "log",
          type: "folder",
          children: [
            { name: "syslog", type: "folder", children: [] },
            { name: "auth", type: "folder", children: [] },
          ],
        },
        { name: "tmp", type: "folder", children: [] },
      ],
    },
  ],
};

const secretLabTree: TreeNode = {
  name: "lab",
  type: "folder",
  children: [
    {
      name: "projects",
      type: "folder",
      children: [
        {
          name: "alpha",
          type: "folder",
          children: [
            { name: "source", type: "folder", children: [] },
            { name: "tests", type: "folder", children: [] },
            { name: "docs", type: "folder", children: [] },
          ],
        },
        {
          name: "beta",
          type: "folder",
          children: [
            { name: "experiments", type: "folder", children: [] },
            { name: "data", type: "folder", children: [] },
          ],
        },
        {
          name: "gamma",
          type: "folder",
          children: [
            { name: "research", type: "folder", children: [] },
            { name: "classified", type: "folder", children: [] },
          ],
        },
      ],
    },
    {
      name: "secure",
      type: "folder",
      children: [
        {
          name: "vault",
          type: "folder",
          children: [
            { name: "level1", type: "folder", children: [] },
            { name: "level2", type: "folder", children: [] },
            { name: "restricted", type: "folder", children: [] },
          ],
        },
        {
          name: "backup",
          type: "folder",
          children: [{ name: "archive", type: "folder", children: [] }],
        },
      ],
    },
    {
      name: "shared",
      type: "folder",
      children: [
        { name: "public", type: "folder", children: [] },
        { name: "temp", type: "folder", children: [] },
      ],
    },
  ],
};

const mazeTree: TreeNode = {
  name: "maze",
  type: "folder",
  children: [
    {
      name: "level1",
      type: "folder",
      children: [
        { name: "room_a", type: "folder", children: [] },
        { name: "room_b", type: "folder", children: [] },
        {
          name: "hub",
          type: "folder",
          children: [
            { name: "north", type: "folder", children: [] },
            { name: "south", type: "folder", children: [] },
            { name: "east", type: "folder", children: [] },
            { name: "west", type: "folder", children: [] },
          ],
        },
      ],
    },
    {
      name: "level2",
      type: "folder",
      children: [
        {
          name: "secret",
          type: "folder",
          children: [
            { name: "treasure", type: "folder", children: [] },
            { name: "decoy", type: "folder", children: [] },
          ],
        },
        { name: "trap", type: "folder", children: [] },
      ],
    },
    {
      name: "level3",
      type: "folder",
      children: [
        {
          name: "warp",
          type: "folder",
          children: [
            { name: "zone_a", type: "folder", children: [] },
            { name: "zone_b", type: "folder", children: [] },
            {
              name: "portal",
              type: "folder",
              children: [{ name: "exit", type: "folder", children: [] }],
            },
          ],
        },
      ],
    },
  ],
};

const deepSystemTree: TreeNode = {
  name: "system",
  type: "folder",
  children: [
    {
      name: "root",
      type: "folder",
      children: [
        {
          name: "bin",
          type: "folder",
          children: [
            { name: "core", type: "folder", children: [] },
            { name: "utils", type: "folder", children: [] },
          ],
        },
        {
          name: "var",
          type: "folder",
          children: [
            {
              name: "log",
              type: "folder",
              children: [
                { name: "apache", type: "folder", children: [] },
                { name: "mysql", type: "folder", children: [] },
                {
                  name: "system",
                  type: "folder",
                  children: [
                    { name: "critical", type: "folder", children: [] },
                    { name: "debug", type: "folder", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "usr",
          type: "folder",
          children: [
            {
              name: "local",
              type: "folder",
              children: [
                {
                  name: "share",
                  type: "folder",
                  children: [
                    { name: "documents", type: "folder", children: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const spyTree: TreeNode = {
  name: "agency",
  type: "folder",
  children: [
    {
      name: "ops",
      type: "folder",
      children: [
        { name: "alpha", type: "folder", children: [] },
        { name: "bravo", type: "folder", children: [] },
        {
          name: "charlie",
          type: "folder",
          children: [
            { name: "intel", type: "folder", children: [] },
            {
              name: "classified",
              type: "folder",
              children: [
                { name: "top_secret", type: "folder", children: [] },
                { name: "eyes_only", type: "folder", children: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "safehouse",
      type: "folder",
      children: [
        {
          name: "cache",
          type: "folder",
          children: [{ name: "dropbox", type: "folder", children: [] }],
        },
      ],
    },
    {
      name: "dead_drop",
      type: "folder",
      children: [{ name: "package", type: "folder", children: [] }],
    },
  ],
};

const quantumTree: TreeNode = {
  name: "quantum",
  type: "folder",
  children: [
    {
      name: "dimension_a",
      type: "folder",
      children: [
        {
          name: "reality_1",
          type: "folder",
          children: [
            {
              name: "timeline_alpha",
              type: "folder",
              children: [
                { name: "past", type: "folder", children: [] },
                { name: "present", type: "folder", children: [] },
                { name: "future", type: "folder", children: [] },
              ],
            },
          ],
        },
        {
          name: "reality_2",
          type: "folder",
          children: [
            { name: "alternate", type: "folder", children: [] },
            {
              name: "parallel",
              type: "folder",
              children: [{ name: "universe_x", type: "folder", children: [] }],
            },
          ],
        },
      ],
    },
    {
      name: "dimension_b",
      type: "folder",
      children: [
        {
          name: "reality_3",
          type: "folder",
          children: [
            {
              name: "timeline_beta",
              type: "folder",
              children: [
                { name: "quantum_anchor", type: "folder", children: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "nexus",
      type: "folder",
      children: [{ name: "stabilizer", type: "folder", children: [] }],
    },
  ],
};

/* ============================================================
   LEVELS WITH FILES (enhanced TreeNode)
   ============================================================ */

// Level A: Developer's workspace
const devWorkspaceTree: TreeNode = {
  name: "workspace",
  type: "folder",
  children: [
    {
      name: "project",
      type: "folder",
      children: [
        { name: "README", type: "file", extension: "md", children: [] },
        { name: "main", type: "file", extension: "py", children: [] },
        {
          name: "src",
          type: "folder",
          children: [
            { name: "utils", type: "file", extension: "py", children: [] },
            { name: "app", type: "file", extension: "js", children: [] },
          ],
        },
        {
          name: "docs",
          type: "folder",
          children: [
            { name: "design", type: "file", extension: "pdf", children: [] },
          ],
        },
      ],
    },
    {
      name: "personal",
      type: "folder",
      children: [
        { name: "resume", type: "file", extension: "docx", children: [] },
        { name: "photo", type: "file", extension: "jpg", children: [] },
      ],
    },
  ],
};

// Level B: Company shared drive with confidential files
const sharedDriveTree: TreeNode = {
  name: "company",
  type: "folder",
  children: [
    {
      name: "Public",
      type: "folder",
      children: [
        { name: "policy", type: "file", extension: "pdf", children: [] },
        {
          name: "holiday_schedule",
          type: "file",
          extension: "xlsx",
          children: [],
        },
      ],
    },
    {
      name: "Finance",
      type: "folder",
      children: [
        {
          name: "2024",
          type: "folder",
          children: [
            { name: "budget", type: "file", extension: "xlsx", children: [] },
            { name: "forecast", type: "file", extension: "xlsx", children: [] },
          ],
        },
        {
          name: "2025",
          type: "folder",
          children: [
            { name: "draft", type: "file", extension: "docx", children: [] },
          ],
        },
      ],
    },
    {
      name: "HR",
      type: "folder",
      children: [
        {
          name: "confidential",
          type: "folder",
          children: [
            { name: "salaries", type: "file", extension: "xlsx", children: [] },
            { name: "reviews", type: "file", extension: "docx", children: [] },
          ],
        },
      ],
    },
  ],
};

// Level C: A messy Downloads folder
const downloadsCleanupTree: TreeNode = {
  name: "downloads",
  type: "folder",
  children: [
    { name: "cat_meme", type: "file", extension: "gif", children: [] },
    { name: "report_final", type: "file", extension: "pdf", children: [] },
    { name: "report_final_v2", type: "file", extension: "pdf", children: [] },
    { name: "installer", type: "file", extension: "exe", children: [] },
    {
      name: "archive",
      type: "folder",
      children: [
        { name: "old_stuff", type: "file", extension: "zip", children: [] },
        { name: "backup", type: "file", extension: "tar.gz", children: [] },
      ],
    },
    {
      name: "documents",
      type: "folder",
      children: [
        { name: "thesis", type: "file", extension: "docx", children: [] },
      ],
    },
  ],
};

// Level D: Web server with config and logs (hidden mode)
const webServerTree: TreeNode = {
  name: "server",
  type: "folder",
  children: [
    {
      name: "www",
      type: "folder",
      children: [
        { name: "index", type: "file", extension: "html", children: [] },
        { name: "style", type: "file", extension: "css", children: [] },
        { name: "script", type: "file", extension: "js", children: [] },
      ],
    },
    {
      name: "logs",
      type: "folder",
      children: [
        { name: "access", type: "file", extension: "log", children: [] },
        { name: "error", type: "file", extension: "log", children: [] },
      ],
    },
    {
      name: "config",
      type: "folder",
      children: [
        { name: "nginx", type: "file", extension: "conf", children: [] },
        { name: "app", type: "file", extension: "yaml", children: [] },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 15: The Source Code Hunt
   Start in a tests directory; target a deeply nested main.py.
   No absolute paths, fog of war radius 1, exactly 5 moves.
   ============================================================ */
const sourceHuntTree: TreeNode = {
  name: "project",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "core",
              type: "folder",
              children: [
                { name: "main", type: "file", extension: "py", children: [] },
                {
                  name: "helpers",
                  type: "file",
                  extension: "py",
                  children: [],
                },
              ],
            },
            { name: "utils", type: "folder", children: [] },
          ],
        },
        { name: "lib", type: "folder", children: [] },
      ],
    },
    {
      name: "tests",
      type: "folder",
      children: [
        { name: "test_app", type: "file", extension: "py", children: [] },
        { name: "test_utils", type: "file", extension: "py", children: [] },
      ],
    },
    {
      name: "docs",
      type: "folder",
      children: [
        { name: "readme", type: "file", extension: "md", children: [] },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 16: The Hidden Archive
   A messy drive full of compressed files; find the only
   real text file inside a buried "reports" folder.
   ============================================================ */
const hiddenArchiveTree: TreeNode = {
  name: "archive",
  type: "folder",
  children: [
    {
      name: "backups",
      type: "folder",
      children: [
        { name: "data_jan", type: "file", extension: "tar.gz", children: [] },
        { name: "data_feb", type: "file", extension: "tar.gz", children: [] },
        {
          name: "old",
          type: "folder",
          children: [
            { name: "legacy", type: "file", extension: "zip", children: [] },
            {
              name: "reports",
              type: "folder",
              children: [
                {
                  name: "q1_summary",
                  type: "file",
                  extension: "txt",
                  children: [],
                },
                {
                  name: "q2_draft",
                  type: "file",
                  extension: "odt",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "misc",
      type: "folder",
      children: [
        { name: "notes", type: "file", extension: "txt", children: [] },
        { name: "screenshot", type: "file", extension: "png", children: [] },
        { name: "random", type: "file", extension: "dat", children: [] },
      ],
    },
    {
      name: "temp",
      type: "folder",
      children: [
        { name: "cache", type: "file", extension: "tmp", children: [] },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 17: The Parallel Dimension
   Two branches (alpha / beta) with similar sub‑structures.
   Start deep inside alpha, find a specific file in beta.
   ============================================================ */
const parallelDimensionTree: TreeNode = {
  name: "universe",
  type: "folder",
  children: [
    {
      name: "alpha",
      type: "folder",
      children: [
        {
          name: "sector1",
          type: "folder",
          children: [
            { name: "log", type: "file", extension: "log", children: [] },
            {
              name: "blueprints",
              type: "folder",
              children: [
                {
                  name: "layout",
                  type: "file",
                  extension: "dwg",
                  children: [],
                },
              ],
            },
          ],
        },
        { name: "sector2", type: "folder", children: [] },
      ],
    },
    {
      name: "beta",
      type: "folder",
      children: [
        {
          name: "sector1",
          type: "folder",
          children: [
            { name: "log", type: "file", extension: "log", children: [] },
            {
              name: "blueprints",
              type: "folder",
              children: [
                {
                  name: "final_plan",
                  type: "file",
                  extension: "pdf",
                  children: [],
                },
              ],
            },
          ],
        },
        { name: "sector2", type: "folder", children: [] },
      ],
    },
    {
      name: "nexus",
      type: "folder",
      children: [
        { name: "stabilizer", type: "file", extension: "cfg", children: [] },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 18: The Chrono‑Log
   A file tree by year/month/day. Navigate from one day’s
   log to a completely different year’s report file.
   ============================================================ */
const chronoLogTree: TreeNode = {
  name: "events",
  type: "folder",
  children: [
    {
      name: "2024",
      type: "folder",
      children: [
        {
          name: "01",
          type: "folder",
          children: [
            {
              name: "05",
              type: "folder",
              children: [
                {
                  name: "system",
                  type: "file",
                  extension: "log",
                  children: [],
                },
              ],
            },
            { name: "06", type: "folder", children: [] },
          ],
        },
        {
          name: "02",
          type: "folder",
          children: [{ name: "12", type: "folder", children: [] }],
        },
      ],
    },
    {
      name: "2025",
      type: "folder",
      children: [
        {
          name: "01",
          type: "folder",
          children: [
            { name: "01", type: "folder", children: [] },
            { name: "02", type: "folder", children: [] },
          ],
        },
        {
          name: "03",
          type: "folder",
          children: [
            {
              name: "15",
              type: "folder",
              children: [
                {
                  name: "report",
                  type: "file",
                  extension: "pdf",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 19: The Sysadmin’s Nightmare
   A sprawling /etc with many similar subfolders.
   Reach a critical config file using only what you can see
   (visibility radius 2) and no absolute paths.
   ============================================================ */
const sysadminNightmareTree: TreeNode = {
  name: "etc",
  type: "folder",
  children: [
    {
      name: "network",
      type: "folder",
      children: [
        { name: "interfaces", type: "file", extension: "conf", children: [] },
        {
          name: "scripts",
          type: "folder",
          children: [
            { name: "if-up", type: "file", extension: "sh", children: [] },
            { name: "if-down", type: "file", extension: "sh", children: [] },
          ],
        },
      ],
    },
    {
      name: "systemd",
      type: "folder",
      children: [
        {
          name: "system",
          type: "folder",
          children: [
            { name: "nginx", type: "file", extension: "service", children: [] },
            { name: "sshd", type: "file", extension: "service", children: [] },
          ],
        },
      ],
    },
    {
      name: "security",
      type: "folder",
      children: [
        {
          name: "access",
          type: "folder",
          children: [
            { name: "sudoers", type: "file", extension: "conf", children: [] },
            { name: "limits", type: "file", extension: "conf", children: [] },
          ],
        },
        {
          name: "crypto",
          type: "folder",
          children: [
            { name: "cert", type: "file", extension: "pem", children: [] },
            { name: "key", type: "file", extension: "key", children: [] },
          ],
        },
      ],
    },
    {
      name: "app",
      type: "folder",
      children: [
        {
          name: "configs",
          type: "folder",
          children: [
            { name: "main", type: "file", extension: "yaml", children: [] },
            { name: "database", type: "file", extension: "yaml", children: [] },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 20: Digital Forensics
   A seized drive full of system junk; one critical evidence
   file is hidden deep in a recovered deleted cache.
   ============================================================ */
const forensicsTree: TreeNode = {
  name: "evidence_drive",
  type: "folder",
  children: [
    {
      name: "suspected",
      type: "folder",
      children: [
        {
          name: "emails",
          type: "folder",
          children: [
            { name: "inbox", type: "file", extension: "pst", children: [] },
            { name: "sent", type: "file", extension: "pst", children: [] },
          ],
        },
        {
          name: "browser_history",
          type: "file",
          extension: "sqlite",
          children: [],
        },
      ],
    },
    {
      name: "system",
      type: "folder",
      children: [
        {
          name: "logs",
          type: "folder",
          children: [
            { name: "app", type: "file", extension: "log", children: [] },
            { name: "sys", type: "file", extension: "log", children: [] },
          ],
        },
        { name: "config", type: "file", extension: "ini", children: [] },
      ],
    },
    {
      name: "recovered",
      type: "folder",
      children: [
        {
          name: "deleted",
          type: "folder",
          children: [
            {
              name: "cache",
              type: "folder",
              children: [
                { name: "temp1", type: "file", extension: "dat", children: [] },
                {
                  name: "evidence",
                  type: "file",
                  extension: "txt",
                  children: [],
                },
                { name: "temp2", type: "file", extension: "dat", children: [] },
              ],
            },
            {
              name: "unallocated",
              type: "file",
              extension: "raw",
              children: [],
            },
          ],
        },
        { name: "fragments", type: "folder", children: [] },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 21: The Labyrinth
   A maze of identically named doors; only one path leads
   to the heart of the maze.
   ============================================================ */
const labyrinthTree: TreeNode = {
  name: "maze",
  type: "folder",
  children: [
    {
      name: "entrance",
      type: "folder",
      children: [
        {
          name: "left",
          type: "folder",
          children: [
            {
              name: "left",
              type: "folder",
              children: [
                {
                  name: "left",
                  type: "folder",
                  children: [
                    {
                      name: "dead_end",
                      type: "file",
                      extension: "txt",
                      children: [],
                    },
                  ],
                },
                { name: "right", type: "folder", children: [] },
              ],
            },
            {
              name: "right",
              type: "folder",
              children: [{ name: "left", type: "folder", children: [] }],
            },
          ],
        },
        {
          name: "right",
          type: "folder",
          children: [
            { name: "left", type: "folder", children: [] },
            {
              name: "right",
              type: "folder",
              children: [
                {
                  name: "center",
                  type: "folder",
                  children: [
                    {
                      name: "heart",
                      type: "file",
                      extension: "txt",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 22: A.I. Core
   A sentient machine’s directory structure. Reach the core
   consciousness file past multiple security layers.
   ============================================================ */
const aiCoreTree: TreeNode = {
  name: "ai_mainframe",
  type: "folder",
  children: [
    {
      name: "interface",
      type: "folder",
      children: [
        { name: "terminal", type: "file", extension: "exe", children: [] },
        { name: "visual", type: "file", extension: "exe", children: [] },
      ],
    },
    {
      name: "security",
      type: "folder",
      children: [
        {
          name: "firewall",
          type: "folder",
          children: [
            {
              name: "layer1",
              type: "folder",
              children: [
                { name: "log", type: "file", extension: "log", children: [] },
                {
                  name: "firewall",
                  type: "folder",
                  children: [
                    {
                      name: "layer2",
                      type: "folder",
                      children: [
                        {
                          name: "log",
                          type: "file",
                          extension: "log",
                          children: [],
                        },
                        {
                          name: "firewall",
                          type: "folder",
                          children: [
                            {
                              name: "layer3",
                              type: "folder",
                              children: [
                                {
                                  name: "core_consciousness",
                                  type: "file",
                                  extension: "ai",
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "memory",
      type: "folder",
      children: [
        { name: "ram", type: "folder", children: [] },
        {
          name: "storage",
          type: "folder",
          children: [{ name: "logs", type: "folder", children: [] }],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 23: Time Capsule
   Decades of log archives. Start at the last day of 1999,
   find the newly created file on the first day of 2024.
   ============================================================ */
const timeCapsuleTree: TreeNode = {
  name: "archive",
  type: "folder",
  children: [
    {
      name: "1999",
      type: "folder",
      children: [
        {
          name: "dec",
          type: "folder",
          children: [
            {
              name: "31",
              type: "folder",
              children: [
                { name: "log", type: "file", extension: "log", children: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "2000",
      type: "folder",
      children: [
        /* empty year */
      ],
    },
    {
      name: "2024",
      type: "folder",
      children: [
        {
          name: "jan",
          type: "folder",
          children: [
            {
              name: "01",
              type: "folder",
              children: [
                {
                  name: "newyear",
                  type: "file",
                  extension: "txt",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   LEVEL 24: Vault Heist
   A bank’s secure digital facility. 20+ vault rooms, only
   one contains the master key.
   ============================================================ */
const vaultHeistTree: TreeNode = {
  name: "bankvault",
  type: "folder",
  children: [
    {
      name: "lobby",
      type: "folder",
      children: [{ name: "desk", type: "folder", children: [] }],
    },
    {
      name: "vaults",
      type: "folder",
      children: [
        ...Array.from({ length: 20 }, (_, i) => ({
          name: `room_${i + 1}`,
          type: "folder" as const,
          children:
            i === 12
              ? [
                  {
                    name: "master_key",
                    type: "file" as const,
                    extension: "dat",
                    children: [],
                  },
                ]
              : [
                  {
                    name: "empty",
                    type: "file" as const,
                    extension: "dat",
                    children: [],
                  },
                ],
        })),
      ],
    },
  ],
};

/* ============================================================
   LEVEL CONFIGS
   ============================================================ */
export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "The Basics",
    description:
      "Learn to navigate with simple paths. Use absolute or relative paths to reach the target folder.",
    tree: level1Tree,
    startPath: "/home",
    targetPath: "/home/documents/notes",
    maxMoves: null,
    allowAbsolute: true,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 2,
    name: "Relative Navigation",
    description:
      "Only relative paths allowed. Use .. to go up and folder names to go down.",
    tree: level2Tree,
    startPath: "/root/src/components",
    targetPath: "/root/docs/guides",
    maxMoves: null,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 3,
    name: "Fog of War",
    description:
      "The tree is hidden. Only nearby folders are visible. Explore to find your way.",
    tree: level3Tree,
    startPath: "/server/config",
    targetPath: "/server/data/logs/errors",
    maxMoves: null,
    allowAbsolute: true,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  {
    id: 4,
    name: "Under Pressure",
    description:
      "Limited moves and no absolute paths. Plan your route carefully.",
    tree: level4Tree,
    startPath: "/project/frontend/src/pages",
    targetPath: "/project/backend/src/models",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 5,
    name: "Deep Dive",
    description:
      "A complex tree with deep nesting. Multiple valid paths exist. Find the most efficient route.",
    tree: level5Tree,
    startPath: "/system/var/log/syslog",
    targetPath: "/system/usr/local/bin/scripts",
    maxMoves: 10,
    allowAbsolute: true,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 6,
    name: "Secret Research Lab",
    description:
      "Navigate from the alpha source directory to the secure vault level2. You can only see nearby folders!",
    tree: secretLabTree,
    startPath: "/lab/projects/alpha/source",
    targetPath: "/lab/secure/vault/level2",
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  {
    id: 7,
    name: "The Maze",
    description:
      "Find your way from the hub to the treasure. The maze has many dead ends!",
    tree: mazeTree,
    startPath: "/maze/level1/hub",
    targetPath: "/maze/level2/secret/treasure",
    maxMoves: 4,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 8,
    name: "Deep System Recovery",
    description:
      "Recover the critical logs starting from the documents folder. Use relative paths only!",
    tree: deepSystemTree,
    startPath: "/system/root/usr/local/share/documents",
    targetPath: "/system/root/var/log/system/critical",
    maxMoves: null,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 9,
    name: "The Spy Mission",
    description:
      "Escape from the classified eyes_only room to the safehouse dropbox. Maximum security - no absolute paths, limited moves!",
    tree: spyTree,
    startPath: "/agency/ops/charlie/classified/eyes_only",
    targetPath: "/agency/safehouse/cache/dropbox",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 10,
    name: "Quantum Leap",
    description:
      "Navigate from the past timeline to the quantum anchor. Extreme difficulty - fog of war, limited visibility, and absolute paths disabled!",
    tree: quantumTree,
    startPath: "/quantum/dimension_a/reality_1/timeline_alpha/past",
    targetPath: "/quantum/dimension_b/reality_3/timeline_beta/quantum_anchor",
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 11,
    name: "Dev's Workspace",
    description:
      "Find the main Python script. You are currently looking at your personal photo. Use relative navigation.",
    tree: devWorkspaceTree,
    startPath: "/workspace/personal", // current directory is 'personal', we start there
    targetPath: "/workspace/project/main.py", // target is a file!
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 12,
    name: "Corporate Espionage",
    description:
      "Sneak from the Public folder to the confidential salaries file. Only relative moves allowed, and you can only see one level deep.",
    tree: sharedDriveTree,
    startPath: "/company/Public",
    targetPath: "/company/HR/confidential/salaries.xlsx",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  {
    id: 13,
    name: "Downloads Cleanup",
    description:
      "You are in the root of Downloads. Reach the thesis file hidden inside the documents folder. Many distracting files!",
    tree: downloadsCleanupTree,
    startPath: "/downloads",
    targetPath: "/downloads/documents/thesis.docx",
    maxMoves: null,
    allowAbsolute: true,
    hiddenMode: false,
    visibilityRadius: Infinity,
  },
  {
    id: 14,
    name: "Web Server Debug",
    description:
      "You are editing the JavaScript file, but need to read the error log. Fog of war is on; only nearby files are visible.",
    tree: webServerTree,
    startPath: "/server/www",
    targetPath: "/server/logs/error.log",
    maxMoves: 4,
    allowAbsolute: true,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  {
    id: 15,
    name: "Source Code Hunt",
    description:
      "Find main.py starting from the tests folder. No absolute paths, fog of war (radius 1), and only 5 moves!",
    tree: sourceHuntTree,
    startPath: "/project/tests", // current directory, a folder
    targetPath: "/project/src/app/core/main.py",
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 16: The Hidden Archive ---
  {
    id: 16,
    name: "The Hidden Archive",
    description:
      "Navigate from the misc folder to the only plain text report inside backups/old/reports. Fog of war, no absolute paths, 7 moves.",
    tree: hiddenArchiveTree,
    startPath: "/archive/misc",
    targetPath: "/archive/backups/old/reports/q1_summary.txt",
    maxMoves: 7,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 17: The Parallel Dimension ---
  {
    id: 17,
    name: "The Parallel Dimension",
    description:
      "You are in alpha/sector1/blueprints. Reach the final plan PDF in beta/sector1/blueprints. 6 moves, no absolute paths, radius 2.",
    tree: parallelDimensionTree,
    startPath: "/universe/alpha/sector1/blueprints",
    targetPath: "/universe/beta/sector1/blueprints/final_plan.pdf",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  // --- Level 18: The Chrono‑Log ---
  {
    id: 18,
    name: "The Chrono‑Log",
    description:
      "Travel from the 2024‑01‑05 system log to the 2025‑03‑15 report. Fog of war (radius 1), no absolute paths, exactly 7 moves.",
    tree: chronoLogTree,
    startPath: "/events/2024/01/05",
    targetPath: "/events/2025/03/15/report.pdf",
    maxMoves: 7,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 19: Sysadmin’s Nightmare ---
  {
    id: 19,
    name: "Sysadmin's Nightmare",
    description:
      "From /etc/network/scripts find /etc/app/configs/database.yaml. Visibility radius 2, no absolute paths, only 6 moves!",
    tree: sysadminNightmareTree,
    startPath: "/etc/network/scripts",
    targetPath: "/etc/app/configs/database.yaml",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 2,
  },
  {
    id: 20,
    name: "Digital Forensics",
    description:
      "You’re investigating a seized drive. Starting in the suspected emails folder, find the hidden evidence.txt in recovered/deleted/cache. Fog of war, no absolute paths, 6 moves.",
    tree: forensicsTree,
    startPath: "/evidence_drive/suspected/emails",
    targetPath: "/evidence_drive/recovered/deleted/cache/evidence.txt",
    maxMoves: 6,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 21: The Labyrinth ---
  {
    id: 21,
    name: "The Labyrinth",
    description:
      "A maze of identical doors. From the entrance, find the heart of the maze (heart.txt). Only relative moves, visibility 1, 5 moves.",
    tree: labyrinthTree,
    startPath: "/maze/entrance",
    targetPath: "/maze/entrance/right/right/center/heart.txt",
    maxMoves: 5,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 22: A.I. Core ---
  {
    id: 22,
    name: "A.I. Core",
    description:
      "Infiltrate the AI mainframe. Start in the interface folder, reach the core_consciousness.ai file through three firewall layers. No absolutes, fog radius 1, 7 moves.",
    tree: aiCoreTree,
    startPath: "/ai_mainframe/interface",
    targetPath:
      "/ai_mainframe/security/firewall/layer1/firewall/layer2/firewall/layer3/core_consciousness.ai",
    maxMoves: 7,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 23: Time Capsule ---
  {
    id: 23,
    name: "Time Capsule",
    description:
      "Travel through the decades. From the 1999 Dec 31 log, find the 2024 Jan 01 newyear.txt. Relative paths only, fog of war (radius 1), 8 moves.",
    tree: timeCapsuleTree,
    startPath: "/archive/1999/dec/31",
    targetPath: "/archive/2024/jan/01/newyear.txt",
    maxMoves: 8,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
  // --- Level 24: Vault Heist ---
  {
    id: 24,
    name: "Vault Heist",
    description:
      "20 identical vault rooms. Starting in the lobby, find the room with the master_key.dat. No absolutes, fog radius 1, only 4 moves!",
    tree: vaultHeistTree,
    startPath: "/bankvault/lobby",
    targetPath: "/bankvault/vaults/room_13/master_key.dat",
    maxMoves: 4,
    allowAbsolute: false,
    hiddenMode: true,
    visibilityRadius: 1,
  },
];
