# Introduction to JavaScript

## What is JavaScript?

**JavaScript** is the programming language of the web. While HTML provides structure and CSS provides style, JavaScript provides **interactivity** and **behavior**.

Think of a website as a car:
- **HTML** = The frame and body
- **CSS** = The paint and interior
- **JavaScript** = The engine and electronics

## Why JavaScript?

JavaScript allows you to:

- **Respond to user actions**: Clicks, form submissions, scrolling
- **Update content dynamically**: Without reloading the page
- **Validate forms**: Check data before submitting
- **Create animations**: Smooth, interactive effects
- **Fetch data**: Get information from servers
- **Build web applications**: Complete interactive experiences

## JavaScript is Everywhere

- **Frontend**: Interactive websites (React, Vue, Angular)
- **Backend**: Servers and APIs (Node.js)
- **Mobile apps**: React Native, Ionic
- **Desktop apps**: Electron
- **IoT devices**: Controlling hardware
- **Game development**: Browser games

## Your First JavaScript

### In the Browser Console

1. Open your browser
2. Right-click → Inspect → Console tab
3. Type this and press Enter:

```javascript
console.log("Hello, JavaScript!");
```

You just ran your first JavaScript!

### In an HTML File

**Create index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My First JavaScript</title>
</head>
<body>
  <h1>JavaScript Demo</h1>
  <button id="myButton">Click Me!</button>
  
  <script>
    // JavaScript goes here
    const button = document.getElementById('myButton');
    
    button.addEventListener('click', function() {
      alert('You clicked the button!');
    });
  </script>
</body>
</html>
```

## Variables: Storing Data

Variables hold values that can change:

```javascript
// Modern way (recommended)
let name = "David";
let age = 25;
let isStudent = true;

// Constants (can't be changed)
const PI = 3.14159;
const WEBSITE = "example.com";

// Old way (avoid)
var oldVariable = "Don't use var";
```

**Rules:**
- Use `let` for values that change
- Use `const` for values that don't change
- Always use meaningful names (`userName` not `x`)

## Data Types

JavaScript has several basic types:

### Numbers
```javascript
let score = 100;
let price = 19.99;
let temperature = -5;
```

### Strings (Text)
```javascript
let firstName = "John";
let lastName = 'Doe';
let greeting = `Hello, ${firstName}!`; // Template literal
```

### Booleans (True/False)
```javascript
let isLoggedIn = true;
let hasPermission = false;
```

### null and undefined
```javascript
let emptyValue = null;        // Intentionally empty
let notAssigned = undefined;  // Not set yet
```

### Arrays (Lists)
```javascript
let colors = ["red", "green", "blue"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

console.log(colors[0]); // "red" (first item)
console.log(colors.length); // 3 (number of items)
```

### Objects (Key-Value Pairs)
```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "New York",
  isStudent: false
};

console.log(person.name); // "Alice"
console.log(person["age"]); // 30
```

## Basic Operations

### Math
```javascript
let sum = 10 + 5;        // 15
let difference = 10 - 5; // 5
let product = 10 * 5;    // 50
let quotient = 10 / 5;   // 2
let remainder = 10 % 3;  // 1 (modulo)
let power = 2 ** 3;      // 8 (2 to the power of 3)
```

### String Operations
```javascript
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"

// Template literals (better way)
let greeting = `Hello, ${firstName} ${lastName}!`;

let text = "JavaScript";
console.log(text.length);           // 10
console.log(text.toUpperCase());    // "JAVASCRIPT"
console.log(text.toLowerCase());    // "javascript"
console.log(text.includes("Script")); // true
```

### Comparisons
```javascript
5 === 5     // true (equal value and type)
5 === "5"   // false (different types)
5 !== 3     // true (not equal)
10 > 5      // true
10 < 5      // false
10 >= 10    // true
10 <= 5     // false
```

**Always use `===` and `!==`** (strict equality) instead of `==` and `!=`.

## Comments

```javascript
// This is a single-line comment

/*
  This is a
  multi-line comment
*/

// Comments explain code and are ignored by JavaScript
let price = 99; // You can add comments at the end of lines
```

## Console Output

```javascript
console.log("Hello!");              // Print to console
console.log("Name:", name);         // Multiple values
console.log(`Age: ${age}`);         // Template literal

console.error("This is an error");  // Shows as error
console.warn("This is a warning");  // Shows as warning
console.table([1, 2, 3]);           // Shows as table
```

## Your First Interactive Script

```html
<!DOCTYPE html>
<html>
<head>
  <title>Name Greeter</title>
</head>
<body>
  <h1>What's your name?</h1>
  <input type="text" id="nameInput" placeholder="Enter your name">
  <button id="greetButton">Greet Me!</button>
  <p id="output"></p>
  
  <script>
    const input = document.getElementById('nameInput');
    const button = document.getElementById('greetButton');
    const output = document.getElementById('output');
    
    button.addEventListener('click', function() {
      const name = input.value;
      
      if (name === "") {
        output.textContent = "Please enter your name!";
      } else {
        output.textContent = `Hello, ${name}! Welcome to JavaScript! 🎉`;
      }
    });
  </script>
</body>
</html>
```

## Key Takeaways

✅ JavaScript adds interactivity to websites  
✅ Use `const` for values that don't change, `let` for values that do  
✅ Main data types: numbers, strings, booleans, arrays, objects  
✅ Use `===` for comparisons, not `==`  
✅ `console.log()` is your best debugging friend  
✅ JavaScript runs in the browser and on servers (Node.js)  

Next lesson: Functions - writing reusable blocks of code!
