# Contributing to PathPilot

Thank you for considering contributing to PathPilot! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs
- Check the [issues](https://github.com/arundada9000/folder-structure-game/issues) to avoid duplicates
- Provide a clear title and description
- Include steps to reproduce, expected behavior, and actual behavior
- Add browser/device information if relevant

### Suggesting Enhancements
- Open an issue with the label "enhancement"
- Describe the feature, why it's useful, and how it should work
- Include mockups or examples if applicable

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the lint and build checks (`npm run lint && npm run build`)
5. Commit with a clear message (see commit guidelines below)
6. Push to your fork and open a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/arundada9000/folder-structure-game.git
cd folder-structure-game

# Install dependencies
npm install

# Start the dev server
npm run dev

# Run linting
npm run lint

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

See [README.md](README.md#project-structure) for the full project layout.

## Commit Guidelines

We follow conventional commit messages:

- `feat:` — A new feature
- `fix:` — A bug fix
- `docs:` — Documentation changes
- `refactor:` — Code refactoring without feature changes or fixes
- `style:` — Formatting, missing semicolons, etc. (no code change)
- `test:` — Adding or updating tests
- `chore:` — Build process, tooling, dependencies

Examples:
```
feat: add fog of war visibility radius indicator
fix: prevent crash when tree has no children
docs: update level creation guide with file types
```

## Code Style

- TypeScript strict mode is enabled
- Run `npm run lint` before committing
- Prefer named exports for hooks and utilities
- Use CSS Modules with CSS variables for styling (no hardcoded colors)
- Use Framer Motion for animations
- Keep components focused and composable
- Avoid adding comments unless the logic is non-obvious

## Adding a New Level

See [levels-creation.md](levels-creation.md) for a detailed guide on creating new game levels.

## Testing

- Tests use Vitest
- Run `npm test` to execute the test suite
- Place test files next to the source file with a `.test.ts` suffix
- Aim to test core logic: path resolution, validation, tree utilities
