# CSS Selectors: Targeting Elements

## Understanding Selectors

Selectors are how we **target** HTML elements to style them. Think of selectors as a way to say "Hey browser, find these specific elements and apply these styles."

## Basic Selectors

### 1. Element Selector
Targets all elements of a specific type:

```css
p {
  color: black;
}

h1 {
  font-size: 36px;
}
```

**When to use**: When you want to style ALL elements of a certain type.

### 2. Class Selector
Targets elements with a specific class attribute. Uses a dot (`.`) prefix:

**HTML:**
```html
<p class="highlight">This paragraph has a class.</p>
<p>This paragraph doesn't.</p>
```

**CSS:**
```css
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```

**When to use**: For styles you'll reuse across multiple elements.

### 3. ID Selector
Targets a single unique element with a specific ID. Uses a hash (`#`) prefix:

**HTML:**
```html
<div id="header">Site Header</div>
```

**CSS:**
```css
#header {
  background-color: navy;
  color: white;
  padding: 20px;
}
```

**When to use**: For unique elements that appear only once per page.

### 4. Universal Selector
Targets EVERY element on the page:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**When to use**: For CSS resets or styles that should apply globally.

## Combining Selectors

### Multiple Selectors (Grouping)
Apply the same styles to multiple elements:

```css
h1, h2, h3 {
  font-family: 'Georgia', serif;
  color: #333;
}
```

### Descendant Selector
Target elements inside other elements (separated by space):

```css
article p {
  line-height: 1.8;
}
```

This styles ALL `<p>` elements inside `<article>` elements.

### Child Selector
Target direct children only (use `>`):

```css
ul > li {
  list-style-type: square;
}
```

This styles only `<li>` elements that are **direct children** of `<ul>`.

### Adjacent Sibling Selector
Target an element immediately after another (use `+`):

```css
h2 + p {
  font-size: 18px;
  font-weight: bold;
}
```

Styles the first `<p>` right after an `<h2>`.

## Attribute Selectors

Target elements based on their attributes:

```css
/* Links that start with https */
a[href^="https"] {
  color: green;
}

/* Inputs with type="text" */
input[type="text"] {
  border: 2px solid #ccc;
  padding: 10px;
}

/* Images with alt attribute */
img[alt] {
  border: 3px solid gold;
}
```

## Pseudo-Classes

Target elements in specific states:

```css
/* Unvisited links */
a:link {
  color: blue;
}

/* Visited links */
a:visited {
  color: purple;
}

/* Mouse hover */
a:hover {
  color: red;
  text-decoration: underline;
}

/* First child */
li:first-child {
  font-weight: bold;
}

/* Every other row */
tr:nth-child(even) {
  background-color: #f0f0f0;
}
```

## Pseudo-Elements

Target specific parts of elements:

```css
/* First letter of paragraphs */
p::first-letter {
  font-size: 32px;
  font-weight: bold;
  color: red;
}

/* First line */
p::first-line {
  font-variant: small-caps;
}

/* Before element */
h2::before {
  content: "→ ";
  color: blue;
}

/* After element */
a::after {
  content: " ↗";
}
```

## Specificity: Which Rule Wins?

When multiple rules target the same element, **specificity** determines which styles apply:

**Order of importance (highest to lowest):**
1. Inline styles (`style` attribute)
2. IDs (`#header`)
3. Classes, attributes, pseudo-classes (`.highlight`, `[type="text"]`, `:hover`)
4. Elements, pseudo-elements (`p`, `::before`)

**Example:**
```css
p { color: black; }           /* Specificity: 1 */
.intro { color: blue; }       /* Specificity: 10 */
#main { color: green; }       /* Specificity: 100 */
```

If a `<p>` has `class="intro"` and `id="main"`, it will be **green** (ID wins).

## Practical Example

```html
<nav id="main-nav">
  <ul>
    <li><a href="/" class="active">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```css
/* Style the nav */
#main-nav {
  background-color: #333;
  padding: 10px;
}

/* Style all links in nav */
#main-nav a {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  display: inline-block;
}

/* Hover effect */
#main-nav a:hover {
  background-color: #555;
}

/* Active page */
#main-nav a.active {
  background-color: #007bff;
  font-weight: bold;
}
```

## Key Takeaways

✅ **Element selectors** target all elements of a type  
✅ **Class selectors** (`.className`) are reusable  
✅ **ID selectors** (`#idName`) target unique elements  
✅ **Combinators** let you target nested or adjacent elements  
✅ **Pseudo-classes** style elements in specific states  
✅ **Specificity** determines which styles win when there are conflicts  

Next up: The CSS Box Model - understanding how elements are sized and spaced!
