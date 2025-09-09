### 1) What is the difference between `var`, `let`, and `const`?
- **var**  
  - Function-scoped.  
  - Can be **redeclared** and **updated**.  
  - Supports **hoisting** .  

- **let**  
  - Block-scoped.  
  - Can be **updated**, but **not redeclared** in the same scope.  
  - Not hoisted like `var`.  

- **const**  
  - Block-scoped.  
  - Cannot be **updated** or **redeclared**.  
  - Must be initialized at the time of declaration.  
  - For objects/arrays, the reference cannot change, but properties/elements can be modified.  



### 2) What is the difference between `map()`, `forEach()`, and `filter()`?
- **map()**  
  - Returns a **new array** with the results of applying a function to each element.  
  - Example:  
    ```js
    let nums = [1, 2, 3];
    let doubled = nums.map(n => n * 2); 
    ```

- **forEach()**  
  - Executes a function for each element but **does not return a new array**.  
  - Example:  
    ```js
    let nums = [1, 2, 3];
    nums.forEach(n => console.log(n * 2)); 
    ```

- **filter()**  
  - Returns a **new array** containing only the elements that pass a condition.  
  - Example:  
    ```js
    let nums = [1, 2, 3, 4];
    let evens = nums.filter(n => n % 2 === 0); 




    3) What are arrow functions in ES6?
- A shorter syntax for writing functions introduced in ES6.  

  // Regular function
  function add(a, b) {
    return a + b;
  }

  // Arrow function
  const add = (a, b) => a + b;


  4) How does destructuring assignment work in ES6?

Destructuring allows extracting values from arrays or objects into separate variables.

Examples:

// Array destructuring
let [a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

// Object destructuring
let {name, age} = {name: "Sajib", age: 22};
console.log(name); // Sajib
console.log(age);  // 22



5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`) instead of quotes.

They support:

Multi-line strings

String interpolation using ${}