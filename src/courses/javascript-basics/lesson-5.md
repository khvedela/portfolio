# Arrays and Objects: Managing Data

## Arrays: Ordered Lists

**Arrays** store multiple values in a single variable. They're perfect for lists of similar items.

### Creating Arrays

```javascript
// Empty array
let emptyArray = [];

// Array with values
let colors = ['red', 'green', 'blue'];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, 'hello', true, null, {name: 'John'}];

// Using Array constructor (less common)
let arr = new Array(3); // [empty × 3]
```

### Accessing Elements

Arrays use **zero-based indexing** (first item is index 0):

```javascript
let fruits = ['apple', 'banana', 'cherry'];

console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'
console.log(fruits[2]); // 'cherry'
console.log(fruits[3]); // undefined (doesn't exist)

// Last item
console.log(fruits[fruits.length - 1]); // 'cherry'
```

### Modifying Arrays

```javascript
let items = ['a', 'b', 'c'];

// Change value
items[1] = 'B';
console.log(items); // ['a', 'B', 'c']

// Get length
console.log(items.length); // 3
```

## Array Methods

### Adding Elements

```javascript
let numbers = [1, 2, 3];

// Add to end
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

// Add to beginning
numbers.unshift(0);
console.log(numbers); // [0, 1, 2, 3, 4]

// Add multiple
numbers.push(5, 6, 7);
console.log(numbers); // [0, 1, 2, 3, 4, 5, 6, 7]
```

### Removing Elements

```javascript
let numbers = [1, 2, 3, 4, 5];

// Remove from end
let last = numbers.pop();
console.log(last);     // 5
console.log(numbers);  // [1, 2, 3, 4]

// Remove from beginning
let first = numbers.shift();
console.log(first);    // 1
console.log(numbers);  // [2, 3, 4]

// Remove from middle (splice)
numbers.splice(1, 1); // Remove 1 item at index 1
console.log(numbers); // [2, 4]
```

### Finding Elements

```javascript
let fruits = ['apple', 'banana', 'cherry', 'banana'];

// Find index
console.log(fruits.indexOf('banana'));     // 1 (first occurrence)
console.log(fruits.lastIndexOf('banana')); // 3 (last occurrence)
console.log(fruits.indexOf('grape'));      // -1 (not found)

// Check if exists
console.log(fruits.includes('apple')); // true
console.log(fruits.includes('grape')); // false

// Find by condition
let numbers = [1, 5, 10, 15, 20];
let found = numbers.find(num => num > 10);
console.log(found); // 15 (first match)

let foundIndex = numbers.findIndex(num => num > 10);
console.log(foundIndex); // 3
```

### Iterating Arrays

```javascript
let colors = ['red', 'green', 'blue'];

// forEach: Execute function for each item
colors.forEach((color, index) => {
  console.log(`${index}: ${color}`);
});

// for...of: Modern loop
for (let color of colors) {
  console.log(color);
}

// Traditional for loop
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

### Transforming Arrays

```javascript
let numbers = [1, 2, 3, 4, 5];

// map: Transform each element
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

let words = ['hello', 'world'];
let uppercase = words.map(word => word.toUpperCase());
console.log(uppercase); // ['HELLO', 'WORLD']

// filter: Keep elements that pass test
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

let longWords = words.filter(word => word.length > 5);
console.log(longWords); // []

// reduce: Combine all elements
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

let product = numbers.reduce((total, num) => total * num, 1);
console.log(product); // 120
```

### Other Useful Methods

```javascript
let arr = [3, 1, 4, 1, 5, 9, 2, 6];

// sort: Sort array (modifies original)
arr.sort((a, b) => a - b); // Ascending
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]

// reverse: Reverse array (modifies original)
arr.reverse();
console.log(arr); // [9, 6, 5, 4, 3, 2, 1, 1]

// slice: Copy portion (doesn't modify original)
let portion = arr.slice(2, 5);
console.log(portion); // [5, 4, 3]

// concat: Combine arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// join: Create string from array
let words = ['Hello', 'World'];
console.log(words.join(' '));  // 'Hello World'
console.log(words.join('-'));  // 'Hello-World'

// split: Create array from string
let sentence = 'Hello World';
let wordArray = sentence.split(' ');
console.log(wordArray); // ['Hello', 'World']
```

## Objects: Key-Value Pairs

**Objects** store data as key-value pairs (also called properties).

### Creating Objects

```javascript
// Empty object
let emptyObj = {};

// Object with properties
let person = {
  name: 'John',
  age: 30,
  city: 'New York',
  isStudent: false
};

// Using Object constructor (less common)
let obj = new Object();
```

### Accessing Properties

```javascript
let user = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
};

// Dot notation (preferred)
console.log(user.name);  // 'Alice'
console.log(user.age);   // 25

// Bracket notation (for dynamic keys or special characters)
console.log(user['email']); // 'alice@example.com'

let key = 'name';
console.log(user[key]); // 'Alice'
```

### Modifying Objects

```javascript
let person = {
  name: 'Bob',
  age: 30
};

