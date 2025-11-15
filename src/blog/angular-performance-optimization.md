# 40% Faster: How I Optimized Our Angular Banking App

Load times matter in banking. When you're serving 100k+ users daily, every second counts. Here's how I reduced our Angular app's initial load time from 4.2s to 2.5s.

## The Problem

TBC Bank's web app was slow. Not broken, not crashing - just slow enough that users noticed. In banking, that's a problem. People checking their balance at 8am before work don't have patience for loading spinners.

**Initial metrics:**
- First Contentful Paint: 2.1s
- Time to Interactive: 4.2s
- Bundle size: 2.8MB
- Lighthouse score: 67/100

## What I Did

### 1. Lazy Loading Everything
Instead of loading the entire app upfront, I split it into modules:
- Auth module (always needed)
- Dashboard (lazy)
- Transfers (lazy)
- Cards management (lazy)

Result: Initial bundle dropped from 2.8MB to 980KB.

### 2. RxJS Import Optimization
We were importing entire RxJS library everywhere:
```typescript
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
```

Changed to:
```typescript
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
```

Saved 340KB in production build.

### 3. Image Optimization
- Converted PNGs to WebP (70% size reduction)
- Added lazy loading to images below the fold
- Implemented progressive image loading

### 4. Angular-Specific Wins
- Enabled Ahead-of-Time compilation (AOT)
- Removed unused dependencies (we had 23!)
- Implemented OnPush change detection strategy
- Used trackBy in *ngFor loops

## The Results

**After optimization:**
- First Contentful Paint: 1.2s (43% faster)
- Time to Interactive: 2.5s (40% faster)
- Bundle size: 980KB (65% smaller)
- Lighthouse score: 94/100

## What Actually Mattered

Not all optimizations are equal. Here's what had the biggest impact:

1. **Lazy loading** - 40% of improvement
2. **Bundle optimization** - 30% of improvement
3. **Image optimization** - 20% of improvement
4. **Everything else** - 10% of improvement

## Lessons Learned

- **Measure first** - I wasted 2 days optimizing things that didn't matter
- **User perception > actual speed** - Skeleton screens made it feel faster than raw milliseconds
- **Bundle size is everything** - Every KB counts on mobile networks
- **Angular CLI does a lot** - But you still need to help it

## Tools I Used

- Chrome DevTools Performance tab
- Webpack Bundle Analyzer
- Lighthouse CI
- Real user monitoring (RUM) data

## The Real Win

Users stopped complaining about speed. Support tickets dropped. Bounce rate decreased by 12%. That's what matters.

---

Performance isn't about hitting arbitrary metrics. It's about respecting users' time. In banking, trust starts with speed.
