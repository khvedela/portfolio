# Modern Layouts: Flexbox & Responsive Design

## Introduction to Flexbox

**Flexbox** (Flexible Box Layout) is a powerful CSS layout system for creating flexible, responsive designs. It makes it easy to align and distribute space among items in a container.

### When to Use Flexbox

✅ Navigation bars  
✅ Card layouts  
✅ Centering content  
✅ Evenly spaced items  
✅ Responsive designs  

## Flexbox Basics

### Enabling Flexbox

```css
.container {
  display: flex;
}
```

That's it! Now the container becomes a "flex container" and its direct children become "flex items."

### Main Axis vs Cross Axis

Flexbox works along two axes:

```
Main Axis (default: horizontal) →
┌─────────────────────────────────┐
│ [Item 1] [Item 2] [Item 3]     │ ← Cross Axis
└─────────────────────────────────┘
```

## Container Properties

### flex-direction

Controls the main axis direction:

```css
.container {
  display: flex;
  flex-direction: row;         /* Default: left to right → */
  flex-direction: row-reverse; /* Right to left ← */
  flex-direction: column;      /* Top to bottom ↓ */
  flex-direction: column-reverse; /* Bottom to top ↑ */
}
```

### justify-content

Aligns items along the **main axis**:

```css
.container {
  display: flex;
  justify-content: flex-start;   /* Default: items at start */
  justify-content: flex-end;     /* Items at end */
  justify-content: center;       /* Items centered */
  justify-content: space-between; /* Equal space between items */
  justify-content: space-around;  /* Equal space around items */
  justify-content: space-evenly;  /* Equal space everywhere */
}
```

### align-items

Aligns items along the **cross axis**:

```css
.container {
  display: flex;
  align-items: stretch;      /* Default: fill container height */
  align-items: flex-start;   /* Align to top */
  align-items: flex-end;     /* Align to bottom */
  align-items: center;       /* Center vertically */
  align-items: baseline;     /* Align text baselines */
}
```

### flex-wrap

Controls whether items wrap to new lines:

```css
.container {
  display: flex;
  flex-wrap: nowrap;   /* Default: all items on one line */
  flex-wrap: wrap;     /* Items wrap to new lines */
  flex-wrap: wrap-reverse; /* Wrap in reverse order */
}
```

### gap

Space between flex items (modern property):

```css
.container {
  display: flex;
  gap: 20px;           /* Space between all items */
  row-gap: 15px;       /* Space between rows */
  column-gap: 25px;    /* Space between columns */
}
```

## Item Properties

### flex-grow

How much an item should grow to fill available space:

```css
.item {
  flex-grow: 0;   /* Default: don't grow */
  flex-grow: 1;   /* Grow to fill space */
  flex-grow: 2;   /* Grow twice as much as flex-grow: 1 items */
}
```

### flex-shrink

How much an item should shrink if needed:

```css
.item {
  flex-shrink: 1;   /* Default: can shrink */
  flex-shrink: 0;   /* Don't shrink */
}
```

### flex-basis

Initial size before growing/shrinking:

```css
.item {
  flex-basis: auto;   /* Default: based on content */
  flex-basis: 200px;  /* Start at 200px */
  flex-basis: 50%;    /* 50% of container */
}
```

### flex Shorthand

```css
.item {
  flex: 1;                  /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 0 200px;          /* Don't grow, don't shrink, 200px wide */
  flex: 1 1 auto;           /* Grow, shrink, based on content */
}
```

### align-self

Override `align-items` for individual items:

```css
.special-item {
  align-self: flex-end;  /* Only this item aligns to end */
}
```

## Practical Examples

### Centered Content

```css
.center-everything {
  display: flex;
  justify-content: center;  /* Center horizontally */
  align-items: center;      /* Center vertically */
  height: 100vh;            /* Full viewport height */
}
```

### Navigation Bar

```html
<nav class="navbar">
  <div class="logo">Logo</div>
  <div class="nav-links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}
```

### Card Grid

```html
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* Grow, shrink, minimum 300px */
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
}
```

## Responsive Design Basics

### Media Queries

Make layouts adapt to different screen sizes:

```css
/* Mobile first approach */
.container {
  display: flex;
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Common Breakpoints

```css
/* Mobile: Default */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### Responsive Units

```css
.responsive {
  width: 90%;           /* Percentage of parent */
  max-width: 1200px;    /* Never bigger than this */
  padding: 5vw;         /* 5% of viewport width */
  font-size: 2vw;       /* Scales with viewport */
  height: 50vh;         /* 50% of viewport height */
}
```

### Responsive Typography

```css
html {
  font-size: 14px;  /* Small screens */
}

@media (min-width: 768px) {
  html {
    font-size: 16px;  /* Larger screens */
  }
}

/* Now all rem units scale automatically! */
h1 {
  font-size: 2rem;  /* 28px on mobile, 32px on tablet+ */
}
```

## Complete Responsive Layout

```html
<div class="page">
  <header class="header">Header</header>
  <main class="main">Main Content</main>
  <aside class="sidebar">Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>
```

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header,
.footer {
  padding: 20px;
  background: #333;
  color: white;
}

.main {
  flex: 1;  /* Grows to fill available space */
  padding: 20px;
}

.sidebar {
  padding: 20px;
  background: #f0f0f0;
}

/* Desktop layout */
@media (min-width: 768px) {
  .page {
    flex-wrap: wrap;
  }
  
  .header,
  .footer {
    width: 100%;
  }
  
  .main {
    flex: 1;
    min-width: 60%;
  }
  
  .sidebar {
    flex: 0 0 300px;  /* Fixed 300px width */
  }
}
```

## Key Takeaways

✅ `display: flex` activates Flexbox on a container  
✅ `justify-content` aligns items along the main axis  
✅ `align-items` aligns items along the cross axis  
✅ `flex-wrap` allows items to wrap to new lines  
✅ `gap` creates space between items (easier than margins)  
✅ Use `flex` shorthand on items for responsive sizing  
✅ Media queries make designs responsive  
✅ Mobile-first approach: start with mobile, enhance for larger screens  

## What's Next?

You've now learned the fundamentals of CSS! Here's what you can explore next:

🎨 **CSS Grid** - For complex two-dimensional layouts  
✨ **Animations & Transitions** - Bring your designs to life  
🎭 **CSS Variables** - Theming and maintainable code  
📱 **Advanced Responsive** - Progressive enhancement, container queries  
🎯 **CSS Architecture** - BEM, utility-first (Tailwind), CSS-in-JS  

**Practice is key!** Build real projects, experiment, and break things. That's how you truly learn CSS.

Happy styling! 🚀
