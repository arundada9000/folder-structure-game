# PathPilot

An interactive, web-based educational game that teaches file system navigation using relative and absolute paths. Navigate visual folder trees by entering path commands - a mix between a puzzle game and a navigation simulator.

## Features

- **Visual File Tree** - See the file system as an interactive tree with animated nodes and connecting lines
- **Path Commands** - Type real path commands (`../folder`, `/root/src`) to move a robot character between folders
- **5 Handcrafted Levels** - Progressive difficulty from basics to complex trees with constraints
  - Level 1: The Basics - Learn with a simple tree
  - Level 2: Relative Navigation - Only relative paths allowed
  - Level 3: Fog of War - Partially hidden tree structure
  - Level 4: Under Pressure - Limited moves, no absolute paths
  - Level 5: Deep Dive - Complex tree with deep nesting
- **Random Level Generator** - Generate randomized trees with configurable depth and branching
- **Custom Tree Upload** - Import your own folder structure as JSON
- **Animated Robot Avatar** - Smooth spring-physics movement between nodes
- **Toast Notifications** - Real-time feedback for valid moves, errors, and warnings
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Accessibility** - Keyboard-friendly, high contrast, clear focus states

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (icons)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd game

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

1. **Select a Level** - Choose from 5 built-in levels, upload a custom tree, or generate a random one
2. **Read the Target** - The HUD shows your current position and target folder
3. **Enter a Path** - Type a path command in the terminal input:
   - `../folder` - Go up one level, then into "folder"
   - `../../docs` - Go up two levels, then into "docs"
   - `/root/src/app` - Navigate using an absolute path (if allowed)
   - `.` - Current directory (no movement)
4. **Watch the Robot Move** - Your character animates through each folder
5. **Reach the Target** - Navigate to the highlighted target folder to win

### Path Syntax

| Command | Description |
|---------|-------------|
| `..` | Go to parent directory |
| `.` | Current directory (no-op) |
| `foldername` | Enter child folder |
| `../sibling` | Go up, then into sibling |
| `/root/path` | Absolute path from root |

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

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Landing page
│   ├── play/page.tsx       # Game interface
│   ├── layout.tsx          # Root layout + SEO
│   └── globals.css         # CSS variables & design system
├── components/
│   ├── game/               # Game components
│   │   ├── GameBoard.tsx    # Tree visualization
│   │   ├── FolderNode.tsx   # Individual folder node
│   │   ├── Player.tsx       # Animated robot avatar
│   │   ├── PathInput.tsx    # Terminal-style input
│   │   ├── HUD.tsx          # Heads-up display
│   │   ├── LevelSelector.tsx # Level selection cards
│   │   ├── GameOverlay.tsx  # Win/loss overlay
│   │   └── UploadModal.tsx  # Custom tree upload
│   └── ui/                 # Shared UI components
│       ├── Toast.tsx        # Toast notification
│       └── ToastContainer.tsx
├── hooks/
│   ├── useGameEngine.ts    # Game state management
│   └── useToast.ts         # Toast notification system
├── lib/
│   ├── pathParser.ts       # Path resolution engine
│   ├── treeUtils.ts        # Tree generation & traversal
│   ├── levels.ts           # Built-in level definitions
│   └── validator.ts        # JSON upload validation
└── types/
    └── index.ts            # TypeScript interfaces
```

## Future Roadmap

- [ ] Sound effects for movement, errors, and success
- [ ] Leaderboard with best move counts per level
- [ ] Timed challenge mode
- [ ] Multiplayer race mode
- [ ] Level editor with drag-and-drop
- [ ] Achievement system
- [ ] File type icons (not just folders)
- [ ] Tutorial/onboarding walkthrough

## License

MIT
