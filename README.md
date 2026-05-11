# PathPilot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

An interactive, web-based educational game that teaches file system navigation using relative and absolute paths. Navigate visual folder trees by entering path commands — a mix between a puzzle game and a navigation simulator.

**[Report a Bug](https://github.com/arundada9000/folder-structure-game/issues)**

---

## Features

- **Visual File Tree** — Interactive tree with animated nodes, connecting lines, and folder/file icons
- **Path Commands** — Type real path commands (`../folder`, `/root/src`) to move an avatar between folders
- **24 Handcrafted Levels** — Progressive difficulty across multiple mechanics:
  - Fog of war (hidden tree exploration)
  - Move limits (plan your route carefully)
  - Relative-only mode (no absolute paths)
  - File nodes with extensions
- **4+ Thematic Endgame Levels** — Labyrinth, AI Core, Time Capsule, Vault Heist
- **Random Level Generator** — Infinite procedurally generated trees
- **Custom Tree Upload** — Import your own folder structure as JSON
- **Animated Avatar** — Smooth spring-physics movement; choose from Bot, Ghost, Rocket, or upload a custom image
- **Hint System** — Get a hint for the next optimal move
- **Undo Moves** — Step back through your path history
- **Star Ratings** — 1–3 stars based on move efficiency
- **Achievements** — Unlockable badges for milestones (First Steps, Speedrunner, Explorer, etc.)
- **Sound Effects** — Synthesized Web Audio API sounds for moves, errors, wins, and losses
- **Toast Notifications** — Real-time feedback for valid moves, errors, warnings, and hints
- **VS Code Sidebar View** — Toggle between tree and code-explorer view
- **PWA Support** — Install as a standalone app with offline-capable service worker
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Accessibility** — Keyboard-friendly input, ARIA labels, focus states, high contrast

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Modules + CSS Variables design system |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Audio | Web Audio API (synthesized, no external assets) |
| Persistence | localStorage (progress, settings, avatar) |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arundada9000/folder-structure-game.git
cd folder-structure-game

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## How to Play

1. **Select a Level** — Choose from 24 built-in levels, upload a custom tree, or generate a random one
2. **Read the Target** — The HUD shows your current position and target folder/file
3. **Enter a Path** — Type a path command in the terminal input:
   - `../folder` — Go up one level, then into "folder"
   - `../../docs` — Go up two levels, then into "docs"
   - `/root/src/app` — Navigate using an absolute path (if allowed)
   - `.` — Current directory (no movement)
4. **Watch the Avatar Move** — Your character animates through each folder
5. **Reach the Target** — Navigate to the highlighted target folder to win

### Path Syntax

| Command | Description |
|---------|-------------|
| `..` | Go to parent directory |
| `.` | Current directory (no-op) |
| `foldername` | Enter child folder |
| `../sibling` | Go up, then into sibling |
| `/root/path` | Absolute path from root |

### Tips

- Press **Tab** for autocomplete suggestions
- Press **↑/↓** to recall previously entered paths
- Use the **Undo** button (or Ctrl+Z) to backtrack
- Click the **Hint** button if you're stuck
- Toggle between **Tree View** and **Code Explorer** view

## Custom Tree Format

Upload a JSON file with this structure:

```json
{
  "name": "root",
  "children": [
    {
      "name": "src",
      "children": [
        { "name": "components", "children": [] },
        { "name": "utils", "children": [] }
      ]
    },
    {
      "name": "docs",
      "children": []
    }
  ]
}
```

You can also include file nodes with extensions:

```json
{
  "name": "workspace",
  "children": [
    {
      "name": "project",
      "children": [
        { "name": "main", "type": "file", "extension": "py", "children": [] },
        {
          "name": "src",
          "children": [
            { "name": "utils", "type": "file", "extension": "ts", "children": [] }
          ]
        }
      ]
    }
  ]
}
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout, metadata, fonts, PWA
│   ├── manifest.ts          # PWA manifest
│   ├── globals.css          # CSS variables design system
│   └── play/
│       ├── page.tsx         # Main game interface
│       └── page.module.css
├── components/
│   ├── game/
│   │   ├── AvatarPicker.tsx      # Avatar selection dropdown
│   │   ├── FolderNode.tsx        # Single tree node (folder/file)
│   │   ├── GameBoard.tsx         # Visual tree rendering
│   │   ├── GameOverlay.tsx       # Win/loss overlay with confetti & stars
│   │   ├── HUD.tsx               # Top status bar
│   │   ├── LevelSelector.tsx     # 3D tilt-card level picker
│   │   ├── PathInput.tsx         # Terminal input with Tab autocomplete
│   │   ├── Player.tsx            # Framer Motion animated avatar
│   │   ├── SidebarTreeView.tsx   # VS Code-style file explorer
│   │   └── UploadModal.tsx       # JSON upload with validation
│   ├── ui/
│   │   ├── Confetti.tsx          # Particle burst on win
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   ├── Toast.tsx             # Single toast notification
│   │   └── ToastContainer.tsx    # Stacked toast display
│   └── PwaInit.tsx               # Service worker registration
├── hooks/
│   ├── useAudio.ts         # Web Audio API sound synthesizer
│   ├── useAvatar.ts        # Avatar preference (localStorage)
│   ├── useGameEngine.ts    # Central game state management
│   ├── useProgress.ts      # Level progress & achievements
│   └── useToast.ts         # Toast notification system
├── lib/
│   ├── achievements.ts     # Achievement definitions & checks
│   ├── hints.ts            # BFS shortest-path hint calculator
│   ├── levels.ts           # 24 built-in level configs
│   ├── pathParser.ts       # Path resolution engine (relative/absolute)
│   ├── sounds.ts           # Shared AudioContext singleton
│   ├── treeUtils.ts        # Random generation, visibility, traversal
│   └── validator.ts        # JSON tree validation & sanitization
└── types/
    └── index.ts            # All TypeScript interfaces
```

## Architecture Overview

### Data Flow

```
User Input → PathInput → resolvePath() → GameEngine → GameState → GameBoard/Player
                                      ↕
                              localStorage (Progress)
```

### Key Modules

- **`pathParser.ts`** — Core path resolution: handles absolute (`/root/foo`), relative (`../foo`), `.`, and `..` traversal. Returns step-by-step results for animation.
- **`useGameEngine.ts`** — Central state manager: level lifecycle, move execution, undo, win/loss detection, fog-of-war visibility.
- **`treeUtils.ts`** — Tree utilities: random generation with configurable depth/branching, fog-of-war visible path calculation, node counting.
- **`hints.ts`** — BFS-based shortest path algorithm that calculates the optimal route from current position to target.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Levels

| # | Name | Mechanics |
|---|------|-----------|
| 1 | The Basics | Simple tree, no restrictions |
| 2 | Relative Navigation | Relative paths only |
| 3 | Fog of War | Hidden tree (radius 2) |
| 4 | Under Pressure | Limited moves, no absolute |
| 5 | Deep Dive | Deep nesting, multiple paths |
| 6 | Secret Research Lab | Fog + limited moves |
| 7 | The Maze | Fog (radius 1) |
| 8 | Deep System Recovery | Relative only |
| 9 | The Spy Mission | Fog + limited moves |
| 10 | Quantum Leap | Extreme: fog + limited moves |
| 11 | Dev's Workspace | File nodes, relative only |
| 12 | Corporate Espionage | Fog + relative |
| 13 | Downloads Cleanup | Messy tree with files |
| 14 | Web Server Debug | Fog + files |
| 15 | Source Code Hunt | Fog + files + limited moves |
| 16 | The Hidden Archive | Find the text file |
| 17 | The Parallel Dimension | Navigate between branches |
| 18 | The Chrono-Log | Date-based tree |
| 19 | Sysadmin's Nightmare | Broad tree, tight moves |
| 20 | Digital Forensics | Deeply buried evidence |
| 21 | The Labyrinth | Identical door names |
| 22 | A.I. Core | Multi-layer firewall |
| 23 | Time Capsule | Cross-decade navigation |
| 24 | Vault Heist | 20 identical rooms |

## Future Roadmap

- [ ] Leaderboard with best move counts per level
- [ ] Timed challenge mode
- [ ] Multiplayer race mode
- [ ] Level editor with drag-and-drop
- [ ] Tutorial/onboarding walkthrough for new players
- [ ] Achievements showcase page
- [ ] Additional avatar options
- [ ] Dark/light theme toggle

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT — see [LICENSE](LICENSE) for details.
