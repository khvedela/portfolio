# David Khvedelidze - Portfolio CV

A brutalist, terminal-inspired digital CV/portfolio website featuring custom ASCII aesthetics, interactive terminal, and draggable mini-games.

## 🎯 Features

### Core Features
- **ASCII Loading Screen**: Terminal-style boot sequence with animated ASCII art name display
- **Custom Cursor**: Unique ASCII character cursor (×, +, ◆) with brutalist design
- **Brutalist Progress Bar**: Multi-part scroll indicator with section navigation
- **Copy-to-Clipboard**: Quick contact info copying with animated toast notifications
- **Dark Mode**: Manual theme toggle with system preference detection
- **Mobile Optimized**: Fully responsive design for all screen sizes
- **Print Optimized**: Clean print styles for physical CV distribution

### 🖥️ Interactive Terminal (Press `T`)
A fully functional brutalist terminal with:
- **Boot Sequence**: 6-stage initialization with progress bar
- **Sound Effects**: Toggleable typing, success, and error sounds (Web Audio API)
- **Tab Autocomplete**: Ghost text suggestions with Tab key completion
- **Command History**: Navigate with ↑/↓ arrow keys
- **16+ Commands**: Help, clear, about, contact, skills, blog, and more
- **Blog Integration**: Read full blog posts in terminal
- **Easter Eggs**: Hidden commands like sudo, hack, matrix, konami, fortune
- **Unix Aliases**: ls, whoami, pwd, cat with file system simulation

#### Available Terminal Commands
- `help` - Show all commands
- `about` - Display about section
- `contact` - Show contact information
- `skills` - List technical skills
- `blog` - List all blog posts
- `blog read <#>` - Read a specific blog post in terminal
- `clear` - Clear terminal screen
- `cat <file>` - Display file contents (skills.txt, about.md, contact.txt)
- `ls` - List directory contents
- `whoami` - Display user info
- `pwd` - Print working directory
- `snake` - Launch Snake game in draggable window
- `typing` - Launch typing speed test in draggable window
- `sudo` - Try it and find out 😏
- `hack` - Hacker mode
- `matrix` - Enter the Matrix
- `konami` - Classic cheat code
- `fortune` - Random developer wisdom

### 📝 Blog Integration
- **Terminal-style blog reader**: Read full posts with `blog read <number>`
- **Latest posts section**: Shows 3 most recent posts on main page
- **Markdown content**: Write posts in markdown format
- **Medium integration**: Optional links to Medium posts
- **Tag system**: Organize posts by topics
- **Mobile-friendly**: Blog shortcut in custom mobile keyboard

### 🎮 Interactive Mini-Games (Draggable Windows)

#### Snake Game
- **15×15 Grid**: Classic snake gameplay with modern feel
- **Responsive Controls**: WASD or arrow keys with direction queue
- **High Score Tracking**: Persistent session high score
- **Restart Feature**: R key or button to restart without closing
- **Pause/Resume**: Space bar to pause
- **Visual Feedback**: Pulsing food, smooth animations
- **Brutalist Design**: Thick borders, sharp corners, bold colors

#### Typing Speed Test
- **Real-time WPM**: Words per minute calculation
- **Accuracy Tracking**: Character-by-character feedback
- **Color-Coded Input**: Green for correct, red for errors
- **Developer Phrases**: Tech-themed typing challenges
- **Instant Results**: Speed and accuracy on completion

### 🪟 Draggable Window System
- **Fully Draggable**: Click and hold title bar to move anywhere
- **Maximize/Minimize**: Fullscreen toggle with smooth transitions
- **Multiple Windows**: Open multiple games simultaneously
- **Auto-Cascade**: New windows offset automatically
- **Brutalist UI**: 4px borders, sharp shadows, bold headers
- **Z-Index Management**: Windows always appear above terminal and blur

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite with SWC compiler
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Audio**: Web Audio API (oscillator-based sound effects)
- **State Management**: React hooks (useState, useEffect, useCallback, useRef)
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
│   ├── CV*.tsx                   # Content sections (About, Work, Tech Stack, etc.)
│   ├── CustomCursor.tsx          # ASCII cursor implementation
│   ├── BrutalistProgressBar.tsx  # Scroll progress & navigation
│   ├── BrutalistToast.tsx        # Copy notification system
│   ├── ASCIILoadingScreen.tsx    # Boot screen animation
│   ├── BrutalistTerminal.tsx     # Interactive terminal with commands
│   ├── DraggableWindow.tsx       # Draggable window container for games
│   ├── TerminalSnake.tsx         # Snake game component
│   ├── TerminalTypingGame.tsx    # Typing speed test component
│   └── ui/                       # shadcn components (40+ pre-built)
├── pages/
│   ├── Index.tsx                 # Main CV page
│   └── NotFound.tsx              # 404 page
├── hooks/
│   ├── useBrutalistToast.ts      # Toast notification hook
│   └── use-mobile.tsx            # Mobile detection hook
├── lib/
│   └── utils.ts                  # Helper functions (cn, etc.)
└── index.css                     # Global styles & design tokens
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
- Terminal-style progress bar (0-100%)
- Manual "ENTER PORTFOLIO" button for user control
- Mobile-optimized text sizing

