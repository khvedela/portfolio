# HTML Document Structure

Every HTML document follows the same basic structure. Think of it like a template that every web page uses.

## The Basic Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

Let's break down each part.

## 1. The DOCTYPE Declaration

```html
<!DOCTYPE html>
```

This tells the browser: "Hey, this is an HTML5 document!"

- Always goes at the very top
- Not case-sensitive (but lowercase is standard)
- Without it, browsers might render pages incorrectly

Think of it as the file format declaration.

## 2. The `<html>` Element

```html
<html>
  <!-- Everything else goes here -->
</html>
```

This wraps your **entire** HTML document. It's the root element.

You'll often see:
```html
<html lang="en">
```

The `lang="en"` attribute tells browsers and screen readers the page is in English. Good for accessibility!

## 3. The `<head>` Section

```html
<head>
  <title>My Website</title>
  <meta charset="UTF-8">
  <meta name="description" content="A website about cats">
</head>
```

The head contains **metadata** - information about the page, not visible to users:
- `<title>` - What shows in the browser tab
- `<meta>` tags - Character encoding, description, keywords
- Links to CSS files
- Links to JavaScript files

**Nothing in the head appears on the page itself.**

## 4. The `<body>` Section

```html
<body>
  <h1>Welcome!</h1>
  <p>This text WILL appear on the page.</p>
</body>
```

The body contains **everything visible** on the page:
- Headings
- Paragraphs
- Images
- Links
- Videos
- Forms
- Everything users see

## Complete Example

Here's a properly structured HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
  <meta name="description" content="Learning HTML basics">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first properly structured HTML page.</p>
  <p>I'm learning web development!</p>
</body>
</html>
```

## Common Mistakes

❌ **Wrong:**
```html
<body>
  <title>My Page</title> <!-- Title belongs in head! -->
</body>
```

❌ **Wrong:**
```html
<html>
  <h1>Hello</h1> <!-- Content should be in body! -->
</html>
```

✅ **Correct:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```

## Key Takeaways

1. **Every HTML page** needs this structure
2. **Head** = metadata (invisible)
3. **Body** = content (visible)
4. **DOCTYPE** tells the browser it's HTML5
5. **Proper structure matters** - browsers are forgiving, but don't be sloppy

In the next lesson, we'll start adding actual content with headings and paragraphs!
