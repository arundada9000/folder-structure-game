# Changelog

All notable changes to PathPilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- JSON-LD structured data for rich search engine snippets
- Sitemap.xml and robots.txt for improved indexing
- Canonical URLs and page-specific metadata
- Play page layout with dedicated SEO metadata
- Security headers (CSP, HSTS, X-Frame-Options, etc.) in next.config.ts
- Environment variables example file (.env.example)
- CONTRIBUTING.md with setup and guidelines
- MIT LICENSE file
- GitHub Actions CI workflow (lint + type-check + build)
- Vitest test suite with tests for pathParser, validator, and treeUtils
- Service worker with precache and offline fallback page
- CHANGELOG.md for version tracking

### Fixed
- Confetti component now uses proper React patterns (no module-level mutation)
- recordLoss callback is now called when player runs out of moves
- Duplicate totalGamesPlayed increment (was counting on both attempt and win)
- TypeScript type safety: removed `as LevelConfig` type assertion in useGameEngine
- Viewport no longer disables user zoom (accessibility fix)

### Changed
- Updated README to reflect 24 levels (was incorrectly showing 5)
- Updated README with repo URL, full feature list, architecture overview, and level table
- Updated levels-creation.md with file-type node documentation and extension field
- Refined ESLint config with unused-imports rule

## [0.1.0] - 2025-01-01

### Added
- Initial release with 24 levels
- Core game engine with path resolution
- Visual tree rendering with Framer Motion animations
- Fog of war (hidden tree) mechanic
- Custom tree upload with JSON validation
- Random tree generation
- Avatar system with multiple choices
- Toast notification system
- Win/loss overlays with confetti
- PWA support with service worker
- Sound effects via Web Audio API
- Achievement system
- Level progress tracking with localStorage persistence
