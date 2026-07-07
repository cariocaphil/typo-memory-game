# TypoMemory

A font-themed memory card game built with Next.js. Flip cards to find matching font pairs, with animated card turns and controls to tweak letters, case, and display options.

## Tech stack

- **Next.js 16** (Pages Router)
- **React 19**
- **TypeScript**
- **Ant Design 6** (buttons, switches, win modal)
- **@react-spring/web** (card flip animations)
- **next/font** (Google Fonts)
- **Vitest** (unit tests)
- **ESLint 9** + **Prettier**

## Requirements

- Node.js **20.x** (required by Next.js 16)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the development server        |
| `npm run build`        | Create a production build           |
| `npm run start`        | Serve the production build          |
| `npm test`             | Run unit tests                      |
| `npm run lint`         | Run ESLint                          |
| `npm run format`       | Format files with Prettier          |
| `npm run format:check` | Check formatting without writing    |
| `npm run ci`           | Run lint, format check, test, build |

## Game controls

- **Start Again** — deal a new board (remounts the game)
- **Change Letter** — pick a random letter shared across cards
- **Upper/Lower Case** — toggle the alphabet case
- **Show same letter for each card** — when off, each card shows a unique letter from the alphabet
- **Show Font Name** — display the font name on flipped cards

## Project structure

```
components/       UI: Card, Game, Panel, TitleBar, Layout
context/          MemoryGameContext (state + actions)
hooks/            useMemoryGame (reducer + turn phases)
pages/            Next.js routes (/, /credits/thank-you)
types/            Shared TypeScript types
utils/            Game logic, fonts, constants, helpers
styles/           Global CSS reset
```

Game rules live in `utils/gameLogic.ts` as pure functions, with tests in `utils/gameLogic.test.ts`. React state is managed via `useReducer` in `hooks/useMemoryGame.ts`, with turn phases: `idle` → `oneFlipped` → `resolving`.

## CI

GitHub Actions runs on pushes to `main` and on pull requests:

1. ESLint
2. Prettier format check
3. Vitest
4. Production build

## Credits

See [/credits/thank-you](/credits/thank-you) for inspiration and asset attributions.
