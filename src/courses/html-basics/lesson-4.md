# Links and Images: Connecting the Web

Links and images are what make the web... well, the web! Let's learn how to use them.

## Links (`<a>`)

The `<a>` tag (anchor tag) creates hyperlinks:

```html
<a href="https://google.com">Go to Google</a>
```

**Parts:**
- `href` = "hypertext reference" (where the link points)
- Content between tags = what users see and click

### External Links

```html
<a href="https://github.com">GitHub</a>
<a href="https://youtube.com">YouTube</a>
```

### Opening Links in New Tab

```html
<a href="https://google.com" target="_blank">Google</a>
```

The `target="_blank"` makes it open in a new tab.

**Best practice:** Add `rel="noopener noreferrer"` for security:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</a>
```

### Internal Links (Same Website)

```html
<a href="/about.html">About Page</a>
<a href="/contact.html">Contact</a>
<a href="../index.html">Back to Home</a>
```

Paths are relative to the current file.

### Linking to Sections (Anchors)

```html
<!-- Define the section -->
<h2 id="pricing">Pricing</h2>

<!-- Link to it -->
<a href="#pricing">Jump to Pricing</a>
```

Clicking this link scrolls to the element with `id="pricing"`.

### Email Links

```html
<a href="mailto:hello@example.com">Email Me</a>
```

Clicking opens the user's default email app.

### Phone Links

```html
<a href="tel:+1234567890">Call Us</a>
```

On mobile, this opens the phone app.

## Images (`<img>`)

The `<img>` tag displays images:

```html
<img src="cat.jpg" alt="A cute cat">
```

**Important attributes:**
- `src` = source (path to the image file)
- `alt` = alternative text (describes the image)

### Why `alt` Matters

```html
<img src="profile.jpg" alt="John Smith smiling in front of office">
```

The `alt` attribute:
- Shows if image fails to load
- Read by screen readers (accessibility!)
- Helps SEO

**Never skip the alt attribute!**

### Image Sources

**Local images:**
```html
<img src="images/logo.png" alt="Company logo">
<img src="../photos/team.jpg" alt="Team photo">
```

**External images:**
```html
<img src="https://example.com/image.jpg" alt="Description">
```

### Image Size

```html
<img src="photo.jpg" alt="Sunset" width="600" height="400">
```

You can set width/height in pixels, but **CSS is better** for responsive design.

### Common Image Formats

- **JPG/JPEG** - Photos, complex images
- **PNG** - Images with transparency, logos
- **GIF** - Animations (low quality)
- **WebP** - Modern format (better compression)
- **SVG** - Vector graphics (scales perfectly)

## Combining Links and Images

Make an image clickable:

```html
<a href="https://example.com">
  <img src="banner.jpg" alt="Click here to visit our store">
</a>
```

## Figure and Caption

Semantic way to add captions to images:

```html
<figure>
  <img src="chart.png" alt="Sales growth chart">
  <figcaption>Sales increased 40% in Q4 2024</figcaption>
</figure>
```

## Real-World Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Portfolio</title>
</head>
<body>
  <h1>David's Portfolio</h1>
  
  <img src="profile.jpg" alt="David smiling at desk" width="300">
  
  <h2>About Me</h2>
  <p>I'm a web developer from New York. Check out my work!</p>
  
  <h2>Projects</h2>
  <p>
    <a href="https://github.com/david/project1">Project 1 on GitHub</a><br>
    <a href="https://github.com/david/project2">Project 2 on GitHub</a>
  </p>
  
  <h2>Contact</h2>
  <p>
    <a href="mailto:david@example.com">Email me</a> | 
    <a href="tel:+1234567890">Call me</a>
  </p>
  
  <figure>
    <img src="certificate.jpg" alt="Web Development Certificate">
    <figcaption>Completed Web Dev Bootcamp - 2024</figcaption>
  </figure>
</body>
</html>
```

## Best Practices

✅ **Do:**
- Always include `alt` attributes
- Use descriptive link text ("Learn more about HTML" not "Click here")
- Optimize image file sizes
- Use relative paths for same-site links
- Add `rel="noopener"` to external links with `target="_blank"`

❌ **Don't:**
- Use "Click here" as link text
- Forget alt attributes
- Use huge unoptimized images
- Use images for text (bad for accessibility)

## Common Mistakes

**Missing alt:**
```html
<!-- Bad -->
<img src="photo.jpg">

<!-- Good -->
<img src="photo.jpg" alt="Product photo">
```

**Bad link text:**
```html
<!-- Bad -->
<a href="/docs">Click here</a> for documentation

<!-- Good -->
<a href="/docs">Read the documentation</a>
```

## Key Takeaways

1. **Links use `<a>`** with `href` attribute
2. **Images use `<img>`** with `src` and `alt` attributes
3. **Alt text is mandatory** for accessibility
4. **You can combine** links and images
5. **Use semantic HTML** like `<figure>` when appropriate

Next lesson: We'll learn about semantic HTML and how to write more meaningful, accessible code!
