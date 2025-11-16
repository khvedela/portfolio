# Colors, Typography, and Visual Design

## Working with Colors

### Color Formats

CSS supports multiple ways to define colors:

#### 1. Named Colors
```css
.box {
  color: red;
  background-color: lightblue;
}
```

**140 named colors** available: `red`, `blue`, `green`, `purple`, `tomato`, `coral`, `dodgerblue`, etc.

#### 2. Hexadecimal (Hex)
```css
.box {
  color: #ff0000;        /* Red */
  background: #0066cc;   /* Blue */
  border-color: #333;    /* Dark gray (shorthand for #333333) */
}
```

Format: `#RRGGBB` (Red, Green, Blue in hexadecimal)

#### 3. RGB/RGBA
```css
.box {
  color: rgb(255, 0, 0);              /* Red */
  background: rgba(0, 102, 204, 0.5); /* Blue with 50% transparency */
}
```

- **RGB**: Red, Green, Blue (0-255)
- **RGBA**: RGB + Alpha (opacity 0-1)

#### 4. HSL/HSLA (Most Intuitive!)
```css
.box {
  color: hsl(0, 100%, 50%);           /* Red */
  background: hsla(210, 100%, 40%, 0.8); /* Blue with 80% opacity */
}
```

- **H** (Hue): 0-360 (color wheel: 0=red, 120=green, 240=blue)
- **S** (Saturation): 0-100% (0% = gray, 100% = vivid)
- **L** (Lightness): 0-100% (0% = black, 100% = white, 50% = pure color)

### Color Properties

```css
.text {
  color: #333;                    /* Text color */
  background-color: #f0f0f0;      /* Background */
  border-color: #ddd;             /* Border */
}

.link {
  color: blue;
  text-decoration-color: red;     /* Underline color */
}
```

### Modern Color Features

```css
.gradient {
  background: linear-gradient(to right, #667eea, #764ba2);
}

.semi-transparent {
  background-color: rgba(0, 0, 0, 0.5); /* 50% transparent black */
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Typography

### Font Family

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  font-family: 'Georgia', serif;
}

code {
  font-family: 'Courier New', monospace;
}
```

**Font stack**: Browser tries first font, falls back to next if unavailable.

**Font categories**:
- `serif` - Traditional, elegant (Georgia, Times New Roman)
- `sans-serif` - Modern, clean (Arial, Helvetica, Verdana)
- `monospace` - Code, technical (Courier, Consolas)
- `cursive` - Handwriting-style
- `fantasy` - Decorative

### Google Fonts (Web Fonts)

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
```

```css
body {
  font-family: 'Roboto', sans-serif;
}
```

### Font Size

```css
p {
  font-size: 16px;      /* Pixels */
  font-size: 1em;       /* Relative to parent */
  font-size: 1rem;      /* Relative to root element (html) */
  font-size: 100%;      /* Percentage of parent */
}
```

**Best practice**: Use `rem` for scalable, accessible typography:

```css
html {
  font-size: 16px; /* Base size */
}

h1 {
  font-size: 2.5rem; /* 40px */
}

p {
  font-size: 1rem; /* 16px */
}

small {
  font-size: 0.875rem; /* 14px */
}
```

### Font Weight

```css
.normal {
  font-weight: normal;  /* or 400 */
}

.bold {
  font-weight: bold;    /* or 700 */
}

.light {
  font-weight: 300;
}

.extra-bold {
  font-weight: 900;
}
```

### Font Style

```css
.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}
```

### Text Properties

```css
.text {
  text-align: left;          /* left, right, center, justify */
  text-decoration: underline; /* none, underline, line-through */
  text-transform: uppercase;  /* uppercase, lowercase, capitalize */
  letter-spacing: 2px;        /* Space between letters */
  word-spacing: 5px;          /* Space between words */
  line-height: 1.6;           /* Space between lines (multiplier) */
}
```

### Advanced Typography

```css
.paragraph {
  text-indent: 30px;          /* First line indent */
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Shadow effect */
  white-space: nowrap;        /* Prevent text wrapping */
  text-overflow: ellipsis;    /* Add ... for overflow */
  overflow: hidden;           /* Hide overflow */
}
```

## Putting It Together: Beautiful Text

```html
<article class="blog-post">
  <h1>The Art of Web Typography</h1>
  <p class="lead">Typography is the foundation of great web design.</p>
  <p>Good typography makes content readable, accessible, and beautiful. It guides the reader's eye and creates visual hierarchy.</p>
</article>
```

```css
.blog-post {
  max-width: 700px;
  margin: 50px auto;
  padding: 40px;
  font-family: 'Georgia', serif;
  line-height: 1.8;
  color: #333;
}

.blog-post h1 {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.blog-post .lead {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.blog-post p {
  margin-bottom: 1.5rem;
  text-align: justify;
}
```

## Color Schemes and Combinations

### Contrast for Readability

```css
/* Good contrast */
.readable {
  background: white;
  color: #222;
}

/* Poor contrast - avoid! */
.hard-to-read {
  background: lightgray;
  color: gray;
}
```

**Tools**: Use WebAIM Contrast Checker for accessibility.

### Color Palettes

```css
:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --accent: #e74c3c;
  --text: #2c3e50;
  --background: #ecf0f1;
}

body {
  background-color: var(--background);
  color: var(--text);
}

.button-primary {
  background-color: var(--primary);
  color: white;
}
```

**Using CSS variables** makes maintaining color schemes easy!

## Key Takeaways

✅ Multiple color formats: named, hex, RGB, HSL  
✅ HSL is most intuitive for creating color variations  
✅ Use `rem` units for scalable typography  
✅ `line-height: 1.5-1.8` improves readability  
✅ Font stack provides fallbacks  
✅ Good contrast is crucial for accessibility  
✅ CSS variables make color management easier  

Next: Flexbox and Grid - powerful layout tools!
