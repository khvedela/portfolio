# David Khvedelidze - Portfolio CV

A brutalist, terminal-inspired digital CV/portfolio website featuring custom ASCII aesthetics and interactive elements.

## 🎯 Features

- **ASCII Loading Screen**: Terminal-style boot sequence with animated ASCII art name display
- **Custom Cursor**: Unique ASCII character cursor (×, +, ◆) with brutalist design
- **Brutalist Progress Bar**: Multi-part scroll indicator with section navigation
- **Copy-to-Clipboard**: Quick contact info copying with animated toast notifications
- **Dark Mode**: Manual theme toggle with system preference detection
- **Mobile Optimized**: Fully responsive design for all screen sizes
- **Print Optimized**: Clean print styles for physical CV distribution

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite with SWC compiler
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Package Manager**: Bun (npm compatible)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ & npm (or Bun)
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/khvedela/paris-angular-drive.git

# Navigate to the project
cd paris-angular-drive

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

The site will be available at `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/
│   ├── CV*.tsx              # Content sections (About, Work, Tech Stack, etc.)
│   ├── CustomCursor.tsx     # ASCII cursor implementation
│   ├── BrutalistProgressBar.tsx  # Scroll progress & navigation
│   ├── BrutalistToast.tsx   # Copy notification system
│   ├── ASCIILoadingScreen.tsx    # Boot screen animation
│   └── ui/                  # shadcn components
├── pages/
│   ├── Index.tsx            # Main CV page
│   └── NotFound.tsx         # 404 page
├── lib/
│   └── utils.ts             # Helper functions
└── index.css                # Global styles & design tokens
```

## 🎨 Design Philosophy

- **Brutalism**: No rounded corners, thick borders, harsh transitions
- **Terminal Aesthetic**: ASCII art, monospace fonts, command-line vibes
- **Anti-Corporate**: Direct communication, no buzzwords or fluff
- **Performance First**: Motion values, GPU acceleration, optimized animations

## 🔧 Available Scripts

```sh
bun dev          # Start development server
bun build        # Production build
bun build:dev    # Development build
bun preview      # Preview production build
bun lint         # Run ESLint
```

## 🎯 Key Components

### Loading Screen
- Displays on every page refresh
- ASCII art name animation
- Terminal-style progress bar
- Manual enter button for user control

### Custom Cursor
- ASCII characters for different states
- Always visible (desktop & loading screen)
- GPU-accelerated for smooth tracking

### Progress Bar
- Desktop: Top bar + corner indicator + right-side section markers
- Mobile: Compact top bar only
- Clickable section navigation
- Real-time scroll position tracking

### Copy Feature
- Desktop: Hover over contact icons
- Mobile: Tap contact info
- Brutalist toast notifications with animations
- Clipboard API with fallback support

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 768px
- Desktop: > 768px

## 🌙 Theme System

Uses CSS variables for theming:
- `--primary`: Cyan (#00D9FF)
- `--accent`: Orange/coral
- `--foreground`: Main text color
- `--background`: Base background
- Auto dark mode detection with manual toggle

## 📄 License

This is a personal portfolio project.

## 🔗 Links

- **Repository**: https://github.com/khvedela/paris-angular-drive

---

Built with React, TypeScript, and Tailwind CSS. No AI-generated corporate poetry. No spinning cubes. Just work that matters.