// Update property
person.age = 31;

// Add new property
person.city = 'Boston';
person['country'] = 'USA';

console.log(person);
// { name: 'Bob', age: 31, city: 'Boston', country: 'USA' }

// Delete property
delete person.country;
console.log(person);
// { name: 'Bob', age: 31, city: 'Boston' }
```

### Methods (Functions in Objects)

```javascript
let calculator = {
  value: 0,
  
  add: function(num) {
    this.value += num;
  },
  
  // Shorthand syntax (modern)
  subtract(num) {
    this.value -= num;
  },
  
  getValue() {
    return this.value;
  }
};

calculator.add(10);
calculator.subtract(3);
console.log(calculator.getValue()); // 7
```

### Object Methods

```javascript
let user = {
  name: 'John',
  age: 30,
  city: 'NYC'
};

// Get all keys
console.log(Object.keys(user));
// ['name', 'age', 'city']

// Get all values
console.log(Object.values(user));
// ['John', 30, 'NYC']

// Get entries (key-value pairs)
console.log(Object.entries(user));
// [['name', 'John'], ['age', 30], ['city', 'NYC']]

// Check if property exists
console.log('name' in user);        // true
console.log('email' in user);       // false
console.log(user.hasOwnProperty('age')); // true
```

### Iterating Objects

```javascript
let product = {
  name: 'Laptop',
  price: 999,
  inStock: true
};

// for...in loop
for (let key in product) {
  console.log(`${key}: ${product[key]}`);
}

// Object.entries() with for...of
for (let [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}

// Object.keys() with forEach
Object.keys(product).forEach(key => {
  console.log(`${key}: ${product[key]}`);
});
```

## Arrays of Objects

Very common pattern in real applications:

```javascript
let users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

// Access specific user
console.log(users[0].name); // 'Alice'

// Find user by ID
let user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob', age: 30 }

// Get all names
let names = users.map(u => u.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Filter by age
let adults = users.filter(u => u.age >= 30);
console.log(adults);
// [{ id: 2, name: 'Bob', age: 30 }, { id: 3, name: 'Charlie', age: 35 }]
```

## Practical Examples

### Shopping Cart
```javascript
let cart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 },
  { id: 3, name: 'Keyboard', price: 79, quantity: 1 }
];

// Calculate total
let total = cart.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);

console.log(`Total: $${total}`); // Total: $1136

// Add item to cart
function addToCart(cart, product) {
  let existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

addToCart(cart, { id: 2, name: 'Mouse', price: 29 });
console.log(cart[1].quantity); // 3
```

### Data Filtering
```javascript
let students = [
  { name: 'Alice', grade: 85, passed: true },
  { name: 'Bob', grade: 55, passed: false },
  { name: 'Charlie', grade: 92, passed: true },
  { name: 'Diana', grade: 78, passed: true }
];

// Get passing students
let passed = students.filter(s => s.passed);
console.log(passed.length); // 3

// Get average grade
let avgGrade = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
console.log(avgGrade); // 77.5

// Sort by grade
students.sort((a, b) => b.grade - a.grade);
console.log(students[0].name); // 'Charlie' (highest grade)
```

### Grouping Data
```javascript
let transactions = [
  { type: 'income', amount: 1000 },
  { type: 'expense', amount: 200 },
  { type: 'income', amount: 500 },
  { type: 'expense', amount: 100 }
];

// Group by type
let grouped = transactions.reduce((acc, t) => {
  if (!acc[t.type]) {
    acc[t.type] = [];
  }
  acc[t.type].push(t);
  return acc;
}, {});

console.log(grouped);
// {
//   income: [{ type: 'income', amount: 1000 }, { type: 'income', amount: 500 }],
//   expense: [{ type: 'expense', amount: 200 }, { type: 'expense', amount: 100 }]
// }
```

## Destructuring (Modern JS)

Extract values from arrays and objects:

```javascript
// Array destructuring
let [first, second, third] = ['a', 'b', 'c'];
console.log(first); // 'a'
console.log(second); // 'b'

// Object destructuring
let user = { name: 'John', age: 30, city: 'NYC' };
let { name, age } = user;
console.log(name); // 'John'
console.log(age); // 30

// With different names
let { name: userName, age: userAge } = user;
console.log(userName); // 'John'
```

## Spread Operator

```javascript
// Copy array
let original = [1, 2, 3];
let copy = [...original];

// Combine arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Copy object
let user = { name: 'John', age: 30 };
let userCopy = { ...user };

// Combine objects
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
```

## Key Takeaways

✅ **Arrays** store ordered lists of values  
✅ Use `map`, `filter`, `reduce` for transformations  
✅ **Objects** store key-value pairs  
✅ Arrays of objects are very common in real apps  
✅ Use `forEach`, `for...of` to iterate  
✅ Destructuring and spread operator make code cleaner  
✅ `find`, `filter`, `includes` for searching  

You've now completed JavaScript Basics! 🎉 You can build interactive web applications. Keep practicing and building projects!
