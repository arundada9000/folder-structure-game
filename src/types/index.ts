/* ===========================
   TYPES - Core Game Types
   =========================== */

/** A single node in the file tree */
export interface TreeNode {
  name: string;
  type: "folder" | "file";
  extension?: string;
  children: TreeNode[];
}

/** Result from resolving a path through the tree */
export interface PathResult {
  success: boolean;
  /** Sequence of absolute paths traversed (for animation) */
  steps: string[];
  /** The final resolved absolute path */
  finalPath: string;
  /** Error message if resolution failed */
  error?: string;
  /** The path segment that caused the error */
  errorSegment?: string;
}

/** Configuration for a game level */
export interface LevelConfig {
  id: number;
  name: string;
  description: string;
  tree: TreeNode;
  startPath: string;
  targetPath: string;
  /** Maximum moves allowed, null = unlimited */
  maxMoves: number | null;
  /** Whether absolute paths are allowed */
  allowAbsolute: boolean;
  /** Whether the tree structure is partially hidden */
  hiddenMode: boolean;
  /** How many levels deep from the player node are visible (when hiddenMode=true) */
  visibilityRadius: number;
}

/** Current status of the game */
export type GameStatus = "menu" | "playing" | "won" | "lost";

/** Complete game state managed by the engine */
export interface GameState {
  level: LevelConfig;
  currentPath: string;
  targetPath: string;
  moveCount: number;
  status: GameStatus;
  /** All paths entered by the player */
  pathHistory: string[];
  /** Set of all node paths visited during this level attempt */
  visitedPaths: string[];
  /** Whether the player is currently animating between nodes */
  isAnimating: boolean;
  /** The path currently being displayed (may differ from currentPath during animation) */
  displayPath: string;
}

/** Toast notification types */
export type ToastType = "success" | "error" | "info" | "warning";

/** A single toast notification */
export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  /** Auto-dismiss duration in ms */
  duration: number;
}

/** Uploaded tree structure from user JSON */
export interface UploadedTree {
  name: string;
  children: UploadedTree[];
}

/** Progress data for a single level */
export interface LevelProgress {
  levelId: number;
  completed: boolean;
  bestMoveCount: number;
  bestStars: number;
  attempts: number;
}

/** Achievement definition */
export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (stats: PlayerStats) => boolean;
}

/** Player statistics tracked across sessions */
export interface PlayerStats {
  totalGamesPlayed: number;
  totalGamesWon: number;
  totalMoves: number;
  perfectGames: number;
  levelsCompleted: number[];
  achievements: string[];
  fastestWin: { levelId: number; moves: number } | null;
}
