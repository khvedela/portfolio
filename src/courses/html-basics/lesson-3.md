# Working with Text: Headings and Paragraphs

Now that you understand HTML structure, let's add some actual content!

## Headings (`<h1>` to `<h6>`)

HTML has 6 levels of headings:

```html
<h1>Main Title - Biggest</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Rarely used</h5>
<h6>Almost never used</h6>
```

### How They Look (Biggest to Smallest)

<h1>This is H1</h1>
<h2>This is H2</h2>
<h3>This is H3</h3>
<h4>This is H4</h4>
<h5>This is H5</h5>
<h6>This is H6</h6>

### Heading Hierarchy Rules

Think of headings like a book's table of contents:

```html
<h1>The Book Title</h1>
  <h2>Chapter 1</h2>
    <h3>Section 1.1</h3>
    <h3>Section 1.2</h3>
  <h2>Chapter 2</h2>
    <h3>Section 2.1</h3>
```

**Rules:**
- Use **one** `<h1>` per page (your main title)
- Don't skip levels (h1 → h2 → h3, not h1 → h4)
- Headings create document outline for accessibility

## Paragraphs (`<p>`)

Paragraphs are the most common text element:

```html
<p>This is a paragraph. It can be as long as you want.</p>
<p>This is another paragraph. Browsers add spacing between them automatically.</p>
```

### Paragraph Behavior

```html
<p>This text
will appear
on one line
despite multiple lines in code.</p>
```

**Result:** "This text will appear on one line despite multiple lines in code."

Browsers ignore extra whitespace and line breaks inside paragraphs.

## Line Breaks (`<br>`)

Want to force a line break inside a paragraph?

```html
<p>First line<br>Second line<br>Third line</p>
```

**Result:**  
First line  
Second line  
Third line

**Note:** `<br>` is self-closing (no `</br>` needed)

## Text Formatting Elements

### Bold and Strong

```html
<b>This is bold</b> (visual only)
<strong>This is strong</strong> (important, semantic)
```

Use `<strong>` for important text. It's better for accessibility.

### Italic and Emphasis

```html
<i>This is italic</i> (visual only)
<em>This is emphasized</em> (emphasis, semantic)
```

Use `<em>` when you want to emphasize something.

### Other Common Text Elements

```html
<small>Small text</small>
<mark>Highlighted text</mark>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>
```

## Real-World Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Blog Post</title>
</head>
<body>
  <h1>How I Built My First Website</h1>
  
  <p>Last week, I decided to learn web development. It seemed <strong>scary at first</strong>, but it turned out to be easier than I thought!</p>
  
  <h2>What I Learned</h2>
  <p>HTML is the foundation of every website. It's not a programming language - it's a <em>markup language</em>.</p>
  
  <h2>My First Project</h2>
  <p>I built a simple portfolio page with:</p>
  <p>• An introduction<br>• My skills<br>• Contact information</p>
  
  <h2>Conclusion</h2>
  <p>If you're thinking about learning web development, <strong>just start</strong>. Build something simple. You'll be amazed at how quickly you progress!</p>
</body>
</html>
```

## Best Practices

✅ **Do:**
- Use one `<h1>` per page
- Follow heading hierarchy (don't skip levels)
- Use `<p>` for paragraphs
- Use `<strong>` and `<em>` instead of `<b>` and `<i>`

❌ **Don't:**
- Use headings just to make text big (use CSS for styling)
- Use `<br>` to create spacing (use CSS margins)
- Put headings inside paragraphs

## Key Takeaways

1. **Headings** create structure and hierarchy
2. **Paragraphs** are for body text
3. **Semantic elements** (`<strong>`, `<em>`) are better than purely visual ones (`<b>`, `<i>`)
4. **Proper structure helps** screen readers and SEO

Next up: Links and images - the elements that make the web interactive!
