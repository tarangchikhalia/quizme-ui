# QuizMe 🧠

A modern, interactive quiz application built with React, TypeScript, and Vite, featuring a bold neobrutalism design aesthetic.

## Features

- **Interactive Quiz Interface**: Answer multiple-choice questions with a clean, intuitive UI
- **Score Tracking**: Real-time score display with passing/failing indicators (passing score: 8/10)
- **Progress Tracking**: Visual progress bar showing completion status
- **Neobrutalism Design**: Bold borders, vibrant colors, and distinctive shadows
- **Difficulty Selection**: Choose between Easy, Medium, and Hard difficulty levels

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library with neobrutalism theme
- **Radix UI** - Accessible component primitives

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quizme
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
bun preview
```

## Customization

### Adding Questions

Edit `questions.json` to add or modify quiz questions:

```json
{
  "question": "Your question here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correct": 1  // Index of correct answer (0-based)
}
```

### Styling

The app uses Tailwind CSS with custom neobrutalism theme variables defined in `src/globals.css`. Key design tokens:

- **Colors**: `--main`, `--background`, `--foreground`, `--border`
- **Shadows**: `--shadow` (4px offset for depth)
- **Borders**: Thick borders (2-4px) for bold appearance
- **Typography**: Custom font weights for headings and body text