### Interactive Terminal
- **Keybind**: Press `T` to toggle terminal
- **Boot Sequence**: 6-stage initialization (2 seconds)
- **Sound System**: 
  - 800Hz keypress sounds
  - 600Hz enter/success tones
  - 200Hz error beeps
  - Toggle with volume icon
- **Autocomplete**: 
  - Ghost text suggestions
  - Tab key completion
  - Smart command matching
- **Command Parser**: 
  - Handles commands with arguments (e.g., `cat skills.txt`)
  - Case-insensitive
  - Unix-style aliases
- **History Navigation**: ↑/↓ arrows to browse previous commands
- **Error Handling**: Clear error messages with suggestions

### Draggable Game Windows
- **Launch**: Type `snake` or `typing` in terminal
- **Drag**: Click and hold title bar to move
- **Maximize**: Click maximize icon for fullscreen
- **Close**: ESC key (only closes game, not terminal) or X button
- **Multiple Windows**: Open several games at once with auto-cascade positioning
- **Z-Index**: Always appears above terminal blur (z-10000)

### Snake Game Features
- **Grid**: 15×15 cells (20px each)
- **Controls**: 
  - WASD or arrow keys to move
  - Space to pause/restart
  - R to restart after game over
  - ESC to quit
- **Input Handling**: 
  - Direction queue (max 2 buffered inputs)
  - useRef-based direction tracking (no state lag)
  - 120ms game loop for smooth gameplay
- **Scoring**: 
  - 10 points per food
  - Session high score tracking
  - "NEW HIGH SCORE" celebration
- **Restart System**: 
  - No auto-close on game over
  - Brutalist restart/quit buttons
  - Complete state reset
  - High score persistence

### Typing Speed Test
- **Phrases**: 6 developer-themed typing challenges
- **Metrics**: 
  - Real-time WPM calculation
  - Character accuracy percentage
- **Visual Feedback**: 
  - Green for correct characters
  - Red for errors
  - Current character highlighted
- **Controls**: 
  - Start typing to begin
  - ESC to quit
  - Auto-complete detection

### Custom Cursor
- ASCII characters for different states (×, +, ◆)
- Always visible (desktop & loading screen)
- GPU-accelerated for smooth tracking
- Z-index 99999 (highest priority)
- Disabled on mobile/touch devices

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
- `--destructive`: Red (for errors/game over)
- `--success`: Green (for success states)
- Auto dark mode detection with manual toggle

## ⌨️ Keyboard Shortcuts

- `T` - Toggle terminal
- `ESC` - Close terminal (only when no games open) or quit game
- `Tab` - Autocomplete terminal command
- `↑/↓` - Navigate command history
- `Space` - Pause/restart Snake game
- `R` - Restart Snake game after game over
- `WASD/Arrows` - Control Snake direction

## 🎮 Game Controls

### Snake
- **Movement**: Arrow keys or WASD
- **Pause**: Space bar
- **Restart**: R key or click RESTART button
- **Quit**: ESC key or click QUIT button

### Typing Test
- **Start**: Begin typing when ready
- **Quit**: ESC key
- Auto-completes when phrase is finished

## 🎨 Design System

### Colors (HSL)
```css
--primary: 192 100% 50%;      /* Cyan */
--accent: 15 86% 59%;         /* Orange */
--destructive: 0 84% 60%;     /* Red */
--success: 142 76% 36%;       /* Green */
```

### Typography
- **Primary Font**: System mono stack
- **Headings**: Bold, uppercase, tracking-wider
- **Body**: Regular weight, tight leading

### Borders & Shadows
- **Border Width**: 3px-5px (brutalist thick borders)
- **Shadow**: `8px 8px 0px 0px rgba(0,0,0,1)` (harsh brutalist shadow)
- **No Rounded Corners**: Sharp 90° angles everywhere

## 📄 License

This is a personal portfolio project.

## 🎯 Performance Optimizations

- **useRef for Game State**: Prevents React re-render lag in Snake game
- **Direction Queue**: Buffers rapid inputs for responsive gameplay
- **GPU Acceleration**: `will-change` and `transform` for smooth animations
- **Lazy Loading**: Code splitting for optimal bundle size
- **Web Audio API**: Oscillator-based sounds (no audio file downloads)
- **Event Delegation**: Efficient keyboard listener management
- **Memoization**: useCallback for stable function references

## 🐛 Known Features (Not Bugs!)

- Terminal auto-closes if you click outside (intentional backdrop dismiss)
- Snake game speed is fixed at 120ms (by design for consistent difficulty)
- High scores reset on page refresh (session-based, no localStorage)
- Custom cursor disabled on mobile (native touch UX is better)
- Sound effects start muted (prevents unexpected audio on page load)

## 🚀 Future Ideas

- [ ] Leaderboard for Snake high scores (localStorage)
- [ ] More mini-games (Tetris, Pong, Breakout)
- [ ] Terminal themes (green phosphor, amber, etc.)
- [ ] Command aliases customization
- [ ] Persistent sound preference
- [ ] More easter eggs and hidden commands

## 🔗 Links

- **Repository**: https://github.com/khvedela/paris-angular-drive
- **Live Demo**: [Your deployed URL here]

---

Built with React, TypeScript, and Tailwind CSS. No AI-generated corporate poetry. No spinning cubes. Just work that matters.

**Press `T` to experience the terminal. Type `help` to get started. Type `snake` for a break. Enjoy! 🎮**
