# Events: Responding to User Actions

## What are Events?

**Events** are actions or occurrences that happen in the browser. JavaScript can "listen" for these events and respond to them.

Common events:
- **Click**: User clicks an element
- **Submit**: Form is submitted
- **Input**: User types in a field
- **Scroll**: User scrolls the page
- **Load**: Page finishes loading
- **Hover**: Mouse moves over element

## Adding Event Listeners

### Basic Syntax
```javascript
element.addEventListener('event', function() {
  // Code to run when event happens
});
```

### Click Events
```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', () => {
  console.log('Button was clicked!');
});
```

### Multiple Listeners
```javascript
const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('First listener');
});

button.addEventListener('click', () => {
  console.log('Second listener');
});

// Both run when button is clicked!
```

## Event Object

Event listeners receive an **event object** with useful information:

```javascript
button.addEventListener('click', (event) => {
  console.log(event.type);      // "click"
  console.log(event.target);    // The clicked element
  console.log(event.timeStamp); // When it happened
});
```

### Mouse Events
```javascript
element.addEventListener('click', (e) => {
  console.log(e.clientX);  // Mouse X position
  console.log(e.clientY);  // Mouse Y position
  console.log(e.button);   // Which button (0=left, 1=middle, 2=right)
});
```

### Keyboard Events
```javascript
input.addEventListener('keydown', (e) => {
  console.log(e.key);        // Which key: "a", "Enter", "Escape"
  console.log(e.code);       // Physical key: "KeyA", "Enter"
  console.log(e.shiftKey);   // true if Shift held
  console.log(e.ctrlKey);    // true if Ctrl held
});
```

## Common Events

### Mouse Events
```javascript
element.addEventListener('click', () => {});       // Click
element.addEventListener('dblclick', () => {});    // Double click
element.addEventListener('mouseenter', () => {});  // Mouse enters
element.addEventListener('mouseleave', () => {});  // Mouse leaves
element.addEventListener('mousemove', () => {});   // Mouse moves
element.addEventListener('mousedown', () => {});   // Mouse button pressed
element.addEventListener('mouseup', () => {});     // Mouse button released
```

### Keyboard Events
```javascript
input.addEventListener('keydown', () => {});   // Key pressed
input.addEventListener('keyup', () => {});     // Key released
input.addEventListener('keypress', () => {});  // Key pressed (deprecated)
```

### Form Events
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  // Handle form submission
});

input.addEventListener('input', () => {});    // Value changes
input.addEventListener('change', () => {});   // Value changes + loses focus
input.addEventListener('focus', () => {});    // Element gets focus
input.addEventListener('blur', () => {});     // Element loses focus
```

### Page Events
```javascript
window.addEventListener('load', () => {
  // Page fully loaded (including images)
});

document.addEventListener('DOMContentLoaded', () => {
  // HTML loaded and parsed (faster than 'load')
});

window.addEventListener('scroll', () => {
  // User scrolls
});

window.addEventListener('resize', () => {
  // Window resized
});
```

## Preventing Default Behavior

```javascript
// Prevent form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form not submitted');
});

// Prevent link navigation
link.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link not followed');
});

// Prevent context menu
element.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log('Right-click prevented');
});
```

## Event Delegation

Instead of adding listeners to many elements, add one to their parent:

```javascript
// ❌ Inefficient: Adding listener to each button
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Delete logic
  });
});

// ✅ Efficient: One listener on parent
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    // Delete logic
    e.target.closest('li').remove();
  }
});
```

**Benefits**:
- Better performance
- Works with dynamically added elements

## Removing Event Listeners

```javascript
function handleClick() {
  console.log('Clicked!');
}

const button = document.querySelector('button');

// Add listener
button.addEventListener('click', handleClick);

// Remove listener (must use named function)
button.removeEventListener('click', handleClick);
```

## Practical Examples

### Form Validation
```html
<form id="signupForm">
  <input type="email" id="email" placeholder="Email" required>
  <input type="password" id="password" placeholder="Password" required>
  <button type="submit">Sign Up</button>
  <p id="error" style="color: red;"></p>
</form>

<script>
  const form = document.getElementById('signupForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const error = document.getElementById('error');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.textContent = '';
    
    if (!email.value.includes('@')) {
      error.textContent = 'Invalid email address';
      return;
    }
    
    if (password.value.length < 8) {
      error.textContent = 'Password must be at least 8 characters';
      return;
    }
    
    console.log('Form is valid!', {
      email: email.value,
      password: password.value
    });
  });
</script>
```

### Character Counter
```html
<textarea id="message" maxlength="100"></textarea>
<p><span id="count">0</span> / 100 characters</p>

<script>
  const textarea = document.getElementById('message');
  const count = document.getElementById('count');
  
  textarea.addEventListener('input', () => {
    count.textContent = textarea.value.length;
    
    if (textarea.value.length > 90) {
      count.style.color = 'red';
    } else {
      count.style.color = 'black';
    }
  });
</script>
```

### Keyboard Shortcuts
```html
<p>Press Ctrl+S to save (simulated)</p>

<script>
  document.addEventListener('keydown', (e) => {
    // Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      console.log('Saving...');
      alert('Saved!');
    }
    
    // Escape key
    if (e.key === 'Escape') {
      console.log('Escape pressed');
    }
  });
</script>
```

### Scroll Progress Bar
```html
<div id="progressBar" style="position: fixed; top: 0; left: 0; height: 4px; background: blue; width: 0%;"></div>

<script>
  const progressBar = document.getElementById('progressBar');
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
</script>
```

### Modal Dialog
```html
<button id="openModal">Open Modal</button>

<div id="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);">
  <div style="background: white; margin: 100px auto; padding: 20px; max-width: 400px;">
    <h2>Modal Title</h2>
    <p>Modal content goes here.</p>
    <button id="closeModal">Close</button>
  </div>
</div>

<script>
  const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  
  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
</script>
```

### Debouncing Search Input
```html
<input type="text" id="searchInput" placeholder="Search...">
<div id="results"></div>

<script>
  const searchInput = document.getElementById('searchInput');
  const results = document.getElementById('results');
  let timeout;
  
  searchInput.addEventListener('input', (e) => {
    // Clear previous timeout
    clearTimeout(timeout);
    
    // Set new timeout (debounce)
    timeout = setTimeout(() => {
      const query = e.target.value;
      results.textContent = `Searching for: ${query}`;
      // Actual search logic here
    }, 500); // Wait 500ms after user stops typing
  });
</script>
```

## Event Bubbling and Capturing

Events "bubble" up from child to parent:

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>

<script>
  document.getElementById('btn').addEventListener('click', () => {
    console.log('Button clicked');
  });
  
  document.getElementById('inner').addEventListener('click', () => {
    console.log('Inner div clicked');
  });
  
  document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer div clicked');
  });
  
  // Clicking button logs:
  // Button clicked
  // Inner div clicked  
  // Outer div clicked
</script>
```

### Stop Propagation
```javascript
button.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents bubbling to parent
  console.log('Only this runs');
});
```

## Key Takeaways

✅ Events let JavaScript respond to user actions  
✅ `addEventListener` attaches event handlers  
✅ Event object (`e`) contains useful information  
✅ `e.preventDefault()` prevents default behavior  
✅ Event delegation improves performance  
✅ Debounce expensive operations (like search)  
✅ Events bubble up from child to parent  

Next: Arrays and Objects - working with complex data!
