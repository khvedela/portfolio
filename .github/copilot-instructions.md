# Copilot Instructions: Paris Angular Drive (CV Portfolio)

## Project Overview

This is a **personal CV/portfolio website** built as a single-page React application. Despite the repo name "paris-angular-drive", this is a **React + TypeScript + Vite** project, not Angular. The site is a digital resume with print-optimized styling and dark mode support.

## Architecture & Tech Stack

**Core Stack:**

- React 18 + TypeScript + Vite (SWC compiler)
- React Router v6 (minimal routing: `/` and `404`)
- Tailwind CSS + shadcn/ui component library
- TanStack Query (QueryClient setup in `App.tsx`, though no API calls currently)

**Styling System:**

- Tailwind with CSS variables for theming (`src/index.css`)
- Dark mode via manual class toggle (not next-themes despite being in dependencies)
- HSL color system with semantic tokens: `--primary`, `--accent`, `--muted-foreground`, etc.
- Print-specific styles: `.no-print` class and `@media print` rules for CV printing
- Custom utility classes: `print-break-avoid` for pagination control

**Component Organization:**

- `src/components/CV*.tsx`: Content sections (Header, About, CaseStudies, TechStack, Education, Languages)
- `src/components/ui/`: shadcn components (40+ pre-built components, only Button/Badge actively used)
- Path alias `@/` points to `src/` (configured in `vite.config.ts`, `tsconfig.json`, `components.json`)

## Development Workflow

**Package Manager:** Uses **Bun** (see `bun.lockb`), but npm also works.

**Commands:**

```bash
bun dev          # Dev server on http://[::]:8080
bun build        # Production build
bun build:dev    # Development mode build
bun lint         # ESLint check
bun preview      # Preview production build
```

**Key Dev Features:**

- Hot reload via Vite SWC plugin
- ESLint configured with TypeScript, React Hooks, React Refresh rules
- TypeScript strict mode **disabled** (`noImplicitAny: false`, `strictNullChecks: false`)

## Project-Specific Conventions

### Component Patterns

1. **CV Components are pure presentational** - no hooks, no state, just JSX with hardcoded content
2. **Dark mode implementation**: Manual toggle in `Index.tsx` using `document.documentElement.classList.toggle('dark')`
3. **Icon usage**: Lucide React for all icons (`<Mail />`, `<Phone />`, etc.)
4. **Styling pattern**: Combine Tailwind utilities with `cn()` helper (`lib/utils.ts`) for conditional classes

### File Naming & Structure

- Component files: PascalCase (e.g., `CVHeader.tsx`, `NotFound.tsx`)
- UI components: lowercase with hyphens (e.g., `button.tsx`, `alert-dialog.tsx`)
- All components use named exports (NOT default exports) except page components

### Content Strategy

This is a **personal CV** - all content is inline JSX, no CMS or API. Key content areas:

- **CVHeader.tsx**: Contact info, social links (hardcoded personal data)
- **CVCaseStudies.tsx**: Work experience as case studies with metrics, problem/approach/results structure
- **CVTechStack.tsx**: Skills/technologies organized by category
- **Tone/voice**: Direct, anti-corporate, no buzzwords (see footer: "No AI-generated corporate poetry")

## Styling & Theme System

### CSS Variables Architecture

All colors defined as HSL in `src/index.css` under `:root` and `.dark`:

- Semantic naming: `--background`, `--foreground`, `--primary`, `--accent`, `--muted-foreground`
- Surface tokens: `--surface`, `--surface-elevated` (currently unused but defined)
- Utility colors: `--success`, `--warning`, `--destructive`

### Print Optimization

Critical for CV functionality:

- `.no-print` hides elements when printing (e.g., theme toggle, print button)
- `print-break-avoid` prevents page breaks mid-section
- Print styles reset dark mode to white background
- Uses `@media print` for print-specific overrides

### Component Styling Pattern

```tsx
// Standard pattern: Tailwind utilities + hover states + transitions
<Button className="gap-2 hover:scale-105 transition-transform">
  <Printer size={18} />
  Print CV
</Button>
```

## Routing & Navigation

**Minimal routing** via React Router:

- `/` → `Index.tsx` (main CV page)
- `*` → `NotFound.tsx` (404 catch-all)
- **NO multi-page navigation** - this is a single-page CV

Add new routes in `App.tsx` **above** the catch-all `<Route path="*">`:

```tsx
<Route path="/new-page" element={<NewPage />} />;
{
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
}
<Route path="*" element={<NotFound />} />;
```

## Integration Points & Dependencies

**External Services:** None. No APIs, no backend, no analytics (currently).

**UI Library:** shadcn/ui components controlled via `components.json`:

- Style: "default"
- Base color: "slate"
- CSS variables enabled
- Component aliases configured for `@/components`, `@/lib`, `@/hooks`

## Common Tasks & Examples

### Adding a New CV Section

1. Create `src/components/CVNewSection.tsx`
2. Import and use in `src/pages/Index.tsx`
3. Follow existing pattern: section title with icon, content in prose wrapper

Example:

```tsx
import { Icon } from "lucide-react";

const CVNewSection = () => {
  return (
    <section className="mb-12 print-break-avoid">
      <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
        <Icon size={24} className="text-primary" />
        Section Title
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* Content */}
      </div>
    </section>
  );
};
```

### Adding a shadcn Component

Use the shadcn CLI (components.json already configured):

```bash
npx shadcn@latest add [component-name]
```

This auto-adds to `src/components/ui/` with correct aliases.

### Modifying Theme Colors

Edit `src/index.css` under `:root` and `.dark` selectors. Use HSL format:

```css
--primary: 220 70% 50%; /* H S L - no 'hsl()' wrapper */
```

## Critical Files

- `src/App.tsx`: Router setup, global providers (QueryClient, TooltipProvider)
- `src/pages/Index.tsx`: Main CV page with theme toggle + print handler
- `src/index.css`: Complete design system, all color tokens, print styles
- `components.json`: shadcn config (don't edit manually)
- `vite.config.ts`: Path aliases, dev server port (8080)

## What NOT to Do

- ❌ Don't assume Angular conventions (this is React despite repo name)
- ❌ Don't add state management (no Redux/Zustand needed for static CV)
- ❌ Don't fetch data from APIs (content is hardcoded by design)
- ❌ Don't use default exports for components (use named exports)
- ❌ Don't break print layout (always test with print preview)
- ❌ Don't remove `.no-print` class from interactive elements

## Testing & Quality

**Current state:** No test files present. ESLint configured but lenient (unused vars disabled, no strict TypeScript).

If adding tests, use Vite's testing setup (not in current config).
