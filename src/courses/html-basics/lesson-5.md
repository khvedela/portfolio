# Semantic HTML: Writing Meaningful Code

Semantic HTML means using tags that **describe their meaning**, not just their appearance.

## Why Semantic HTML Matters

Compare these two approaches:

**Non-semantic (bad):**
```html
<div class="header">
  <div class="nav">Links here</div>
</div>
<div class="main">
  <div class="article">Content here</div>
</div>
<div class="footer">Footer here</div>
```

**Semantic (good):**
```html
<header>
  <nav>Links here</nav>
</header>
<main>
  <article>Content here</article>
</main>
<footer>Footer here</footer>
```

Both can look identical, but the semantic version:
- ✅ Helps screen readers understand page structure
- ✅ Improves SEO (search engines understand content better)
- ✅ Makes code more readable
- ✅ Follows web standards

## Key Semantic Elements

### Page Structure

**`<header>`** - Top section of page or article
```html
<header>
  <h1>My Website</h1>
  <nav><!-- navigation here --></nav>
</header>
```

**`<nav>`** - Navigation links
```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
```

**`<main>`** - Main content (use once per page)
```html
<main>
  <h1>Blog Posts</h1>
  <!-- main content here -->
</main>
```

**`<footer>`** - Bottom section
```html
<footer>
  <p>&copy; 2025 My Website</p>
  <a href="/privacy">Privacy Policy</a>
</footer>
```

### Content Sections

**`<article>`** - Self-contained content (blog post, news article)
```html
<article>
  <h2>How to Learn HTML</h2>
  <p>Published: January 15, 2025</p>
  <p>Article content here...</p>
</article>
```

**`<section>`** - Thematic grouping of content
```html
<section>
  <h2>Our Services</h2>
  <p>We offer web development, design, and consulting.</p>
</section>
```

**`<aside>`** - Tangentially related content (sidebar, callouts)
```html
<aside>
  <h3>Related Links</h3>
  <ul>
    <li><a href="/guide">HTML Guide</a></li>
    <li><a href="/tips">Pro Tips</a></li>
  </ul>
</aside>
```

### Text-Level Semantics

**`<strong>`** - Important text (not just bold)
```html
<p><strong>Warning:</strong> Do not skip this step!</p>
```

**`<em>`** - Emphasized text (not just italic)
```html
<p>This is <em>really</em> important to understand.</p>
```

**`<mark>`** - Highlighted/marked text
```html
<p>The <mark>deadline is tomorrow</mark>.</p>
```

**`<time>`** - Dates and times
```html
<p>Published on <time datetime="2025-01-15">January 15, 2025</time></p>
```

**`<code>`** - Code snippets
```html
<p>Use the <code>console.log()</code> function to debug.</p>
```

## Complete Semantic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Blog</title>
</head>
<body>
  
  <header>
    <h1>David's Tech Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/archive">Archive</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Learning HTML in 2025</h2>
        <p>Published on <time datetime="2025-01-15">January 15, 2025</time></p>
      </header>
      
      <p>HTML is the foundation of web development. In this post, I'll share what I learned.</p>
      
      <section>
        <h3>Why HTML Matters</h3>
        <p>Every website uses HTML. It's <strong>essential</strong> for anyone wanting to build for the web.</p>
      </section>
      
      <section>
        <h3>Getting Started</h3>
        <p>You don't need fancy tools. Just a text editor and a browser!</p>
      </section>
      
      <footer>
        <p>Tags: <a href="/tag/html">HTML</a>, <a href="/tag/beginner">Beginner</a></p>
      </footer>
    </article>
    
    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="/css-basics">CSS Basics</a></li>
        <li><a href="/js-intro">JavaScript Intro</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 David's Blog. All rights reserved.</p>
  </footer>

</body>
</html>
```

## Semantic vs Generic Elements

### When to Use `<div>` and `<span>`

**`<div>`** - Generic container (use when no semantic element fits)
```html
<div class="container">
  <!-- grouped content with no semantic meaning -->
</div>
```

**`<span>`** - Generic inline container
```html
<p>The price is <span class="highlight">$99</span></p>
```

**Rule:** Use semantic elements when possible, `<div>` and `<span>` when necessary.

## Lists (Also Semantic!)

**Unordered list** (bullet points):
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

**Ordered list** (numbered):
```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

**Description list** (term-definition pairs):
```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
```

## Accessibility Benefits

Screen readers use semantic elements to:
- Navigate by landmarks (`<nav>`, `<main>`, `<aside>`)
- Skip to main content
- Understand content hierarchy
- Provide context to users

Example: A screen reader might announce:
- "Navigation landmark" when hitting `<nav>`
- "Main landmark" when hitting `<main>`
- "Article" when hitting `<article>`

## Best Practices

✅ **Do:**
- Use `<header>`, `<nav>`, `<main>`, `<footer>` for page structure
- Use `<article>` for self-contained content
- Use `<section>` for thematic groupings
- Use one `<main>` per page
- Use semantic text elements (`<strong>`, `<em>`, `<code>`)

❌ **Don't:**
- Use `<div>` for everything
- Use `<b>` instead of `<strong>`
- Use `<i>` instead of `<em>`
- Skip semantic elements because "they look the same"

## Key Takeaways

1. **Semantic HTML** uses tags that describe meaning
2. **Improves accessibility** for screen readers
3. **Better SEO** - search engines understand structure
4. **More maintainable** code
5. **Use semantic elements** whenever possible, `<div>` only when needed

## Congratulations! 🎉

You've completed the HTML Basics course! You now know:
- What HTML is and how it works
- How to structure HTML documents
- How to use headings, paragraphs, and text elements
- How to add links and images
- How to write semantic, accessible HTML

**Next steps:**
- Build a simple personal website using what you learned
- Learn CSS to style your HTML
- Explore more HTML elements (forms, tables, etc.)

Keep building, keep learning! 🚀
