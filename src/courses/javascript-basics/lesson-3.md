# DOM Manipulation: Making Pages Interactive

## What is the DOM?

The **DOM (Document Object Model)** is a programming interface for HTML documents. It represents your webpage as a tree of objects that JavaScript can interact with.

```
document
  └── html
      ├── head
      │   └── title
      └── body
          ├── h1
          ├── p
          └── button
```

When JavaScript "manipulates the DOM," it's changing the content, structure, or style of the webpage **in real-time**.

## Selecting Elements

### getElementById
```javascript
const title = document.getElementById('main-title');
console.log(title); // <h1 id="main-title">...</h1>
```

### querySelector (Most Flexible)
```javascript
// By ID
const title = document.querySelector('#main-title');

// By class
const button = document.querySelector('.btn-primary');

// By element type
const firstParagraph = document.querySelector('p');

// Complex selectors
const navLink = document.querySelector('nav .active');
```

### querySelectorAll (Multiple Elements)
```javascript
const allButtons = document.querySelectorAll('button');
const allItems = document.querySelectorAll('.list-item');

// Returns a NodeList (like an array)
allButtons.forEach(button => {
  console.log(button);
});
```

### Other Methods (Less Common)
```javascript
document.getElementsByClassName('card'); // By class
document.getElementsByTagName('p');      // By tag
```

**Best practice**: Use `querySelector` and `querySelectorAll` - they're more flexible.

## Reading and Changing Content

### textContent
```javascript
const heading = document.querySelector('h1');
console.log(heading.textContent); // Read text

heading.textContent = "New Title"; // Change text
```

### innerHTML (Caution!)
```javascript
const container = document.querySelector('.container');

// Read HTML
console.log(container.innerHTML);

// Change HTML
container.innerHTML = '<p>New <strong>content</strong></p>';
```

**⚠️ Warning**: `innerHTML` can expose you to XSS attacks. Use `textContent` when possible.

### value (For Inputs)
```javascript
const input = document.querySelector('#email');

// Read value
console.log(input.value);

// Set value
input.value = 'new@example.com';
```

## Changing Styles

### style Property
```javascript
const box = document.querySelector('.box');

box.style.backgroundColor = 'blue';
box.style.fontSize = '24px';
box.style.padding = '20px';
box.style.display = 'none'; // Hide element
```

**Note**: CSS property names become camelCase (`background-color` → `backgroundColor`).

### classList (Better Approach)
```javascript
const element = document.querySelector('.item');

// Add a class
element.classList.add('active');

// Remove a class
element.classList.remove('hidden');

// Toggle a class (add if not present, remove if present)
element.classList.toggle('expanded');

// Check if has class
if (element.classList.contains('active')) {
  console.log('Element is active');
}
```

## Changing Attributes

```javascript
const link = document.querySelector('a');

// Get attribute
console.log(link.getAttribute('href'));

// Set attribute
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');

// Remove attribute
link.removeAttribute('target');

// Direct property access (common attributes)
const img = document.querySelector('img');
img.src = 'new-image.jpg';
img.alt = 'Description';
```

## Creating Elements

```javascript
// Create new element
const newParagraph = document.createElement('p');

// Add content
newParagraph.textContent = 'This is a new paragraph';

// Add classes
newParagraph.classList.add('text-muted');

// Add to DOM
document.body.appendChild(newParagraph);
```

### Building Complex Elements
```javascript
// Create a card
const card = document.createElement('div');
card.classList.add('card');

const title = document.createElement('h3');
title.textContent = 'Card Title';

const description = document.createElement('p');
description.textContent = 'Card description';

const button = document.createElement('button');
button.textContent = 'Click Me';
button.classList.add('btn');

// Assemble the card
card.appendChild(title);
card.appendChild(description);
card.appendChild(button);

// Add to page
document.querySelector('.container').appendChild(card);
```

## Removing Elements

```javascript
const element = document.querySelector('.remove-me');

// Remove element
element.remove();

// Or remove from parent
const parent = element.parentElement;
parent.removeChild(element);
```

## Traversing the DOM

```javascript
const element = document.querySelector('.item');

// Parents
element.parentElement;        // Direct parent
element.closest('.container'); // Nearest ancestor matching selector

// Children
element.children;              // Direct children (HTMLCollection)
element.firstElementChild;     // First child
element.lastElementChild;      // Last child

// Siblings
element.nextElementSibling;    // Next sibling
element.previousElementSibling; // Previous sibling
```

## Practical Examples

### Todo List
```html
<div id="todo-app">
  <input type="text" id="todoInput" placeholder="Enter task">
  <button id="addBtn">Add</button>
  <ul id="todoList"></ul>
</div>

<script>
  const input = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('todoList');
  
  addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => li.remove();
    
    // Assemble and add
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    // Clear input
    input.value = '';
  });
</script>
```

### Toggle Dark Mode
```html
<button id="themeToggle">Toggle Dark Mode</button>

<script>
  const toggleBtn = document.getElementById('themeToggle');
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      toggleBtn.textContent = 'Toggle Light Mode';
    } else {
      toggleBtn.textContent = 'Toggle Dark Mode';
    }
  });
</script>

<style>
  body {
    transition: background-color 0.3s, color 0.3s;
  }
  
  body.dark-mode {
    background-color: #1a1a1a;
    color: #ffffff;
  }
</style>
```

### Show/Hide Content
```html
<button id="toggleBtn">Show More</button>
<div id="content" style="display: none;">
  <p>This is hidden content that can be toggled.</p>
</div>

<script>
  const btn = document.getElementById('toggleBtn');
  const content = document.getElementById('content');
  
  btn.addEventListener('click', () => {
    if (content.style.display === 'none') {
      content.style.display = 'block';
      btn.textContent = 'Show Less';
    } else {
      content.style.display = 'none';
      btn.textContent = 'Show More';
    }
  });
</script>
```

### Dynamic List Filter
```html
<input type="text" id="searchInput" placeholder="Search...">
<ul id="itemList">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
  <li>Date</li>
</ul>

<script>
  const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('#itemList li');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      
      if (text.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
</script>
```

## Performance Tips

### Cache Selectors
```javascript
// ❌ Bad: Queries DOM every time
for (let i = 0; i < 100; i++) {
  document.querySelector('.container').appendChild(item);
}

// ✅ Good: Query once, reuse
const container = document.querySelector('.container');
for (let i = 0; i < 100; i++) {
  container.appendChild(item);
}
```

### Document Fragments
```javascript
// For adding many elements
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}

// Add all at once (faster)
document.querySelector('ul').appendChild(fragment);
```

## Key Takeaways

✅ DOM lets JavaScript interact with HTML  
✅ `querySelector` and `querySelectorAll` for selecting elements  
✅ `textContent` for text, `innerHTML` for HTML (use carefully)  
✅ `classList` for managing CSS classes  
✅ `createElement` + `appendChild` to add new elements  
✅ Cache selectors for better performance  

Next: Events - responding to user interactions!
