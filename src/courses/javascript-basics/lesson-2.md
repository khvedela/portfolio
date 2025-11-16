# Functions: Reusable Code Blocks

## What are Functions?

**Functions** are reusable blocks of code that perform specific tasks. Instead of writing the same code over and over, you write it once in a function and **call** it whenever needed.

Think of functions like recipes:
- **Definition**: Writing the recipe (what ingredients, what steps)
- **Calling**: Actually cooking using that recipe
- **Return value**: The finished dish

## Why Use Functions?

✅ **Reusability**: Write once, use many times  
✅ **Organization**: Break complex problems into smaller pieces  
✅ **Maintainability**: Fix bugs in one place  
✅ **Readability**: Name explains what code does  

## Defining Functions

### Function Declaration (Traditional)

```javascript
function greet() {
  console.log("Hello!");
}

// Call the function
greet(); // Prints: Hello!
```

### With Parameters

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Alice");  // Hello, Alice!
greet("Bob");    // Hello, Bob!
```

### Multiple Parameters

```javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result); // 8

console.log(add(10, 20)); // 30
```

## Return Values

Functions can **return** values back to where they were called:

```javascript
function multiply(x, y) {
  return x * y;
}

let answer = multiply(4, 5); // 20

function isAdult(age) {
  return age >= 18;
}

if (isAdult(25)) {
  console.log("You can vote!");
}
```

**Important**: Code after `return` doesn't run:

```javascript
function example() {
  return "Done!";
  console.log("This never runs"); // Unreachable
}
```

## Function Expressions

Store a function in a variable:

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet("World")); // Hello, World!
```

## Arrow Functions (Modern)

Shorter syntax for functions:

```javascript
// Traditional
function add(a, b) {
  return a + b;
}

// Arrow function (same thing)
const add = (a, b) => {
  return a + b;
};

// Even shorter (implicit return)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const sayHi = () => console.log("Hi!");
```

**When to use:**
- Callbacks and short functions
- Cleaner, more concise code
- They work slightly differently with `this` (advanced topic)

## Default Parameters

Provide default values if arguments aren't passed:

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet());        // Hello, Guest!

function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 3)); // 15
console.log(multiply(5));    // 5 (b defaults to 1)
```

## Scope

Variables have **scope** - where they can be accessed:

### Global Scope
```javascript
let globalVar = "I'm global";

function test() {
  console.log(globalVar); // Accessible
}

test();
console.log(globalVar); // Accessible
```

### Local Scope
```javascript
function test() {
  let localVar = "I'm local";
  console.log(localVar); // Accessible
}

test();
console.log(localVar); // ERROR! Not defined outside function
```

### Block Scope
```javascript
if (true) {
  let blockVar = "I'm in a block";
  console.log(blockVar); // Accessible
}

console.log(blockVar); // ERROR! Not accessible outside block
```

**Best practice**: Keep variables as local as possible.

## Practical Examples

### Temperature Converter
```javascript
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

console.log(celsiusToFahrenheit(0));   // 32
console.log(celsiusToFahrenheit(100)); // 212
console.log(fahrenheitToCelsius(32));  // 0
```

### Validation
```javascript
function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid"));          // false

function isStrongPassword(password) {
  return password.length >= 8 && 
         password.match(/[A-Z]/) && 
         password.match(/[0-9]/);
}

console.log(isStrongPassword("Abc12345")); // true
console.log(isStrongPassword("weak"));     // false
```

### String Utilities
```javascript
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

console.log(capitalize("hello")); // Hello
console.log(capitalize("WORLD")); // World

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

console.log(truncate("This is a long text", 10)); // This is a...
```

### Math Utilities
```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomNumber(1, 10)); // Random number between 1 and 10

function average(numbers) {
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }
  return sum / numbers.length;
}

console.log(average([1, 2, 3, 4, 5])); // 3
```

## Higher-Order Functions

Functions that take other functions as parameters:

```javascript
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeat(3, (index) => {
  console.log(`Iteration ${index}`);
});
// Iteration 0
// Iteration 1
// Iteration 2
```

## Interactive Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tip Calculator</title>
</head>
<body>
  <h1>Tip Calculator</h1>
  <p>Bill Amount: $<input type="number" id="billAmount" value="50"></p>
  <p>Tip Percentage: <input type="number" id="tipPercent" value="15">%</p>
  <button id="calculateBtn">Calculate</button>
  <p id="result"></p>
  
  <script>
    function calculateTip(bill, tipPercent) {
      const tip = bill * (tipPercent / 100);
      const total = bill + tip;
      return { tip, total };
    }
    
    function formatCurrency(amount) {
      return `$${amount.toFixed(2)}`;
    }
    
    document.getElementById('calculateBtn').addEventListener('click', () => {
      const bill = parseFloat(document.getElementById('billAmount').value);
      const tipPercent = parseFloat(document.getElementById('tipPercent').value);
      
      const { tip, total } = calculateTip(bill, tipPercent);
      
      document.getElementById('result').innerHTML = `
        <strong>Tip:</strong> ${formatCurrency(tip)}<br>
        <strong>Total:</strong> ${formatCurrency(total)}
      `;
    });
  </script>
</body>
</html>
```

## Common Mistakes

### 1. Forgetting to Call
```javascript
function sayHi() {
  console.log("Hi!");
}

sayHi;   // ❌ Does nothing (just references the function)
sayHi(); // ✅ Actually calls the function
```

### 2. Returning Too Early
```javascript
function processUser(user) {
  if (!user) {
    return; // Early return if no user
  }
  // Process user...
  return result;
}
```

### 3. Missing Return
```javascript
function add(a, b) {
  a + b; // ❌ Doesn't return anything
}

function add(a, b) {
  return a + b; // ✅ Returns the result
}
```

## Key Takeaways

✅ Functions are reusable blocks of code  
✅ Use `function name() {}` or arrow functions `() => {}`  
✅ **Parameters** are inputs, **return** is the output  
✅ Variables inside functions are local (scoped)  
✅ Functions make code more organized and maintainable  
✅ Arrow functions are shorter and cleaner for simple operations  

Next: Working with the DOM - making web pages interactive!
