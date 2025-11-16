# Introduction to CSS

## What is CSS?

**CSS (Cascading Style Sheets)** is the language used to style and layout web pages. While HTML provides the structure and content, CSS controls how that content looks.

Think of it this way:
- **HTML** = The bones and organs of a website
- **CSS** = The skin, clothes, and appearance

## Why Do We Need CSS?

Without CSS, every website would look like a plain document from the 1990s - just black text on a white background. CSS allows us to:

- **Style text**: Change colors, fonts, sizes, and spacing
- **Layout pages**: Position elements exactly where we want them
- **Create responsive designs**: Make sites look good on phones, tablets, and desktops
- **Add visual effects**: Animations, transitions, shadows, and more

## How CSS Works

CSS consists of **rules** that tell the browser how to display HTML elements. Each rule has two main parts:

1. **Selector**: Which HTML elements to style
2. **Declaration block**: What styles to apply

```css
selector {
  property: value;
  another-property: value;
}
```

### Example

```css
h1 {
  color: blue;
  font-size: 32px;
}
```

This rule says: "Find all `<h1>` elements and make them blue with a font size of 32 pixels."

## Three Ways to Add CSS

### 1. Inline CSS (Not Recommended)
Style directly in the HTML element using the `style` attribute:

```html
<p style="color: red;">This text is red.</p>
```

**Downside**: Hard to maintain, mixes content with presentation.

### 2. Internal CSS
Put CSS in a `<style>` tag inside the HTML document's `<head>`:

```html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
```

**Good for**: Small single-page websites or testing.

### 3. External CSS (Best Practice)
Create a separate `.css` file and link it to your HTML:

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

**Best for**: Real projects - keeps code organized and reusable.

## CSS Syntax Breakdown

Let's break down a CSS rule:

```css
p {
  color: navy;
  font-size: 16px;
  line-height: 1.5;
}
```

- `p` - **Selector** (targets all paragraph elements)
- `{ }` - **Declaration block** (contains all the styles)
- `color: navy;` - **Declaration** (property + value)
- `color` - **Property** (what aspect to style)
- `navy` - **Value** (how to style it)
- `;` - **Semicolon** (separates declarations)

## Your First CSS

Let's style a simple web page:

**HTML (index.html):**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
  <title>My Styled Page</title>
</head>
<body>
  <h1>Welcome to CSS</h1>
  <p>CSS makes the web beautiful!</p>
</body>
</html>
```

**CSS (styles.css):**
```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

p {
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
}
```

## Key Takeaways

✅ CSS controls the visual presentation of HTML  
✅ CSS rules have selectors and declaration blocks  
✅ External stylesheets are the best practice  
✅ Properties and values define how elements look  
✅ Semicolons separate declarations; colons separate properties from values  

In the next lesson, we'll dive deeper into CSS selectors and how to target specific elements!
