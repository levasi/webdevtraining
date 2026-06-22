import type { SeedQuestion } from "./types";

/** Imported from InterviewBit JavaScript interview guide (73 questions). */
export const javascriptInterviewbitQuestions: SeedQuestion[] = [
  {
    id: "seed-js-ib-what-are-the-different-data-types-present-in-javascript",
    categorySlug: "javascript",
    title: "What are the different data types present in javascript?",
    content: "What are the different data types present in javascript?",
    explanation: "To know the type of a JavaScript variable, we can use the typeof operator.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["types"],
    answers: [
      {
        content: `To know the type of a JavaScript variable, we can use the typeof operator.

1. Primitive types

String - It represents a series of characters and is written with quotes. A string can be represented using a single or a double quote.

Example :

\`\`\`
var str = "Vivek Singh Bisht"; //using double quotes
var str2 = 'John Doe'; //using single quotes
\`\`\`

- Number - It represents a number and can be written with or without decimals.

Example :

\`\`\`
var x = 3; //without decimal
var y = 3.6; //with decimal
\`\`\`

- BigInt - This data type is used to store numbers which are above the limitation of the Number data type. It can store large integers and is represented by adding “n” to an integer literal.

Example :

\`\`\`
var bigInteger =  234567890123456789012345678901234567890;
\`\`\`

- Boolean - It represents a logical entity and can have only two values : true or false. Booleans are generally used for conditional testing.

Example :

\`\`\`
var a = 2;
var b =  3;
var c =  2;
(a == b) // returns false
(a == c) //returns true
\`\`\`

- Undefined - When a variable is declared but not assigned, it has the value of undefined and it’s type is also undefined.

Example :

\`\`\`
var x; // value of x is undefined
var y = undefined; // we can also set the value of a variable as undefined
\`\`\`

- Null - It represents a non-existent or a invalid value.

Example :

\`\`\`
var z = null;
\`\`\`

- Symbol - It is a new data type introduced in the ES6 version of javascript. It is used to store an anonymous and unique value.

Example :

\`\`\`
var symbol1 = Symbol('symbol');
\`\`\`

- typeof of primitive types :

\`\`\`
typeof "John Doe" // Returns "string"
typeof 3.14 // Returns "number"
typeof true // Returns "boolean"
typeof 234567890123456789012345678901234567890n // Returns bigint
typeof undefined // Returns "undefined"
typeof null // Returns "object" (kind of a bug in JavaScript)
typeof Symbol('symbol') // Returns Symbol
\`\`\`

2. Non-primitive types

- Primitive data types can store only a single value. To store multiple and complex values, non-primitive data types are used.
- Object - Used to store collection of data.
- Example:

\`\`\`
// Collection of data in key-value pairs

var obj1 = {
   x:  43,
   y:  "Hello world!",
   z: function(){
      return this.x;
   }
}

// Collection of data as an ordered list

var array1 = [5, "Hello", true, 4.1]; 
\`\`\`

#### Note- It is important to remember that any data type that is not a primitive data type, is of Object type in javascript.

Create a free personalised study plan Create a FREE custom study plan

Get into your dream companies with expert guidance

Get into your dream companies with expert..

Custom Plan Duration`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-hoisting-in-javascript",
    categorySlug: "javascript",
    title: "Explain Hoisting in javascript.",
    content: "Explain Hoisting in javascript.?",
    explanation: "Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["hoisting"],
    answers: [
      {
        content: `Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.

This means that irrespective of where the variables and functions are declared, they are moved on top of the scope. The scope can be both local and global.Example 1:

\`\`\`
hoistedVariable = 3;
console.log(hoistedVariable); // outputs 3 even when the variable is declared after it is initialized	
var hoistedVariable;
\`\`\`

Example 2:

\`\`\`
hoistedFunction();  // Outputs " Hello world! " even when the function is declared after calling

function hoistedFunction(){ 
  console.log(" Hello world! ");
} 
\`\`\`

Example 3:

\`\`\`
// Hoisting takes place in the local scope as well
function doSomething(){
  x = 33;
  console.log(x);
  var x;
} 
\`\`\`

doSomething(); // Outputs 33 since the local variable “x” is hoisted inside the local scope

#### Note - Variable initializations are not hoisted, only variable declarations are hoisted:

\`\`\`
var x;
console.log(x); // Outputs "undefined" since the initialization of "x" is not hoisted
x = 23;
\`\`\`

#### Note - To avoid hoisting, you can run javascript in strict mode by using “use strict” on top of the code:

\`\`\`
"use strict";
x = 23; // Gives an error since 'x' is not declared
var x; 
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-why-do-we-use-the-word-debugger-in-javascript",
    categorySlug: "javascript",
    title: "Why do we use the word “debugger” in javascript?",
    content: "Why do we use the word “debugger” in javascript?",
    explanation: "The debugger for the browser must be activated in order to debug the code. Built-in debuggers may be switched on and off, requiring the user to report faults. The remaining section of the code should stop execution before moving on to the next line while debugging.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `The debugger for the browser must be activated in order to debug the code. Built-in debuggers may be switched on and off, requiring the user to report faults. The remaining section of the code should stop execution before moving on to the next line while debugging.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-difference-between-and-operators",
    categorySlug: "javascript",
    title: "Difference between “ == “ and “ === “ operators.",
    content: "Difference between “ == “ and “ === “ operators.?",
    explanation: "Both are comparison operators. The difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Both are comparison operators. The difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.

Example:

\`\`\`
var x = 2;
var y = "2";
(x == y)  // Returns true since the value of both x and y is the same
(x === y) // Returns false since the typeof x is "number" and typeof y is "string"
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-difference-between-var-and-let-keyword-in-javascript",
    categorySlug: "javascript",
    title: "Difference between var and let keyword in javascript.",
    content: "Difference between var and let keyword in javascript.?",
    explanation: "Some differences are",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["variables"],
    answers: [
      {
        content: `Some differences are

1. From the very beginning, the 'var' keyword was used in JavaScript programming whereas the keyword 'let' was just added in 2015.
2. The keyword 'Var' has a function scope. Anywhere in the function, the variable specified using var is accessible but in ‘let’ the scope of a variable declared with the 'let' keyword is limited to the block in which it is declared. Let's start with a Block Scope.
3. In ECMAScript 2015, let and const are hoisted but not initialized. Referencing the variable in the block before the variable declaration results in a ReferenceError because the variable is in a "temporal dead zone" from the start of the block until the declaration is processed.

Explore Exclusive Events

By`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-implicit-type-coercion-in-javascript",
    categorySlug: "javascript",
    title: "Explain Implicit Type Coercion in javascript.",
    content: "Explain Implicit Type Coercion in javascript.?",
    explanation: "Implicit type coercion in javascript is the automatic conversion of value from one data type to another. It takes place when the operands of an expression are of different data types.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["types"],
    answers: [
      {
        content: `Implicit type coercion in javascript is the automatic conversion of value from one data type to another. It takes place when the operands of an expression are of different data types.

- String coercion

String coercion takes place while using the ‘ + ‘ operator. When a number is added to a string, the number type is always converted to the string type.

Example 1:

\`\`\`
var x = 3;
var y = "3";
x + y // Returns "33" 
\`\`\`

Example 2:

\`\`\`
var x = 24;
var y = "Hello";
x + y   // Returns "24Hello"; 
\`\`\`

#### Note - ‘ + ‘ operator when used to add two numbers, outputs a number. The same ‘ + ‘ operator when used to add two strings, outputs the concatenated string:

\`\`\`
var name = "Vivek";
var surname = " Bisht";
name + surname     // Returns "Vivek Bisht" 
\`\`\`

Let’s understand both the examples where we have added a number to a string,

When JavaScript sees that the operands of the expression x + y are of different types ( one being a number type and the other being a string type ), it converts the number type to the string type and then performs the operation. Since after conversion, both the variables are of string type, the ‘ + ‘ operator outputs the concatenated string “33” in the first example and “24Hello” in the second example.

#### Note - Type coercion also takes place when using the ‘ - ‘ operator, but the difference while using ‘ - ‘ operator is that, a string is converted to a number and then subtraction takes place.

\`\`\`
var x = 3;
Var y = "3";
x - y    //Returns 0 since the variable y (string type) is converted to a number type
\`\`\`

- Boolean Coercion

Boolean coercion takes place when using logical operators, ternary operators, if statements, and loop checks. To understand boolean coercion in if statements and operators, we need to understand truthy and falsy values.Truthy values are those which will be converted (coerced) to true. Falsy values are those which will be converted to false.All values except false, 0, 0n, -0, “”, null, undefined, and NaN are truthy values.

If statements:

Example:

\`\`\`
var x = 0;
var y = 23;

if(x) { console.log(x) }   // The code inside this block will not run since the value of x is 0(Falsy)  

if(y) { console.log(y) }    // The code inside this block will run since the value of y is 23 (Truthy)
\`\`\`

- Logical operators:

Logical operators in javascript, unlike operators in other programming languages, do not return true or false. They always return one of the operands.OR ( | | ) operator - If the first value is truthy, then the first value is returned. Otherwise, always the second value gets returned.AND ( && ) operator - If both the values are truthy, always the second value is returned. If the first value is falsy then the first value is returned or if the second value is falsy then the second value is returned.Example:

\`\`\`
var x = 220;
var y = "Hello";
var z = undefined;

x | | y    // Returns 220 since the first value is truthy

x | | z   // Returns 220 since the first value is truthy

x && y    // Returns "Hello" since both the values are truthy

y && z   // Returns undefined since the second value is falsy

if( x && y ){ 
  console.log("Code runs" ); // This block runs because x && y returns "Hello" (Truthy)
}   

if( x || z ){
  console.log("Code runs");  // This block runs because x || y returns 220(Truthy)
}
\`\`\`

- Equality Coercion

Equality coercion takes place when using ‘ == ‘ operator. As we have stated beforeThe ‘ == ‘ operator compares values and not types.While the above statement is a simple way to explain == operator, it’s not completely trueThe reality is that while using the ‘==’ operator, coercion takes place.The ‘==’ operator, converts both the operands to the same type and then compares them.Example:

\`\`\`
var a = 12;
var b = "12";
a == b // Returns true because both 'a' and 'b' are converted to the same type and then compared. Hence the operands are equal.
\`\`\`

Coercion does not take place when using the ‘===’ operator. Both operands are not converted to the same type in the case of ‘===’ operator.

Example:

\`\`\`
var a = 226;
var b = "226";

a === b // Returns false because coercion does not take place and the  operands are of different types. Hence they are not equal. 
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-is-javascript-a-statically-typed-or-a-dynamically-typed-lang",
    categorySlug: "javascript",
    title: "Is javascript a statically typed or a dynamically typed language?",
    content: "Is javascript a statically typed or a dynamically typed language?",
    explanation: "JavaScript is a dynamically typed language. In a dynamically typed language, the type of a variable is checked during run-time in contrast to a statically typed language, where the type of a variable is checked during compile-time.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["types"],
    answers: [
      {
        content: `JavaScript is a dynamically typed language. In a dynamically typed language, the type of a variable is checked during run-time in contrast to a statically typed language, where the type of a variable is checked during compile-time.

Since javascript is a loosely(dynamically) typed language, variables in JS are not associated with any type. A variable can hold the value of any data type.

For example, a variable that is assigned a number type can be converted to a string type:

\`\`\`
var a = 23;
var a = "Hello World!";
\`\`\`

Start Your Coding Journey With Tracks Start Your Coding Journey With Tracks

Master Data Structures and Algorithms with our Learning Tracks

Master Data Structures and Algorithms

Reading Material`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-nan-property-in-javascript",
    categorySlug: "javascript",
    title: "What is NaN property in JavaScript?",
    content: "What is NaN property in JavaScript?",
    explanation: "NaN property represents the “Not-a-Number” value. It indicates a value that is not a legal number.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `NaN property represents the “Not-a-Number” value. It indicates a value that is not a legal number.

typeof of NaN will return a Number.

To check if a value is NaN, we use the isNaN() function,

#### Note- isNaN() function converts the given value to a Number type, and then equates to NaN.

\`\`\`
isNaN("Hello")  // Returns true
isNaN(345)   // Returns false
isNaN('1')  // Returns false, since '1' is converted to Number type which results in 0 ( a number) 
isNaN(true) // Returns false, since true converted to Number type results in 1 ( a number)
isNaN(false) // Returns false
isNaN(undefined) // Returns true
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-passed-by-value-and-passed-by-reference",
    categorySlug: "javascript",
    title: "Explain passed by value and passed by reference.",
    content: "Explain passed by value and passed by reference.?",
    explanation: "In JavaScript, primitive data types are passed by value and non-primitive data types are passed by reference.For understanding passed by value and passed by reference, we need to understand what happens when we create a variable and assign a value to it,",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `In JavaScript, primitive data types are passed by value and non-primitive data types are passed by reference.For understanding passed by value and passed by reference, we need to understand what happens when we create a variable and assign a value to it,

\`\`\`
var x = 2;
\`\`\`

In the above example, we created a variable x and assigned it a value of “2”. In the background, the “=” (assign operator) allocates some space in the memory, stores the value “2” and returns the location of the allocated memory space. Therefore, the variable x in the above code points to the location of the memory space instead of pointing to the value 2 directly.

Assign operator behaves differently when dealing with primitive and non-primitive data types,Assign operator dealing with primitive types:

\`\`\`
var y = 234;
var z = y;
\`\`\`

In the above example, the assign operator knows that the value assigned to y is a primitive type (number type in this case), so when the second line code executes, where the value of y is assigned to z, the assign operator takes the value of y (234) and allocates a new space in the memory and returns the address. Therefore, variable z is not pointing to the location of variable y, instead, it is pointing to a new location in the memory.

\`\`\`
var y = #8454; // y pointing to address of the value 234

var z = y; 

var z = #5411; // z pointing to a completely new address of the value 234

// Changing the value of y
y = 23;
console.log(z);  // Returns 234, since z points to a new address in the memory so changes in y will not effect z
\`\`\`

From the above example, we can see that primitive data types when passed to another variable, are passed by value. Instead of just assigning the same address to another variable, the value is passed and new space of memory is created.Assign operator dealing with non-primitive types:

\`\`\`
var obj = { name: "Vivek", surname: "Bisht" };
var obj2 = obj;
\`\`\`

In the above example, the assign operator directly passes the location of the variable obj to the variable obj2. In other words, the reference of the variable obj is passed to the variable obj2.

\`\`\`
var obj = #8711;  // obj pointing to address of { name: "Vivek", surname: "Bisht" }
var obj2 = obj;

var obj2 = #8711; // obj2 pointing to the same address 

// changing the value of obj1

obj.name = "Akki";
console.log(obj2);

// Returns {name:"Akki", surname:"Bisht"} since both the variables are pointing to the same address.
\`\`\`

From the above example, we can see that while passing non-primitive data types, the assigned operator directly passes the address (reference).Therefore, non-primitive data types are always passed by reference.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-an-immediately-invoked-function-in-javascript",
    categorySlug: "javascript",
    title: "What is an Immediately Invoked Function in JavaScript?",
    content: "What is an Immediately Invoked Function in JavaScript?",
    explanation: "An Immediately Invoked Function ( known as IIFE and pronounced as IIFY) is a function that runs as soon as it is defined.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `An Immediately Invoked Function ( known as IIFE and pronounced as IIFY) is a function that runs as soon as it is defined.

Syntax of IIFE :

\`\`\`
(function(){ 
  // Do something;
})();
\`\`\`

To understand IIFE, we need to understand the two sets of parentheses that are added while creating an IIFE :The first set of parenthesis:

\`\`\`
(function (){
   //Do something;
})
\`\`\`

While executing javascript code, whenever the compiler sees the word “function”, it assumes that we are declaring a function in the code. Therefore, if we do not use the first set of parentheses, the compiler throws an error because it thinks we are declaring a function, and by the syntax of declaring a function, a function should always have a name.

\`\`\`
function() {
  //Do something;
}
// Compiler gives an error since the syntax of declaring a function is wrong in the code above.
\`\`\`

To remove this error, we add the first set of parenthesis that tells the compiler that the function is not a function declaration, instead, it’s a function expression.The second set of parenthesis:

\`\`\`
(function (){
  //Do something;
})();
\`\`\`

From the definition of an IIFE, we know that our code should run as soon as it is defined. A function runs only when it is invoked. If we do not invoke the function, the function declaration is returned:

\`\`\`
(function (){
  // Do something;
})

// Returns the function declaration
\`\`\`

Therefore to invoke the function, we use the second set of parenthesis.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-do-you-mean-by-strict-mode-in-javascript-and-characteri",
    categorySlug: "javascript",
    title: "What do you mean by strict mode in javascript and characteristics of javascript strict-mode?",
    content: "What do you mean by strict mode in javascript and characteristics of javascript strict-mode?",
    explanation: "In ECMAScript 5, a new feature called JavaScript Strict Mode allows you to write a code or a function in a \"strict\" operational environment. In most cases, this language is 'not particularly severe' when it comes to throwing errors. In 'Strict mode,' however, all forms of errors,",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `In ECMAScript 5, a new feature called JavaScript Strict Mode allows you to write a code or a function in a "strict" operational environment. In most cases, this language is 'not particularly severe' when it comes to throwing errors. In 'Strict mode,' however, all forms of errors, including silent errors, will be thrown. As a result, debugging becomes a lot simpler. Thus programmer's chances of making an error are lowered.

Characteristics of strict mode in javascript

1. Duplicate arguments are not allowed by developers.
2. In strict mode, you won't be able to use the JavaScript keyword as a parameter or function name.
3. The 'use strict' keyword is used to define strict mode at the start of the script. Strict mode is supported by all browsers.
4. Engineers will not be allowed to create global variables in 'Strict Mode.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-higher-order-functions-in-javascript",
    categorySlug: "javascript",
    title: "Explain Higher Order Functions in javascript.",
    content: "Explain Higher Order Functions in javascript.?",
    explanation: "Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.Higher-order functions are a result of functions being first-class citizens in javascript.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.Higher-order functions are a result of functions being first-class citizens in javascript.

Examples of higher-order functions:

\`\`\`
function higherOrder(fn) {
  fn();
}

higherOrder(function() { console.log("Hello world") });  
\`\`\`

\`\`\`
function higherOrder2() {
  return function() {
    return "Do something";
  }
}      
var x = higherOrder2();
x()   // Returns "Do something"
\`\`\`

Discover your path to a Discover your path to a Successful Tech Career for FREE! Successful Tech Career!

Answer 4 simple questions & get a career plan tailored for you

Answer 4 simple questions & get a career plan tailored for you

Projects on the Job

Referral System

2 Lakh+ Roadmaps Created`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-this-keyword",
    categorySlug: "javascript",
    title: "Explain “this” keyword.",
    content: "Explain “this” keyword.?",
    explanation: "The “this” keyword refers to the object that the function is a property of.The value of the “this” keyword will always depend on the object that is invoking the function.\\",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["this"],
    answers: [
      {
        content: `The “this” keyword refers to the object that the function is a property of.The value of the “this” keyword will always depend on the object that is invoking the function.\\

Confused? Let’s understand the above statements by examples:

\`\`\`
function doSomething() {
  console.log(this);
}

doSomething();
\`\`\`

What do you think the output of the above code will be?

Note - Observe the line where we are invoking the function.

Check the definition again:

#### The “this” keyword refers to the object that the function is a property of.

In the above code, the function is a property of which object?

Since the function is invoked in the global context, the function is a property of the global object.

Therefore, the output of the above code will be the global object. Since we ran the above code inside the browser, the global object is the window object.

Example 2:

\`\`\`
var obj = {
    name:  "vivek",
    getName: function(){
    console.log(this.name);
  }
}

obj.getName();
\`\`\`

In the above code, at the time of invocation, the getName function is a property of the object obj , therefore, this keyword will refer to the object obj, and hence the output will be “vivek”.

Example 3:

\`\`\`
 var obj = {
    name:  "vivek",
    getName: function(){
    console.log(this.name);
  }

}

var getName = obj.getName;

var obj2 = {name:"akshay", getName };
obj2.getName();
\`\`\`

Can you guess the output here?

The output will be “akshay”.

Although the getName function is declared inside the object obj, at the time of invocation, getName() is a property of obj2, therefore the “this” keyword will refer to obj2.

The silly way to understand the “this” keyword is, whenever the function is invoked, check the object before the dot. The value of this . keyword will always be the object before the dot.

If there is no object before the dot-like in example1, the value of this keyword will be the global object.

Example 4:

\`\`\`
var obj1 = {
    address : "Mumbai,India",
    getAddress: function(){
    console.log(this.address); 
  }
}

var getAddress = obj1.getAddress;
var obj2 = {name:"akshay"};
obj2.getAddress();    
\`\`\`

Can you guess the output?

The output will be an error.

Although in the code above, this keyword refers to the object obj2, obj2 does not have the property “address”‘, hence the getAddress function throws an error.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-do-you-mean-by-self-invoking-functions",
    categorySlug: "javascript",
    title: "What do you mean by Self Invoking Functions?",
    content: "What do you mean by Self Invoking Functions?",
    explanation: "Without being requested, a self-invoking expression is automatically invoked (initiated). If a function expression is followed by (), it will execute automatically. A function declaration cannot be invoked by itself.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Without being requested, a self-invoking expression is automatically invoked (initiated). If a function expression is followed by (), it will execute automatically. A function declaration cannot be invoked by itself.

Normally, we declare a function and call it, however, anonymous functions may be used to run a function automatically when it is described and will not be called again. And there is no name for these kinds of functions.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-call-apply-and-bind-methods",
    categorySlug: "javascript",
    title: "Explain call(), apply() and, bind() methods.",
    content: "Explain call(), apply() and, bind() methods.?",
    explanation: "1. call():",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `1. call():

- It’s a predefined method in javascript.
- This method invokes a method (function) by specifying the owner object.
- Example 1:

\`\`\`
function sayHello(){
  return "Hello " + this.name;
}

var obj = {name: "Sandy"};

sayHello.call(obj);

// Returns "Hello Sandy"	
\`\`\`

- call() method allows an object to use the method (function) of another object.
- Example 2:

\`\`\`
var person = {
  age: 23,
  getAge: function(){
    return this.age;
  }
}        
var person2 = {age:  54};
person.getAge.call(person2);      
// Returns 54  
\`\`\`

- call() accepts arguments:

\`\`\`
function saySomething(message){
  return this.name + " is " + message;
}     
var person4 = {name:  "John"};     
saySomething.call(person4, "awesome");
// Returns "John is awesome"    
\`\`\`

apply()The apply method is similar to the call() method. The only difference is that,call() method takes arguments separately whereas, apply() method takes arguments as an array.

\`\`\`
function saySomething(message){
  return this.name + " is " + message;
}        
var person4 = {name:  "John"};
saySomething.apply(person4, ["awesome"]);
\`\`\`

2. bind():

- This method returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter.
- Example with arguments:

\`\`\`
var bikeDetails = {
    displayDetails: function(registrationNumber,brandName){
    return this.name+ " , "+ "bike details: "+ registrationNumber + " , " + brandName;
  }
}

var person1 = {name:  "Vivek"};

var detailsOfPerson1 = bikeDetails.displayDetails.bind(person1, "TS0122", "Bullet");

// Binds the displayDetails function to the person1 object

detailsOfPerson1();
//Returns Vivek, bike details: TS0122, Bullet
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-difference-between-exec-and-test-methods-in-java",
    categorySlug: "javascript",
    title: "What is the difference between exec () and test () methods in javascript?",
    content: "What is the difference between exec () and test () methods in javascript?",
    explanation: "- test () and exec () are RegExp expression methods used in javascript. - We'll use exec () to search a string for a specific pattern, and if it finds it, it'll return the pattern directly; else, it'll return an 'empty' result. - We will use a test () to find a string for a speci",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `- test () and exec () are RegExp expression methods used in javascript.
- We'll use exec () to search a string for a specific pattern, and if it finds it, it'll return the pattern directly; else, it'll return an 'empty' result.
- We will use a test () to find a string for a specific pattern. It will return the Boolean value 'true' on finding the given text otherwise, it will return 'false'.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-currying-in-javascript",
    categorySlug: "javascript",
    title: "What is currying in JavaScript?",
    content: "What is currying in JavaScript?",
    explanation: "Currying is an advanced technique to transform a function of arguments n, to n functions of one or fewer arguments.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Currying is an advanced technique to transform a function of arguments n, to n functions of one or fewer arguments.

Example of a curried function:

\`\`\`
function add (a) {
  return function(b){
    return a + b;
  }
}

add(3)(4) 
\`\`\`

For Example, if we have a function f(a,b), then the function after currying, will be transformed to f(a)(b).By using the currying technique, we do not change the functionality of a function, we just change the way it is invoked.Let’s see currying in action:

\`\`\`
function multiply(a,b){
  return a*b;
}

function currying(fn){
  return function(a){
    return function(b){
      return fn(a,b);
    }
  }
}

var curriedMultiply = currying(multiply);

multiply(4, 3); // Returns 12

curriedMultiply(4)(3); // Also returns 12
\`\`\`

As one can see in the code above, we have transformed the function multiply(a,b) to a function curriedMultiply , which takes in one parameter at a time.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-some-advantages-of-using-external-javascript",
    categorySlug: "javascript",
    title: "What are some advantages of using External JavaScript?",
    content: "What are some advantages of using External JavaScript?",
    explanation: "External JavaScript is the JavaScript Code (script) written in a separate file with the extension.js, and then we link that file inside the or element of the HTML file where the code is to be placed.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `External JavaScript is the JavaScript Code (script) written in a separate file with the extension.js, and then we link that file inside the or element of the HTML file where the code is to be placed.

Some advantages of external javascript are

1. It allows web designers and developers to collaborate on HTML and javascript files.
2. We can reuse the code.
3. Code readability is simple in external javascript.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-scope-and-scope-chain-in-javascript",
    categorySlug: "javascript",
    title: "Explain Scope and Scope Chain in javascript.",
    content: "Explain Scope and Scope Chain in javascript.?",
    explanation: "Scope in JS determines the accessibility of variables and functions at various parts of one’s code.In general terms, the scope will let us know at a given part of code, what are variables and functions we can or cannot access.There are three types of scopes in JS:",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["scope"],
    answers: [
      {
        content: `Scope in JS determines the accessibility of variables and functions at various parts of one’s code.In general terms, the scope will let us know at a given part of code, what are variables and functions we can or cannot access.There are three types of scopes in JS:

- Global Scope
- Local or Function Scope
- Block Scope

Global Scope: Variables or functions declared in the global namespace have global scope, which means all the variables and functions having global scope can be accessed from anywhere inside the code.

\`\`\`
var globalVariable = "Hello world";

function sendMessage(){
  return globalVariable; // can access globalVariable since it's written in global space
}
function sendMessage2(){
  return sendMessage(); // Can access sendMessage function since it's written in global space
}
sendMessage2();  // Returns “Hello world”
\`\`\`

Function Scope: Any variables or functions declared inside a function have local/function scope, which means that all the variables and functions declared inside a function, can be accessed from within the function and not outside of it.

\`\`\`
function awesomeFunction(){
  var a = 2;

  var multiplyBy2 = function(){
    console.log(a*2); // Can access variable "a" since a and multiplyBy2 both are written inside the same function
  }
}
console.log(a); // Throws reference error since a is written in local scope and cannot be accessed outside

multiplyBy2(); // Throws reference error since multiplyBy2 is written in local scope
\`\`\`

Block Scope: Block scope is related to the variables declared using let and const. Variables declared with var do not have block scope. Block scope tells us that any variable declared inside a block { }, can be accessed only inside that block and cannot be accessed outside of it.

\`\`\`
{
  let x = 45;
}

console.log(x); // Gives reference error since x cannot be accessed outside of the block

for(let i=0; i<2; i++){
  // do something
}

console.log(i); // Gives reference error since i cannot be accessed outside of the for loop block
\`\`\`

Scope Chain: JavaScript engine also uses Scope to find variables. Let’s understand that using an example:

\`\`\`
var y = 24;

function favFunction(){
  var x = 667;
  var anotherFavFunction = function(){
    console.log(x); // Does not find x inside anotherFavFunction, so looks for variable inside favFunction, outputs 667
  }

  var yetAnotherFavFunction = function(){
    console.log(y); // Does not find y inside yetAnotherFavFunction, so looks for variable inside favFunction and does not find it, so looks for variable in global scope, finds it and outputs 24
  }

  anotherFavFunction();
  yetAnotherFavFunction();
}
favFunction();
\`\`\`

As you can see in the code above, if the javascript engine does not find the variable in local scope, it tries to check for the variable in the outer scope. If the variable does not exist in the outer scope, it tries to find the variable in the global scope.

If the variable is not found in the global space as well, a reference error is thrown.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-closures-in-javascript",
    categorySlug: "javascript",
    title: "Explain Closures in JavaScript.",
    content: "Explain Closures in JavaScript.?",
    explanation: "Closures are an ability of a function to remember the variables and functions that are declared in its outer scope.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["closures"],
    answers: [
      {
        content: `Closures are an ability of a function to remember the variables and functions that are declared in its outer scope.

\`\`\`
var Person = function(pName){
  var name = pName;

  this.getName = function(){
    return name;
  }
}

var person = new Person("Neelesh");
console.log(person.getName());
\`\`\`

Let’s understand closures by example:

\`\`\`
function randomFunc(){
  var obj1 = {name:"Vivian", age:45};

  return function(){
    console.log(obj1.name + " is "+ "awesome"); // Has access to obj1 even when the randomFunc function is executed

  }
}

var initialiseClosure = randomFunc(); // Returns a function

initialiseClosure(); 
\`\`\`

Let’s understand the code above,The function randomFunc() gets executed and returns a function when we assign it to a variable:

\`\`\`
var initialiseClosure = randomFunc();
\`\`\`

The returned function is then executed when we invoke initialiseClosure:

\`\`\`
initialiseClosure(); 
\`\`\`

The line of code above outputs “Vivian is awesome” and this is possible because of closure.

\`\`\`
console.log(obj1.name + " is "+ "awesome");
\`\`\`

When the function randomFunc() runs, it seems that the returning function is using the variable obj1 inside it:

Therefore randomFunc(), instead of destroying the value of obj1 after execution, saves the value in the memory for further reference. This is the reason why the returning function is able to use the variable declared in the outer scope even after the function is already executed.This ability of a function to store a variable for further reference even after it is executed is called Closure.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-mention-some-advantages-of-javascript",
    categorySlug: "javascript",
    title: "Mention some advantages of javascript.",
    content: "Mention some advantages of javascript.?",
    explanation: "There are many advantages of javascript. Some of them are",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `There are many advantages of javascript. Some of them are

1. Javascript is executed on the client-side as well as server-side also. There are a variety of Frontend Frameworks that you may study and utilize. However, if you want to use JavaScript on the backend, you'll need to learn NodeJS. It is currently the only JavaScript framework that may be used on the backend.
2. Javascript is a simple language to learn.
3. Web pages now have more functionality because of Javascript.
4. To the end-user, Javascript is quite quick.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-object-prototypes",
    categorySlug: "javascript",
    title: "What are object prototypes?",
    content: "What are object prototypes?",
    explanation: "All javascript objects inherit properties from a prototype. For example,",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["prototypes"],
    answers: [
      {
        content: `All javascript objects inherit properties from a prototype. For example,

- Date objects inherit properties from the Date prototype
- Math objects inherit properties from the Math prototype
- Array objects inherit properties from the Array prototype.
- On top of the chain is Object.prototype. Every prototype inherits properties and methods from the Object.prototype.
- A prototype is a blueprint of an object. The prototype allows us to use properties and methods on an object even if the properties and methods do not exist on the current object.

Let’s see prototypes help us use methods and properties:

\`\`\`
var arr = [];
arr.push(2);

console.log(arr); // Outputs [2]
\`\`\`

In the code above, as one can see, we have not defined any property or method called push on the array “arr” but the javascript engine does not throw an error.

The reason is the use of prototypes. As we discussed before, Array objects inherit properties from the Array prototype.

The javascript engine sees that the method push does not exist on the current array object and therefore, looks for the method push inside the Array prototype and it finds the method.

Whenever the property or method is not found on the current object, the javascript engine will always try to look in its prototype and if it still does not exist, it looks inside the prototype's prototype and so on.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-callbacks",
    categorySlug: "javascript",
    title: "What are callbacks?",
    content: "What are callbacks?",
    explanation: "A callback is a function that will be executed after another function gets executed. In javascript, functions are treated as first-class citizens, they can be used as an argument of another function, can be returned by another function, and can be used as a property of an object.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["callbacks"],
    answers: [
      {
        content: `A callback is a function that will be executed after another function gets executed. In javascript, functions are treated as first-class citizens, they can be used as an argument of another function, can be returned by another function, and can be used as a property of an object.

Functions that are used as an argument to another function are called callback functions. Example:

\`\`\`
function divideByHalf(sum){
  console.log(Math.floor(sum / 2));
}

function multiplyBy2(sum){
  console.log(sum * 2);
}

function operationOnSum(num1,num2,operation){
  var sum = num1 + num2;
  operation(sum);
}

operationOnSum(3, 3, divideByHalf); // Outputs 3

operationOnSum(5, 5, multiplyBy2); // Outputs 20
\`\`\`

- In the code above, we are performing mathematical operations on the sum of two numbers. The operationOnSum function takes 3 arguments, the first number, the second number, and the operation that is to be performed on their sum (callback).
- Both divideByHalf and multiplyBy2 functions are used as callback functions in the code above.
- These callback functions will be executed only after the function operationOnSum is executed.
- Therefore, a callback is a function that will be executed after another function gets executed.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-the-types-of-errors-in-javascript",
    categorySlug: "javascript",
    title: "What are the types of errors in javascript?",
    content: "What are the types of errors in javascript?",
    explanation: "There are two types of errors in javascript.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["errors", "types"],
    answers: [
      {
        content: `There are two types of errors in javascript.

1. Syntax error: Syntax errors are mistakes or spelling problems in the code that cause the program to not execute at all or to stop running halfway through. Error messages are usually supplied as well.
2. Logical error: Reasoning mistakes occur when the syntax is proper but the logic or program is incorrect. The application executes without problems in this case. However, the output findings are inaccurate. These are sometimes more difficult to correct than syntax issues since these applications do not display error signals for logic faults.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-memoization",
    categorySlug: "javascript",
    title: "What is memoization?",
    content: "What is memoization?",
    explanation: "Memoization is a form of caching where the return value of a function is cached based on its parameters. If the parameter of that function is not changed, the cached version of the function is returned.Let’s understand memoization, by converting a simple function to a memoized fu",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Memoization is a form of caching where the return value of a function is cached based on its parameters. If the parameter of that function is not changed, the cached version of the function is returned.Let’s understand memoization, by converting a simple function to a memoized function:

Note- Memoization is used for expensive function calls but in the following example, we are considering a simple function for understanding the concept of memoization better.

Consider the following function:

\`\`\`
function addTo256(num){
  return num + 256;
}
addTo256(20); // Returns 276
addTo256(40); // Returns 296
addTo256(20); // Returns 276
\`\`\`

In the code above, we have written a function that adds the parameter to 256 and returns it.When we are calling the function addTo256 again with the same parameter (“20” in the case above), we are computing the result again for the same parameter.Computing the result with the same parameter, again and again, is not a big deal in the above case, but imagine if the function does some heavy-duty work, then, computing the result again and again with the same parameter will lead to wastage of time.

This is where memoization comes in, by using memoization we can store(cache) the computed results based on the parameters. If the same parameter is used again while invoking the function, instead of computing the result, we directly return the stored (cached) value.

Let’s convert the above function addTo256, to a memoized function:

\`\`\`
function memoizedAddTo256(){
  var cache = {};

  return function(num){
    if(num in cache){
      console.log("cached value");
      return cache[num]
    }
    else{
      cache[num] = num + 256;
      return cache[num];
    }
  }
}
var memoizedFunc = memoizedAddTo256();

memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return
\`\`\`

In the code above, if we run the memoizedFunc function with the same parameter, instead of computing the result again, it returns the cached result.

Note- Although using memoization saves time, it results in larger consumption of memory since we are storing all the computed results.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-recursion-in-a-programming-language",
    categorySlug: "javascript",
    title: "What is recursion in a programming language?",
    content: "What is recursion in a programming language?",
    explanation: "Recursion is a technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Recursion is a technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result.

\`\`\`
function add(number) {
  if (number <= 0) {
    return 0;
  } else {
    return number + add(number - 1);
  }
}
add(3) => 3 + add(2)
          3 + 2 + add(1)
          3 + 2 + 1 + add(0)
          3 + 2 + 1 + 0 = 6  
\`\`\`

Example of a recursive function:The following function calculates the sum of all the elements in an array by using recursion:

\`\`\`
function computeSum(arr){
  if(arr.length === 1){
    return arr[0];
  }
  else{
    return arr.pop() + computeSum(arr);
  }
}
computeSum([7, 8, 9, 99]); // Returns 123
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-use-of-a-constructor-function-in-javascript",
    categorySlug: "javascript",
    title: "What is the use of a constructor function in javascript?",
    content: "What is the use of a constructor function in javascript?",
    explanation: "Constructor functions are used to create objects in javascript.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Constructor functions are used to create objects in javascript.

When do we use constructor functions?

If we want to create multiple objects having similar properties and methods, constructor functions are used.

#### Note- The name of a constructor function should always be written in Pascal Notation: every word should start with a capital letter.

Example:

\`\`\`
function Person(name,age,gender){
  this.name = name;
  this.age = age;
  this.gender = gender;
}

var person1 = new Person("Vivek", 76, "male");
console.log(person1);

var person2 = new Person("Courtney", 34, "female");
console.log(person2);
\`\`\`

In the code above, we have created a constructor function named Person. Whenever we want to create a new object of the type Person, We need to create it using the new keyword:

\`\`\`
var person3 = new Person("Lilly", 17, "female");
\`\`\`

The above line of code will create a new object of the type Person. Constructor functions allow us to group similar objects.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-dom",
    categorySlug: "javascript",
    title: "What is DOM?",
    content: "What is DOM?",
    explanation: "- DOM stands for Document Object Model. DOM is a programming interface for HTML and XML documents. - When the browser tries to render an HTML document, it creates an object based on the HTML document called DOM. Using this DOM, we can manipulate or change various elements inside ",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["dom"],
    answers: [
      {
        content: `- DOM stands for Document Object Model. DOM is a programming interface for HTML and XML documents.
- When the browser tries to render an HTML document, it creates an object based on the HTML document called DOM. Using this DOM, we can manipulate or change various elements inside the HTML document.
- Example of how HTML code gets converted to DOM:`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-which-method-is-used-to-retrieve-a-character-from-a-certain-",
    categorySlug: "javascript",
    title: "Which method is used to retrieve a character from a certain index?",
    content: "Which method is used to retrieve a character from a certain index?",
    explanation: "The charAt() function of the JavaScript string finds a char element at the supplied index. The index number begins at 0 and continues up to n-1, Here n is the string length. The index value must be positive, higher than, or the same as the string length.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `The charAt() function of the JavaScript string finds a char element at the supplied index. The index number begins at 0 and continues up to n-1, Here n is the string length. The index value must be positive, higher than, or the same as the string length.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-do-you-mean-by-bom",
    categorySlug: "javascript",
    title: "What do you mean by BOM?",
    content: "What do you mean by BOM?",
    explanation: "Browser Object Model is known as BOM. It allows users to interact with the browser. A browser's initial object is a window. As a result, you may call all of the window's functions directly or by referencing the window. The document, history, screen, navigator, location, and other",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Browser Object Model is known as BOM. It allows users to interact with the browser. A browser's initial object is a window. As a result, you may call all of the window's functions directly or by referencing the window. The document, history, screen, navigator, location, and other attributes are available in the window object.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-distinction-between-client-side-and-server-side-",
    categorySlug: "javascript",
    title: "What is the distinction between client-side and server-side JavaScript?",
    content: "What is the distinction between client-side and server-side JavaScript?",
    explanation: "Client-side JavaScript is made up of two parts, a fundamental language and predefined objects for performing JavaScript in a browser. JavaScript for the client is automatically included in the HTML pages. At runtime, the browser understands this script.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Client-side JavaScript is made up of two parts, a fundamental language and predefined objects for performing JavaScript in a browser. JavaScript for the client is automatically included in the HTML pages. At runtime, the browser understands this script.

Server-side JavaScript, involves the execution of JavaScript code on a server in response to client requests. It handles these requests and delivers the relevant response to the client, which may include client-side JavaScript for subsequent execution within the browser.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-arrow-functions",
    categorySlug: "javascript",
    title: "What are arrow functions?",
    content: "What are arrow functions?",
    explanation: "Arrow functions were introduced in the ES6 version of javascript. They provide us with a new and shorter syntax for declaring functions. Arrow functions can only be used as a function expression.Let’s compare the normal function declaration and the arrow function declaration in d",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Arrow functions were introduced in the ES6 version of javascript. They provide us with a new and shorter syntax for declaring functions. Arrow functions can only be used as a function expression.Let’s compare the normal function declaration and the arrow function declaration in detail:

\`\`\`
// Traditional Function Expression
var add = function(a,b){
  return a + b;
}

// Arrow Function Expression
var arrowAdd = (a,b) => a + b;
\`\`\`

Arrow functions are declared without the function keyword. If there is only one returning expression then we don’t need to use the return keyword as well in an arrow function as shown in the example above. Also, for functions having just one line of code, curly braces { } can be omitted.

\`\`\`
// Traditional function expression
var multiplyBy2 = function(num){
  return num * 2;
}
// Arrow function expression
var arrowMultiplyBy2 = num => num * 2;
\`\`\`

If the function takes in only one argument, then the parenthesis () around the parameter can be omitted as shown in the code above.

\`\`\`
var obj1 = {
  valueOfThis: function(){
    return this;
  }
}
var obj2 = {
  valueOfThis: ()=>{
    return this;
  }
}

obj1.valueOfThis(); // Will return the object obj1
obj2.valueOfThis(); // Will return window/global object
\`\`\`

The biggest difference between the traditional function expression and the arrow function is the handling of this keyword. By general definition, this keyword always refers to the object that is calling the function. As you can see in the code above, obj1.valueOfThis() returns obj1 since this keyword refers to the object calling the function.

In the arrow functions, there is no binding of this keyword. This keyword inside an arrow function does not refer to the object calling it. It rather inherits its value from the parent scope which is the window object in this case. Therefore, in the code above, obj2.valueOfThis() returns the window object.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-do-mean-by-prototype-design-pattern",
    categorySlug: "javascript",
    title: "What do mean by prototype design pattern?",
    content: "What do mean by prototype design pattern?",
    explanation: "The Prototype Pattern produces different objects, but instead of returning uninitialized objects, it produces objects that have values replicated from a template – or sample – object. Also known as the Properties pattern, the Prototype pattern is used to create prototypes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["prototypes"],
    answers: [
      {
        content: `The Prototype Pattern produces different objects, but instead of returning uninitialized objects, it produces objects that have values replicated from a template – or sample – object. Also known as the Properties pattern, the Prototype pattern is used to create prototypes.

The introduction of business objects with parameters that match the database's default settings is a good example of where the Prototype pattern comes in handy. The default settings for a newly generated business object are stored in the prototype object.

The Prototype pattern is hardly used in traditional languages, however, it is used in the development of new objects and templates in JavaScript, which is a prototypal language.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-differences-between-declaring-variables-using-var-let-and-co",
    categorySlug: "javascript",
    title: "Differences between declaring variables using var, let and const.",
    content: "Differences between declaring variables using var, let and const.?",
    explanation: "Before the ES6 version of javascript, only the keyword var was used to declare variables. With the ES6 Version, keywords let and const were introduced to declare variables.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["variables"],
    answers: [
      {
        content: `Before the ES6 version of javascript, only the keyword var was used to declare variables. With the ES6 Version, keywords let and const were introduced to declare variables.

| keyword | const | let | var |
| --- | --- | --- | --- |
| global scope | no | no | yes |
| function scope | yes | yes | yes |
| block scope | yes | yes | no |
| can be reassigned | no | yes | yes |

Let’s understand the differences with examples:

\`\`\`
var variable1 = 23;

let variable2 = 89;

function catchValues(){
  console.log(variable1);
  console.log(variable2);

// Both the variables can be accessed anywhere since they are declared in the global scope
}

window.variable1; // Returns the value 23

window.variable2; // Returns undefined
\`\`\`

- The variables declared with the let keyword in the global scope behave just like the variable declared with the var keyword in the global scope.
- Variables declared in the global scope with var and let keywords can be accessed from anywhere in the code.
- But, there is one difference! Variables that are declared with the var keyword in the global scope are added to the window/global object. Therefore, they can be accessed using window.variableName.Whereas, the variables declared with the let keyword are not added to the global object, therefore, trying to access such variables using window.variableName results in an error.

var vs let in functional scope

\`\`\`
function varVsLetFunction(){
  let awesomeCar1 = "Audi";
  var awesomeCar2 = "Mercedes";
}

console.log(awesomeCar1); // Throws an error
console.log(awesomeCar2); // Throws an error
\`\`\`

Variables are declared in a functional/local scope using var and let keywords behave exactly the same, meaning, they cannot be accessed from outside of the scope.

\`\`\`
{
  var variable3 = [1, 2, 3, 4];
}

console.log(variable3); // Outputs [1,2,3,4]

{
  let variable4 = [6, 55, -1, 2];
}

console.log(variable4); // Throws error

for(let i = 0; i < 2; i++){
  //Do something
}

console.log(i); // Throws error

for(var j = 0; j < 2; i++){
  // Do something
}

console.log(j) // Outputs 2 
\`\`\`

- In javascript, a block means the code written inside the curly braces {}.
- Variables declared with var keyword do not have block scope. It means a variable declared in block scope {} with the var keyword is the same as declaring the variable in the global scope.
- Variables declared with let keyword inside the block scope cannot be accessed from outside of the block.

Const keyword

- Variables with the const keyword behave exactly like a variable declared with the let keyword with only one difference, any variable declared with the const keyword cannot be reassigned.
- Example:

\`\`\`
const x = {name:"Vivek"};

x = {address: "India"}; // Throws an error

x.name = "Nikhil"; // No error is thrown

const y = 23;

y = 44; // Throws an error
\`\`\`

In the code above, although we can change the value of a property inside the variable declared with const keyword, we cannot completely reassign the variable itself.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-rest-parameter-and-spread-operator",
    categorySlug: "javascript",
    title: "What is the rest parameter and spread operator?",
    content: "What is the rest parameter and spread operator?",
    explanation: "Both rest parameter and spread operator were introduced in the ES6 version of javascript.Rest parameter ( … ):",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Both rest parameter and spread operator were introduced in the ES6 version of javascript.Rest parameter ( … ):

- It provides an improved way of handling the parameters of a function.
- Using the rest parameter syntax, we can create functions that can take a variable number of arguments.
- Any number of arguments will be converted into an array using the rest parameter.
- It also helps in extracting all or some parts of the arguments.
- Rest parameters can be used by applying three dots (...) before the parameters.

\`\`\`
function extractingArgs(...args){
  return args[1];
}

// extractingArgs(8,9,1); // Returns 9

function addAllArgs(...args){
  let sumOfArgs = 0;
  let i = 0;
  while(i < args.length){
    sumOfArgs += args[i];
    i++;
  }
  return sumOfArgs;
}

addAllArgs(6, 5, 7, 99); // Returns 117
addAllArgs(1, 3, 4); // Returns 8
\`\`\`

**Note- Rest parameter should always be used at the last parameter of a function:

\`\`\`
// Incorrect way to use rest parameter
function randomFunc(a,...args,c){
//Do something
}

// Correct way to use rest parameter
function randomFunc2(a,b,...args){
//Do something
}
\`\`\`

- Spread operator (…): Although the syntax of the spread operator is exactly the same as the rest parameter, the spread operator is used to spreading an array, and object literals. We also use spread operators where one or more arguments are expected in a function call.

\`\`\`
function addFourNumbers(num1,num2,num3,num4){
  return num1 + num2 + num3 + num4;
}

let fourNumbers = [5, 6, 7, 8];

addFourNumbers(...fourNumbers);
// Spreads [5,6,7,8] as 5,6,7,8

let array1 = [3, 4, 5, 6];
let clonedArray1 = [...array1];
// Spreads the array into 3,4,5,6
console.log(clonedArray1); // Outputs [3,4,5,6]

let obj1 = {x:'Hello', y:'Bye'};
let clonedObj1 = {...obj1}; // Spreads and clones obj1
console.log(obj1);

let obj2 = {z:'Yes', a:'No'};
let mergedObj = {...obj1, ...obj2}; // Spreads both the objects and merges it
console.log(mergedObj);
// Outputs {x:'Hello', y:'Bye',z:'Yes',a:'No'};
\`\`\`

***Note- Key differences between rest parameter and spread operator:

- Rest parameter is used to take a variable number of arguments and turns them into an array while the spread operator takes an array or an object and spreads it
- Rest parameter is used in function declaration whereas the spread operator is used in function calls.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-in-javascript-how-many-different-methods-can-you-make-an-obj",
    categorySlug: "javascript",
    title: "In JavaScript, how many different methods can you make an object?",
    content: "In JavaScript, how many different methods can you make an object?",
    explanation: "In JavaScript, there are several ways to declare or construct an object.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `In JavaScript, there are several ways to declare or construct an object.

1. Object.
2. using Class.
3. create Method.
4. Object Literals.
5. using Function.
6. Object Constructor.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-use-of-promises-in-javascript",
    categorySlug: "javascript",
    title: "What is the use of promises in javascript?",
    content: "What is the use of promises in javascript?",
    explanation: "Promises are used to handle asynchronous operations in javascript.Before promises, callbacks were used to handle asynchronous operations. But due to the limited functionality of callbacks, using multiple callbacks to handle asynchronous code can lead to unmanageable code.Promise ",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["promises"],
    answers: [
      {
        content: `Promises are used to handle asynchronous operations in javascript.Before promises, callbacks were used to handle asynchronous operations. But due to the limited functionality of callbacks, using multiple callbacks to handle asynchronous code can lead to unmanageable code.Promise object has four states -

- Pending - Initial state of promise. This state represents that the promise has neither been fulfilled nor been rejected, it is in the pending state.
- Fulfilled - This state represents that the promise has been fulfilled, meaning the async operation is completed.
- Rejected - This state represents that the promise has been rejected for some reason, meaning the async operation has failed.
- Settled - This state represents that the promise has been either rejected or fulfilled.

A promise is created using the Promise constructor which takes in a callback function with two parameters, resolve and reject respectively.

resolve is a function that will be called when the async operation has been successfully completed.reject is a function that will be called, when the async operation fails or if some error occurs.Example of a promise:Promises are used to handle asynchronous operations like server requests, for ease of understanding, we are using an operation to calculate the sum of three elements.In the function below, we are returning a promise inside a function:

\`\`\`
function sumOfThreeElements(...elements){
  return new Promise((resolve,reject)=>{
    if(elements.length > 3 ){
      reject("Only three elements or less are allowed");
    }
    else{
      let sum = 0;
      let i = 0;
      while(i < elements.length){
        sum += elements[i];
        i++;
      }
      resolve("Sum has been calculated: "+sum);
    }
  })
}
\`\`\`

In the code above, we are calculating the sum of three elements, if the length of the elements array is more than 3, a promise is rejected, or else the promise is resolved and the sum is returned.

We can consume any promise by attaching then() and catch() methods to the consumer.

then() method is used to access the result when the promise is fulfilled.

catch() method is used to access the result/error when the promise is rejected. In the code below, we are consuming the promise:

\`\`\`
sumOfThreeElements(4, 5, 6)
.then(result=> console.log(result))
.catch(error=> console.log(error));
// In the code above, the promise is fulfilled so the then() method gets executed

sumOfThreeElements(7, 0, 33, 41)
.then(result => console.log(result))
.catch(error=> console.log(error));
// In the code above, the promise is rejected hence the catch() method gets executed
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-classes-in-javascript",
    categorySlug: "javascript",
    title: "What are classes in javascript?",
    content: "What are classes in javascript?",
    explanation: "Introduced in the ES6 version, classes are nothing but syntactic sugars for constructor functions. They provide a new way of declaring constructor functions in javascript. Below are the examples of how classes are declared and used:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["classes"],
    answers: [
      {
        content: `Introduced in the ES6 version, classes are nothing but syntactic sugars for constructor functions. They provide a new way of declaring constructor functions in javascript. Below are the examples of how classes are declared and used:

\`\`\`
// Before ES6 version, using constructor functions
function Student(name,rollNumber,grade,section){
  this.name = name;
  this.rollNumber = rollNumber;
  this.grade = grade;
  this.section = section;
}

// Way to add methods to a constructor function
Student.prototype.getDetails = function(){
  return 'Name: \${this.name}, Roll no: \${this.rollNumber}, Grade: \${this.grade}, Section:\${this.section}';
}

let student1 = new Student("Vivek", 354, "6th", "A");
student1.getDetails();
// Returns Name: Vivek, Roll no:354, Grade: 6th, Section:A

// ES6 version classes
class Student{
  constructor(name,rollNumber,grade,section){
    this.name = name;
    this.rollNumber = rollNumber;
    this.grade = grade;
    this.section = section;
  }

  // Methods can be directly added inside the class
  getDetails(){
    return 'Name: \${this.name}, Roll no: \${this.rollNumber}, Grade:\${this.grade}, Section:\${this.section}';
  }
}

let student2 = new Student("Garry", 673, "7th", "C");
student2.getDetails();
// Returns Name: Garry, Roll no:673, Grade: 7th, Section:C
\`\`\`

Key points to remember about classes:

- Unlike functions, classes are not hoisted. A class cannot be used before it is declared.
- A class can inherit properties and methods from other classes by using the extend keyword.
- All the syntaxes inside the class must follow the strict mode(‘use strict’) of javascript. An error will be thrown if the strict mode rules are not followed.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-generator-functions",
    categorySlug: "javascript",
    title: "What are generator functions?",
    content: "What are generator functions?",
    explanation: "Introduced in the ES6 version, generator functions are a special class of functions.They can be stopped midway and then continue from where they had stopped.Generator functions are declared with the function* keyword instead of the normal function keyword:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["generators"],
    answers: [
      {
        content: `Introduced in the ES6 version, generator functions are a special class of functions.They can be stopped midway and then continue from where they had stopped.Generator functions are declared with the function* keyword instead of the normal function keyword:

\`\`\`
function* genFunc(){
  // Perform operation
}
\`\`\`

In normal functions, we use the return keyword to return a value and as soon as the return statement gets executed, the function execution stops:

\`\`\`
function normalFunc(){
  return 22;
  console.log(2); // This line of code does not get executed
}
\`\`\`

In the case of generator functions, when called, they do not execute the code, instead, they return a generator object. This generator object handles the execution.

\`\`\`
function* genFunc(){
  yield 3;
  yield 4;
}
genFunc(); // Returns Object [Generator] {}
\`\`\`

The generator object consists of a method called next(), this method when called, executes the code until the nearest yield statement, and returns the yield value.For example, if we run the next() method on the above code:

\`\`\`
genFunc().next(); // Returns {value: 3, done:false}

\`\`\`

As one can see the next method returns an object consisting of a value and done properties. Value property represents the yielded value. Done property tells us whether the function code is finished or not. (Returns true if finished).

Generator functions are used to return iterators. Let’s see an example where an iterator is returned:

\`\`\`
function* iteratorFunc() {
  let count = 0;
  for (let i = 0; i < 2; i++) {
      count++;
      yield i;
  }
  return count;
}

let iterator = iteratorFunc();
console.log(iterator.next()); // {value:0,done:false}
console.log(iterator.next()); // {value:1,done:false}
console.log(iterator.next()); // {value:2,done:true}
\`\`\`

As you can see in the code above, the last line returns done:true, since the code reaches the return statement.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-weakset-in-javascript",
    categorySlug: "javascript",
    title: "Explain WeakSet in javascript.",
    content: "Explain WeakSet in javascript.?",
    explanation: "In javascript, a Set is a collection of unique and ordered elements. Just like Set, WeakSet is also a collection of unique and ordered elements with some key differences:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["collections"],
    answers: [
      {
        content: `In javascript, a Set is a collection of unique and ordered elements. Just like Set, WeakSet is also a collection of unique and ordered elements with some key differences:

- Weakset contains only objects and no other type.
- An object inside the weakset is referenced weakly. This means, that if the object inside the weakset does not have a reference, it will be garbage collected.
- Unlike Set, WeakSet only has three methods, add() , delete() and has() .

\`\`\`
const newSet = new Set([4, 5, 6, 7]);
console.log(newSet);// Outputs Set {4,5,6,7}

const newSet2 = new WeakSet([3, 4, 5]); //Throws an error

let obj1 = {message:"Hello world"};
const newSet3 = new WeakSet([obj1]);
console.log(newSet3.has(obj1)); // true
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-why-do-we-use-callbacks",
    categorySlug: "javascript",
    title: "Why do we use callbacks?",
    content: "Why do we use callbacks?",
    explanation: "A callback function is a method that is sent as an input to another function (now let us name this other function \"thisFunction\"), and it is performed inside the thisFunction after the function has completed execution.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["callbacks"],
    answers: [
      {
        content: `A callback function is a method that is sent as an input to another function (now let us name this other function "thisFunction"), and it is performed inside the thisFunction after the function has completed execution.

JavaScript is a scripting language that is based on events. Instead of waiting for a reply before continuing, JavaScript will continue to run while monitoring for additional events. Callbacks are a technique of ensuring that a particular code does not run until another code has completed its execution.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-weakmap-in-javascript",
    categorySlug: "javascript",
    title: "Explain WeakMap in javascript.",
    content: "Explain WeakMap in javascript.?",
    explanation: "In javascript, Map is used to store key-value pairs. The key-value pairs can be of both primitive and non-primitive types. WeakMap is similar to Map with key differences:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["collections"],
    answers: [
      {
        content: `In javascript, Map is used to store key-value pairs. The key-value pairs can be of both primitive and non-primitive types. WeakMap is similar to Map with key differences:

- The keys and values in weakmap should always be an object.
- If there are no references to the object, the object will be garbage collected.

\`\`\`
const map1 = new Map();
map1.set('Value', 1);

const map2 = new WeakMap();
map2.set('Value', 2.3); // Throws an error

let obj = {name:"Vivek"};
const map3 = new WeakMap();
map3.set(obj, {age:23});
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-object-destructuring",
    categorySlug: "javascript",
    title: "What is Object Destructuring?",
    content: "What is Object Destructuring?",
    explanation: "Object destructuring is a new way to extract elements from an object or an array.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Object destructuring is a new way to extract elements from an object or an array.

- Object destructuring: Before ES6 version:

\`\`\`
const classDetails = {
  strength: 78,
  benches: 39,
  blackBoard:1
}

const classStrength = classDetails.strength;
const classBenches = classDetails.benches;
const classBlackBoard = classDetails.blackBoard;
\`\`\`

The same example using object destructuring:

\`\`\`
const classDetails = {
  strength: 78,
  benches: 39,
  blackBoard:1
}

const {strength:classStrength, benches:classBenches,blackBoard:classBlackBoard} = classDetails;

console.log(classStrength); // Outputs 78
console.log(classBenches); // Outputs 39
console.log(classBlackBoard); // Outputs 1
\`\`\`

As one can see, using object destructuring we have extracted all the elements inside an object in one line of code. If we want our new variable to have the same name as the property of an object we can remove the colon:

\`\`\`
const {strength:strength} = classDetails;
// The above line of code can be written as:
const {strength} = classDetails;
\`\`\`

- Array destructuring: Before ES6 version:

\`\`\`
const arr = [1, 2, 3, 4];
const first = arr[0];
const second = arr[1];
const third = arr[2];
const fourth = arr[3];
\`\`\`

The same example using object destructuring:

\`\`\`
const arr = [1, 2, 3, 4];
const [first,second,third,fourth] = arr;
console.log(first); // Outputs 1
console.log(second); // Outputs 2
console.log(third); // Outputs 3
console.log(fourth); // Outputs 4
\`\`\``,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-difference-between-prototypal-and-classical-inheritance",
    categorySlug: "javascript",
    title: "Difference between prototypal and classical inheritance",
    content: "Difference between prototypal and classical inheritance?",
    explanation: "Programers build objects, which are representations of real-time entities, in traditional OO programming. Classes and objects are the two sorts of abstractions. A class is a generalization of an object, whereas an object is an abstraction of an actual thing. A Vehicle, for exampl",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["classes"],
    answers: [
      {
        content: `Programers build objects, which are representations of real-time entities, in traditional OO programming. Classes and objects are the two sorts of abstractions. A class is a generalization of an object, whereas an object is an abstraction of an actual thing. A Vehicle, for example, is a specialization of a Car. As a result, automobiles (class) are descended from vehicles (object).

Classical inheritance differs from prototypal inheritance in that classical inheritance is confined to classes that inherit from those remaining classes, but prototypal inheritance allows any object to be cloned via an object linking method. Despite going into too many specifics, a prototype essentially serves as a template for those other objects, whether they extend the parent object or not.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-a-temporal-dead-zone",
    categorySlug: "javascript",
    title: "What is a Temporal Dead Zone?",
    content: "What is a Temporal Dead Zone?",
    explanation: "Temporal Dead Zone is a behaviour that occurs with variables declared using let and const keywords. It is a behaviour where we try to access a variable before it is initialized. Examples of temporal dead zone:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Temporal Dead Zone is a behaviour that occurs with variables declared using let and const keywords. It is a behaviour where we try to access a variable before it is initialized. Examples of temporal dead zone:

\`\`\`
x = 23; // Gives reference error

let x;

function anotherRandomFunc(){
  message = "Hello"; // Throws a reference error

  let message;
}
anotherRandomFunc();
\`\`\`

In the code above, both in the global scope and functional scope, we are trying to access variables that have not been declared yet. This is called the Temporal Dead Zone.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-do-you-mean-by-javascript-design-patterns",
    categorySlug: "javascript",
    title: "What do you mean by JavaScript Design Patterns?",
    content: "What do you mean by JavaScript Design Patterns?",
    explanation: "JavaScript design patterns are repeatable approaches for errors that arise sometimes when building JavaScript browser applications. They truly assist us in making our code more stable.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `JavaScript design patterns are repeatable approaches for errors that arise sometimes when building JavaScript browser applications. They truly assist us in making our code more stable.

They are divided mainly into 3 categories

1. Creational Design Pattern
2. Structural Design Pattern
3. Behavioral Design Pattern.

- Creational Design Pattern: The object generation mechanism is addressed by the JavaScript Creational Design Pattern. They aim to make items that are appropriate for a certain scenario.
- Structural Design Pattern: The JavaScript Structural Design Pattern explains how the classes and objects we've generated so far can be combined to construct bigger frameworks. This pattern makes it easier to create relationships between items by defining a straightforward way to do so.
- Behavioral Design Pattern: This design pattern highlights typical patterns of communication between objects in JavaScript. As a result, the communication may be carried out with greater freedom.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-is-javascript-a-pass-by-reference-or-pass-by-value-language",
    categorySlug: "javascript",
    title: "Is JavaScript a pass-by-reference or pass-by-value language?",
    content: "Is JavaScript a pass-by-reference or pass-by-value language?",
    explanation: "The variable's data is always a reference for objects, hence it's always pass by value. As a result, if you supply an object and alter its members inside the method, the changes continue outside of it. It appears to be pass by reference in this case. However, if you modify the va",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `The variable's data is always a reference for objects, hence it's always pass by value. As a result, if you supply an object and alter its members inside the method, the changes continue outside of it. It appears to be pass by reference in this case. However, if you modify the values of the object variable, the change will not last, demonstrating that it is indeed passed by value.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-difference-between-async-await-and-generators-usage-to-achie",
    categorySlug: "javascript",
    title: "Difference between Async/Await and Generators usage to achieve the same functionality.",
    content: "Difference between Async/Await and Generators usage to achieve the same functionality.?",
    explanation: "- Generator functions are run by their generator yield by yield which means one output at a time, whereas Async-await functions are executed sequentially one after another. - Async/await provides a certain use case for Generators easier to execute. - The output result of the Gene",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["async", "generators"],
    answers: [
      {
        content: `- Generator functions are run by their generator yield by yield which means one output at a time, whereas Async-await functions are executed sequentially one after another.
- Async/await provides a certain use case for Generators easier to execute.
- The output result of the Generator function is always value: X, done: Boolean, but the return value of the Async function is always an assurance or throws an error.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-the-primitive-data-types-in-javascript",
    categorySlug: "javascript",
    title: "What are the primitive data types in JavaScript?",
    content: "What are the primitive data types in JavaScript?",
    explanation: "A primitive is a data type that isn't composed of other data types. It's only capable of displaying one value at a time. By definition, every primitive is a built-in data type (the compiler must be knowledgeable of them) nevertheless, not all built-in datasets are primitives. In ",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["types"],
    answers: [
      {
        content: `A primitive is a data type that isn't composed of other data types. It's only capable of displaying one value at a time. By definition, every primitive is a built-in data type (the compiler must be knowledgeable of them) nevertheless, not all built-in datasets are primitives. In JavaScript, there are 5 different forms of basic data. The following values are available:

1. Boolean
2. Undefined
3. Null
4. Number
5. String`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-role-of-deferred-scripts-in-javascript",
    categorySlug: "javascript",
    title: "What is the role of deferred scripts in JavaScript?",
    content: "What is the role of deferred scripts in JavaScript?",
    explanation: "The processing of HTML code while the page loads are disabled by nature till the script hasn't halted. Your page will be affected if your network is a bit slow, or if the script is very hefty. When you use Deferred, the script waits for the HTML parser to finish before executing ",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `The processing of HTML code while the page loads are disabled by nature till the script hasn't halted. Your page will be affected if your network is a bit slow, or if the script is very hefty. When you use Deferred, the script waits for the HTML parser to finish before executing it. This reduces the time it takes for web pages to load, allowing them to appear more quickly.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-has-to-be-done-in-order-to-put-lexical-scoping-into-pra",
    categorySlug: "javascript",
    title: "What has to be done in order to put Lexical Scoping into practice?",
    content: "What has to be done in order to put Lexical Scoping into practice?",
    explanation: "To support lexical scoping, a JavaScript function object's internal state must include not just the function's code but also a reference to the current scope chain.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `To support lexical scoping, a JavaScript function object's internal state must include not just the function's code but also a reference to the current scope chain.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-purpose-of-the-following-javascript-code",
    categorySlug: "javascript",
    title: "What is the purpose of the following JavaScript code?",
    content: "What is the purpose of the following JavaScript code?",
    explanation: "Every executing function, code block, and script as a whole in JavaScript has a related object known as the Lexical Environment. The preceding code line returns the value in scope.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `\`\`\`
var scope = "global scope";
function check() 
{
    var scope = "local scope"; 
    function f() 
    { 
         return scope; 
    }
    return f;
}
\`\`\`

Every executing function, code block, and script as a whole in JavaScript has a related object known as the Lexical Environment. The preceding code line returns the value in scope.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-would-you-design-a-concurrency-limiter-for-async-tasks",
    categorySlug: "javascript",
    title: "How would you design a concurrency limiter for async tasks?",
    content: "How would you design a concurrency limiter for async tasks?",
    explanation: "A concurrency limiter controls how many promises run at the same time. Only a fixed number of async tasks are allowed to execute, while extra tasks wait in a queue. When one task finishes, the next task from the queue is started. This approach prevents API overload and browser pe",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["async"],
    answers: [
      {
        content: `A concurrency limiter controls how many promises run at the same time. Only a fixed number of async tasks are allowed to execute, while extra tasks wait in a queue. When one task finishes, the next task from the queue is started. This approach prevents API overload and browser performance issues. A simple queue-based design keeps execution predictable and stable.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-do-you-prevent-expensive-reflows-and-repaints",
    categorySlug: "javascript",
    title: "How do you prevent expensive reflows and repaints?",
    content: "How do you prevent expensive reflows and repaints?",
    explanation: "Expensive reflows and repaints are reduced by batching DOM updates instead of applying changes one by one. Layout reads and writes are kept separate to avoid forced reflows. Repeated style changes inside loops are avoided because they trigger unnecessary recalculations. For anima",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Expensive reflows and repaints are reduced by batching DOM updates instead of applying changes one by one. Layout reads and writes are kept separate to avoid forced reflows. Repeated style changes inside loops are avoided because they trigger unnecessary recalculations. For animations, CSS transforms and opacity are preferred since they do not affect layout. These practices help keep rendering fast and smooth.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-does-structured-clone-differ-from-json-serialization",
    categorySlug: "javascript",
    title: "How does structured clone differ from JSON serialization?",
    content: "How does structured clone differ from JSON serialization?",
    explanation: "Structured clones can copy complex objects like Maps and Sets. JSON serialization only works with basic data types. Structured clones also handle circular references. It is used internally by APIs like postMessage. JSON is more limited but widely supported.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Structured clones can copy complex objects like Maps and Sets. JSON serialization only works with basic data types. Structured clones also handle circular references. It is used internally by APIs like postMessage. JSON is more limited but widely supported.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-typedarrays-and-when-would-you-use-them",
    categorySlug: "javascript",
    title: "What are TypedArrays and when would you use them?",
    content: "What are TypedArrays and when would you use them?",
    explanation: "TypedArrays store binary data in a fixed format. They are faster and more memory-efficient than normal arrays. They are used in cases like graphics, audio, or handling raw data. Values must match the defined type. This gives better performance.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["types"],
    answers: [
      {
        content: `TypedArrays store binary data in a fixed format. They are faster and more memory-efficient than normal arrays. They are used in cases like graphics, audio, or handling raw data. Values must match the defined type. This gives better performance.

Example: const buffer = new Uint8Array(8);`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-deopts-and-what-causes-them",
    categorySlug: "javascript",
    title: "What are “deopts” and what causes them?",
    content: "What are “deopts” and what causes them?",
    explanation: "Deoptimization happens when optimized code becomes invalid. This usually occurs when variable types change unexpectedly. Adding properties to objects dynamically can trigger it. Using mixed types in arrays also causes deopts. Writing consistent code helps avoid this.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["engine-internals"],
    answers: [
      {
        content: `Deoptimization happens when optimized code becomes invalid. This usually occurs when variable types change unexpectedly. Adding properties to objects dynamically can trigger it. Using mixed types in arrays also causes deopts. Writing consistent code helps avoid this.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-garbage-collection-in-v8-mark-and-sweep",
    categorySlug: "javascript",
    title: "What is garbage collection in V8 (mark-and-sweep)?",
    content: "What is garbage collection in V8 (mark-and-sweep)?",
    explanation: "V8 uses garbage collection to free unused memory. It marks all reachable objects starting from roots like globals. Objects not marked are considered unused. These objects are then removed from memory. This process runs automatically in the background.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["engine-internals"],
    answers: [
      {
        content: `V8 uses garbage collection to free unused memory. It marks all reachable objects starting from roots like globals. Objects not marked are considered unused. These objects are then removed from memory. This process runs automatically in the background.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-causes-memory-leaks-in-js-apps-how-do-you-detect-them",
    categorySlug: "javascript",
    title: "What causes memory leaks in JS apps? How do you detect them?",
    content: "What causes memory leaks in JS apps? How do you detect them?",
    explanation: "Memory leaks happen when objects are kept in memory longer than needed. Common causes are global variables, forgotten timers, and event listeners not removed. Detached DOM nodes can also leak memory. You can detect leaks using browser DevTools memory snapshots. Growing memory ove",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["engine-internals"],
    answers: [
      {
        content: `Memory leaks happen when objects are kept in memory longer than needed. Common causes are global variables, forgotten timers, and event listeners not removed. Detached DOM nodes can also leak memory. You can detect leaks using browser DevTools memory snapshots. Growing memory over time is a red flag.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-does-the-js-engine-optimize-code-at-a-high-level",
    categorySlug: "javascript",
    title: "How does the JS engine optimize code at a high level?",
    content: "How does the JS engine optimize code at a high level?",
    explanation: "JavaScript engines use JIT compilation to turn hot code into faster machine code. They create hidden classes to understand object shapes. Inline caching helps reuse property lookups. These optimizations make repeated code much faster. When code behavior changes, the engine may re",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `JavaScript engines use JIT compilation to turn hot code into faster machine code. They create hidden classes to understand object shapes. Inline caching helps reuse property lookups. These optimizations make repeated code much faster. When code behavior changes, the engine may re-optimize.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-microtasks-vs-macrotasks-with-a-real-example",
    categorySlug: "javascript",
    title: "Explain microtasks vs macrotasks with a real example",
    content: "Explain microtasks vs macrotasks with a real example?",
    explanation: "JavaScript runs tasks using an event loop. Macrotasks include setTimeout and DOM events. Microtasks include Promises and queueMicrotask. Microtasks always run before the next macrotask. That’s why Promise callbacks execute earlier than setTimeout, even with zero delay.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["event-loop"],
    answers: [
      {
        content: `JavaScript runs tasks using an event loop. Macrotasks include setTimeout and DOM events. Microtasks include Promises and queueMicrotask. Microtasks always run before the next macrotask. That’s why Promise callbacks execute earlier than setTimeout, even with zero delay.

Example: Promise.resolve().then(() => console.log("micro")); setTimeout(() => console.log("macro"), 0);`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-difference-between-map-and-foreach",
    categorySlug: "javascript",
    title: "What is the difference between map() and forEach()?",
    content: "What is the difference between map() and forEach()?",
    explanation: "map() and forEach() are used to iterate over arrays, but they work a little differently.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["array-methods"],
    answers: [
      {
        content: `map() and forEach() are used to iterate over arrays, but they work a little differently.

forEach() is used when you simply want to run a function for each element.

For example, logging values or updating something outside the array. It does not return anything, so once it runs, there’s no result to work with.

When you llo at map(), it is used when you want to transform data.

It returns a new array where each element is the result of the callback function. This makes it useful when you actually need the modified data.

A common mistake that people usually make is using map() without using its return value. In such cases, forEach() is more appropriate.

Also, since map() returns an array, it supports chaining, whereas forEach() does not.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-do-you-handle-errors-in-javascript-try-catch-finally-and",
    categorySlug: "javascript",
    title: "How do you handle errors in JavaScript? try/catch/finally and custom errors.",
    content: "How do you handle errors in JavaScript? try/catch/finally and custom errors.?",
    explanation: "The biggest nightmare while woring in JavaScript is to come across an error. And you will surely be asked in the interviews if you understand your way around them.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["errors"],
    answers: [
      {
        content: `The biggest nightmare while woring in JavaScript is to come across an error. And you will surely be asked in the interviews if you understand your way around them.

The most basic way of handling this is using: try…catch.

Here are some things that you can do to deal with errors:

1. try / catch / finally

Here’s how it looks:

\`\`\`
try {
  const result = JSON.parse("invalid json");
} catch (error) {
  console.log("Something went wrong:", error.message);
} finally {
  console.log("This always runs");
}
\`\`\`

So here’s what happens: try runs first, if an error occurs then it goes to catch and from there finally runs. Keep in mind that even if you return inside catch, finally will still execute.

2. Throw your own errors

You can throw your own errors if built-in ones don’t work.

Like:

\`\`\`
throw new Error("Invalid input");
\`\`\`

Technically, you can throw anything:

\`\`\`
throw "Invalid input";
\`\`\`

But in all honesty, this method is not recommended because using Error objects will give you useful things like stack traces, which will make debugging much easier.

3. Custom error classes

This is how you can use it:

\`\`\`
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
  }
}
\`\`\`

Now, if you want to use this with a practical example:

\`\`\`
function registerUser(user) {
  if (!user.email) {
    throw new ValidationError("email", "Email is required");
  }
  if (user.password.length < 6) {
    throw new ValidationError("password", "Password too short");
  }
  return "User registered";
}
\`\`\`

Here’s how it is handled:

\`\`\`
try {
  registerUser({ email: "", password: "123" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Error in \${error.field}: \${error.message}\`);
  } else {
    console.log("Unexpected error:", error.message);
  }
}
\`\`\`

This way, you can handle different types of errors differently.

4. Async error handling

Things change a little with async, and here’s how it goes:

When you use async/await

\`\`\`
async function getData() {
  try {
    const res = await fetch("invalid-url");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
}
\`\`\`

And with Promises

\`\`\`
fetch("invalid-url")
  .then(res => res.json())
  .catch(err => console.log("Fetch failed:", err.message));
\`\`\`

Both can work just well, you just need to understand your working style.

Okay, so here’s a mistake a lot of people make, it’s pretty common:

They use empty catch blocks, something like this

\`\`\`
try {
  doSomething();
} catch (e) {}
\`\`\`

This ends up ignoring the error, and whoch makes debugging really difficult.

5. Global error handlers

If something is not caught anywhere, you can still handle it globally:

\`\`\`
window.onerror = function (message, source, lineno, colno, error) {
  console.log("Global error:", message);
};
\`\`\`

For unhandled promises:

\`\`\`
window.onunhandledrejection = function (event) {
  console.log("Unhandled promise:", event.reason);
};
\`\`\`

This is it!

Also you be asked something like this in the intervew as well:

Q. How do you handle errors in long promise chains?

You can answer like this -

I usually handle errors by attaching a .catch() at the end:

\`\`\`
doTask()
  .then(step1)
  .then(step2)
  .then(step3)
  .catch(err => {
    console.log("Error in chain:", err.message);
  });
\`\`\`

Or switching to async/await with a single try/catch to keep it cleaner.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-difference-between-localstorage-sessionstorage-a",
    categorySlug: "javascript",
    title: "What is the difference between localStorage, sessionStorage, and cookies?",
    content: "What is the difference between localStorage, sessionStorage, and cookies?",
    explanation: "Before getting into the differences between each, here’s what you must keep in mind: All three are used to store data in the browser, but they work quite differently depending on how long the data stays and who can access it.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["storage"],
    answers: [
      {
        content: `Before getting into the differences between each, here’s what you must keep in mind: All three are used to store data in the browser, but they work quite differently depending on how long the data stays and who can access it.

Let’s get into it:

1. localStorage

If you store something in ‘localStorage’, it stays there even after the browser is closed.

For example:

\`\`\`
localStorage.setItem("theme", "dark");
\`\`\`

You’ll usually use this for things like user preferences in theme, language, etc.

A couple of things that you should keep in mind are:

- Data will remain until you manually clear it
- Storage size is around 5–10MB
- Only accessible on the same origin
- It will store everything as strings

That was about it for localStorage, next you will look into sessionStorage.

2. sessionStorage

Pretty much similar to localStorage, but this one is a little short-lived.

Here’s how it is written:

\`\`\`
sessionStorage.setItem("formStep", "2");
\`\`\`

The data is cleared as soon as the tab is closed.

Also, one important difference people often miss: Even if you open the same site in two tabs, they don’t share sessionStorage.

So, there is same origin, but also tied to a single tab and it is good for temporary state like multi-step forms.

3. Cookies

Now, cookies work a bit differently

They are automatically sent with every HTTP request to the server.

\`\`\`
document.cookie = "user=Pranav";
\`\`\`

Because of that, they’re often used for authentication or server-related state.

Here’s what you should keep in mind about cookies:

- They are much smaller size, that is around 4KB
- They can have expiry dates
- Can be marked as httpOnly which is not accessible via JavaScript
- And it can be Secure only when it is sent over HTTPS

So, what most people get confused with is when to use what, for that, you can simple keep the following points in mind:

- Use localStorage - for long-term data like theme or preferences
- Use sessionStorage - for temporary data within a tab
- Use cookies - when the server needs access

Please not this:

You should avoid storing sensitive data like tokens in localStorage because any JavaScript running on the page can access it, which makes it vulnerable to XSS attacks.

For authentication, httpOnly cookies are safer since they are not accessible via JS.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-is-the-difference-between-shallow-copy-and-deep-copy-in",
    categorySlug: "javascript",
    title: "What is the difference between shallow copy and deep copy in JavaScript?",
    content: "What is the difference between shallow copy and deep copy in JavaScript?",
    explanation: "If you have worked with JavaScript, then you might have known that JavaScript stores objects as references and not values. This means that when you assign one object to another variable, both variables point to the same memory location.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["event-loop", "dom"],
    answers: [
      {
        content: `If you have worked with JavaScript, then you might have known that JavaScript stores objects as references and not values. This means that when you assign one object to another variable, both variables point to the same memory location.

Because of this behavior, you need to create copies of objects instead of referencing the same one. And that is why shallow copy and deep copy are used.

1. Shallow Copy

A shallow copy duplicates only the top-level properties of an object. If the object contains nested objects or arrays, those inner values are not copied. Instead, their references are shared between the original and the copied object.

Here are some ways through which you can create shallow copies:

- Spread operator { ...obj }
- Object.assign()
- Array.slice()
- Array.from()

Want to understand this better?

Let me give you an example of an object that contains nested data.

\`\`\`
const user = {
  name: "Alice",
  address: {
    city: "Mumbai"
  }
};
\`\`\`

Now create a copy using the spread operator:

\`\`\`
const copy = { ...user };
\`\`\`

At first glance it looks like a separate object. However, if you modify the nested property:

\`\`\`
copy.address.city = "Delhi";
\`\`\`

Both objects will now show "Delhi" as the city. This will happen because the nested ‘address’ object was not copied, only its reference was duplicated.

So although ‘user’ and ‘copy’ are different objects, their nested data still points to the same inner object in memory.

2. Deep Copy

Now when we look at deep copy, it creates a completely independent clone of the original object. Every nested object or array is copied recursively so that no references are shared.

Long time back, developers often used this pattern:

\`\`\`
JSON.parse(JSON.stringify(obj))
\`\`\`

This worked for simple data structures but had several limitations.

For example, it would break when the object contains:

- undefined
- functions
- Date objects - converted to strings
- Map or Set
- RegExp
- Infinity or NaN
- circular references

Because of these limitations, the latest inclusions of JavaScript provides better solution such as structuredClone().

As much as both are now differentiated, please read along for further information as they may be asked as follow-ups.

So, how is structuredClone() better?

The structuredClone() API was introduced in modern JavaScript runtimes and allows developers to create a true deep copy of many complex data structures.

Using the previous example:

\`\`\`
const deepCopy = structuredClone(user);
\`\`\`

Now if you modify the nested property:

\`\`\`
deepCopy.address.city = "Delhi";
\`\`\`

The original object will remain unchanged because structuredClone() will create a completely independent copy of all nested values.

The good thing is that this API supports several complex data types including:

- Map
- Set
- Date
- RegExp
- ArrayBuffer
- circular references

But keep in mind, it cannot clone certain things such as, functions, DOM nodes, Error objects.

When to Use Each Approach?

You’ll have to make that choice after seeing the structure of the data.

- Use spread or Object.assign when copying flat objects.
- Use structuredClone() when dealing with nested or complex data.
- Use JSON serialization only when working with simple, serializable data structures.

Interviewers sometimes ask what happens if the object being copied contains methods (functions). Since structuredClone() cannot clone functions, creating a deep copy of such objects requires a manual recursive clone or a utility library such as lodash.cloneDeep().

You can say that objects that contain methods are usually part of application logic and are not typically serialized or deeply cloned, which is why many deep-copy utilities focus primarily on data objects.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-debouncing-and-throttling-write-a-debounce-function",
    categorySlug: "javascript",
    title: "What are debouncing and throttling? Write a debounce function.",
    content: "What are debouncing and throttling? Write a debounce function.?",
    explanation: "Sometimes browser events fire too frequently which can slow down an application.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["event-loop", "dom", "performance"],
    answers: [
      {
        content: `Sometimes browser events fire too frequently which can slow down an application.

Now the event mentioned here simple actions like typing in a search bar, scrolling a page, or resizing a window may trigger a function dozens of times in a short period.

And so, developers use techniques like debouncing and throttling to control how often a function runs.

I’ll explain each with examples, so do look over them carefully!

1. Debouncing

Debouncing is used to delay the execution of a function until the user stops triggering the event till a certain amount of time.

For eg:

Imagine there is a search input field and a user is typing the word ‘tree’ into the search bar. If debouncing is not used in this case, then an API request might be sent on every keystroke.

Like: T, Tr, Tre, Tree. This will have 4 separate API calls.

Once debouncing is set, the function will wait until the user stops typing for a short delay, which could also be 300 milliseconds, before executing. Now, because of this, instead of 4, only 1 request is sent across.

Makes things convenient, right? Now we will look at throttling.

2. Throttling

You can say that throttling works a bit differently. So, remember how debouncing basically puts a delay before execution, and throttling allows a function to run at most once within a specified time interval.

Now what does that mean? I’ll explain with an example!

When a user scrolls down a page, the scroll event may fire many times per second. With the use of throttling, the function might run only once every 200 milliseconds.

Too many operations running at once mostly always slow down the system, which is why it is best to put such techniques in place to avoid blockages in the performance.

Here’s what you need to remember for both:

- Debounce waits for inactivity by the user
- Throttle limits how frequently a function can run

Writing a Debounce Function

Debounce function in particular is not so difficult to write; the only problem is that during interviews, many people get nervous, and that’s completely understandable. But don't worry, I have explained the process as well as given the example, so understanding this carefully will be enough!

Here's how it is going to go:

To build a debounce function, we need a way to remember the previous timer across multiple function calls. You can do this using closure.

Inside the debounce function, you will have to create a variable called ‘timeoutId’. Because it exists in the outer function scope, it stays available between calls.

Each time the debounced function is triggered, you first cancel the previous timer using ‘clearTimeout’ (timeoutId). This will make sure that if the user keeps triggering the event, such as typing quickly, the earlier scheduled execution is canceled.

After clearing the old timer, you need to create a new one using ‘setTimeout’. The timer waits for the specified delay and then executes the original function.

Another thing you need to remember is preserving the correct ‘this’ context and arguments.

When the delayed function finally runs, you can call the original function using ‘apply()’ so that it receives the same context and parameters passed to the wrapper.

Your debounce script should look like this:

\`\`\`
function debounce(fn, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
\`\`\`

Once the implementation has taken place, you can now expect that the function will only work after the event stops firing for the specified delay.

Leading vs Trailing Debounce

Yes, this is important to know, so please keep a note.

Most debounce implementations run on the trailing edge, which means that the function executes after the inactivity period.

A leading-edge debounce runs immediately on the first call and then ignores additional calls until the delay passes.

At the time of production, developers often use libraries like ‘Lodash’, which provide utilities such as ‘_.debounce()’ and ‘_.throttle()’ with additional options like leading, trailing, and maxWait.

During Interviews, a common follow-up question is: Why is debouncing useful for search inputs but throttling better for scroll events?

You can answer this by saying that Debouncing works well when you only want the final result after user interaction stops, while throttling is better when the application must respond periodically during continuous activity.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-event-bubbling-capturing-and-delegation",
    categorySlug: "javascript",
    title: "What are event bubbling, capturing, and delegation?",
    content: "What are event bubbling, capturing, and delegation?",
    explanation: "Event bubbling, capturing, and delegation are often explained together because they all relate to how events travel through the DOM.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["event-loop", "dom"],
    answers: [
      {
        content: `Event bubbling, capturing, and delegation are often explained together because they all relate to how events travel through the DOM.

You’ll have a better idea after reading the answer below.

Here’s a bit of context

In the browser, user interactions like clicks or keyboard inputs don’t stay limited to a single element. Instead, the event travels through the DOM tree in a process called event propagation.

Now the challenge here is to completely understand how the event works! So we’ll look into each of these three aspects from the question that is event bubbling, capturing, and delegation.

1. Event Bubbling

Remember this one line: a mechanism that propagates from child element to its ancestor.

What this basically means is that, event bubbling is the default behavior in the DOM event model. When an event occurs on an element, it first triggers on the target element and then propagates upward through its ancestor elements until it reaches the document.

For example, you can assume that there is a element inside a. If a user clicks the, the click event first fires on the and then bubbles up to the, its parent containers, and eventually the document.

Because of this behavior, a click on a child element can also trigger event listeners attached to its parent elements.

2. Event Capturing

Whatever you know about bubbling, say the exact opposite for event capturing.

What happens here is that during capturing, the event starts at the top of the DOM tree document and travels down toward the target element before the target handles the event.

You can enable capturin by passing {capture : true} as the 3rd parameter in addEventListener.

One thing you need to note here is that while event capturing is part of DOM event model, most developers choose bubbling instead for its flexibility.

event.target vs event.currentTarget

While you are at it, remember these properties as well, they are very well asked in interviews as follow-ups!

- event.target refers to the element where the event originally occurred.
- event.currentTarget refers to the element where the event listener is attached.

For example, if a click listener is attached to a but the user clicks a inside it, event.target will be the while event.currentTarget will be the.

3. Event Delegation

First remember: Event delegation is a technique that takes advantage if event bubbling.

Now how is that? Let us see.

Instead of attaching event listeners to every child element, a single listener can be attached to a parent element, and the handler can use event.target to determine which child triggered the event.

Dynamic lists usually find this approach useful, since the items here may be added or removed after the page loads. For instance, a can handle click events for all its items with a single listener instead of attaching separate listeners to each item.

When Delegation Does Not Work

Do not skip this, it is important to take a not of!

Event delegation only works for events that bubble. There are some events, such as focus, blur, and scroll that do not bubble.

In those cases, developers often use alternatives like focusin and focusout, which do support bubbling.

Stopping Event Propagation

Sometimes you may want to stop an event from moving further through the DOM. So, here’s what you must use.

- event.stopPropagation() prevents the event from continuing to ancestor elements.
- event.stopImmediatePropagation() does the same but also prevents other event listeners on the same element from executing.

This question may have started off with 3 definitions, but it has room for follow-ups, so do go through the full answer and prepare accordingly.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-does-the-javascript-event-loop-work",
    categorySlug: "javascript",
    title: "How does the JavaScript event loop work?",
    content: "How does the JavaScript event loop work?",
    explanation: "Okay, this doesn’t have to be too scary!",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["event-loop", "dom"],
    answers: [
      {
        content: `Okay, this doesn’t have to be too scary!

Quickly remember these words first: Callstack, WebAPIs, Macrotask queue, and Microtask queue.

Now that you have them in mind, I will be explaining the whole Javascript event loop through an example, with this you’ll be able to answer well even if you do or don’t have a code in front of you.

Assume you have a script first logging “1” , now after this a timer is scheduled using ‘setTimeout’ to log “2”. So on and so forth it moves on to scheduling a resolved Promise that logs "3", and finally logs **"4"\` synchronously.

When the script starts executing, every line first runs on the callstack. Since, Javascript executes synchronous operations one at a time, “1” gets printed first. Which is the first statement.

All while the execution happens, within the next step, the runtime encounters ‘setTimeout’.

Here, keep in mind, that the timers are not directly executed on the callstack and so, the timer is handed off to the browser’s Web APIs environment, which manages asynchronous operations such as timers, network requests, and DOM event listeners.

Finally, the script encounters ‘Promise.resolve().then(....). Remember that promise are scheduled in microtask queue instead of the general task queue.

After that, the final synchronous statement runs and prints "4".

Voila! At this point the synchronous code has finished and the callstack becomes empty.

But now is exactly where event loop starts its work!! The event loop continuously checks whether the stack is empty and then decides which queued tasks should run next.

Keep note that there are two important queues involved here. Timer callbacks, DOM events, and I/O operations are placed in the macrotask queue. Promise callbacks and functions scheduled with queueMicrotask() are placed in the microtask queue.

The critical rule of the event loop is that the microtask queue is always processed completely before the next macrotask runs.

So in this example, once the callstack is empty, the runtime first processes the microtask queue. The Promise callback runs and prints "3".

Only after all microtasks are finished does the event loop move to the macrotask queue, where the timer callback executes and prints **"2"\`.

This produces the final output:1, 4, 3, 2

Quite easy right!

Also, remember that setTimeout(fn, 0) does not execute immediately. Even with a zero delay, the callback still has to wait for the current callstack to finish and for all pending microtasks to run first.

Once you go through this example once or twice, you’ll be more than prepared but also, this is the kind of question that does come with a followup so you may be asked questions such as:

What happens if a microtask schedules another microtask?

You can say that In this case, the event loop continues draining the microtask queue until it becomes completely empty before moving on to the next macrotask. In extreme cases, this behavior can delay macrotasks and even affect rendering in the browser.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-template-literals-and-tagged-templates",
    categorySlug: "javascript",
    title: "What are template literals and tagged templates?",
    content: "What are template literals and tagged templates?",
    explanation: "Template literals are nothing but strings written using backticks instead of quotes. You probably have even used them without giving much thought.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `Template literals are nothing but strings written using backticks instead of quotes. You probably have even used them without giving much thought.

Let me show you an example:

1. Template literals:

\`\`\`
const name = "Justin";
console.log(\`Hello, \${name}\`);
\`\`\`

The \${} lets you insert values directly into the string.

And it’s not limited to variables, any expression works with it:

\`\`\`
const a = 5;
const b = 3;
console.log(\`Sum is \${a + b}\`);
console.log(\`Result is \${a > b ? "Yes" : "No"}\`);
\`\`\`

They also support multi-line strings without needing \\n:

Like:

\`\`\`
const text = \`This is line one
This is line two\`;
\`\`\`

Now we will look into tagged templates.

2. Tagged Templates

You might find this a little interesting.

Here, A tagged template is just a function that runs on a template literal.

\`\`\`
function tag(strings, ...values) {
  console.log(strings);
  console.log(values);
}
tag\`Hello \${"Justin"}, you have \${3} messages\`;
\`\`\`

If you log this, you’ll notice:

- strings - ["Hello ", ", you have ", " messages"]
- values - ["Justin", 3]

So the string is split into parts, and the dynamic values are passed separately.

Simple use case: sanitizing input

Let’s say you’re rendering HTML and want to escape user input:

\`\`\`
function safeHTML(strings, ...values) {
  const escape = (str) =>
    str.replace(/</g, "<").replace(/>/g, ">");
  return strings.reduce((result, str, i) => {
    const value = values[i] ? escape(String(values[i])) : "";
    return result + str + value;
  }, "");
}
const userInput = "<script>alert(1)</script>";
const output = safeHTML\`<p>\${userInput}</p>\`;
console.log(output);
\`\`\`

Here, only the interpolated values are escaped and not the full string.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-es-modules-default-vs-named-exports",
    categorySlug: "javascript",
    title: "What are ES modules? Default vs named exports.",
    content: "What are ES modules? Default vs named exports.?",
    explanation: "ES modules are basically used to package Javascript codes to reuse. It is the official standard format and it helps the code be split into smaller files so that they are able to improve efficiency while working.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["modules"],
    answers: [
      {
        content: `ES modules are basically used to package Javascript codes to reuse. It is the official standard format and it helps the code be split into smaller files so that they are able to improve efficiency while working.

You should first understand the basics of ES modules and what ‘import’ and ‘export’ are:

1. Exporting from a file

Let’s say you have this file:

\`\`\`
// utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export default function greet(name) {
  return \`Hello, \${name}\`;
}
\`\`\`

So here you can use 2 types of exports:

‘add’ and ‘multiply’ for named export and ‘greet’ for default export.

When you want to import a file, here’s what you can do.

2. Importing in another file

\`\`\`
// app.js
import greet, { add, multiply } from "./utils.js";
console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(greet("Jasmin"));
\`\`\`

Here are a couple of things that you must notice:

Named exports are imported using {}, and the names have to match unless you rename them.

\`\`\`
import { add as sum } from "./utils.js";
\`\`\`

Default export does not use {} and you can name it anything

\`\`\`
import sayHello from "./utils.js";
\`\`\`

This is the difference between the two:

| Named exports | Default exports |
| --- | --- |
| You can have multiple in a file | Only one per file |
| Must be imported using the same name or renamed | Can be imported with any name |

But what can you do if you don’t want to load everything upfront?

Yes! It is doable and you can use Dynamic import() for it.

For example:

\`\`\`
const module = await import("./utils.js");
console.log(module.add(2, 3));
\`\`\`

Since it is asynchronous and returns a promise, the working can be expected to be done differently. Mostly for lazy loading or code splitting.

Now you can also be asked the difference between ES Modules and CommonJS. So keep the following details in mind:

For ES Modules, it uses import / export and is Used in browsers and modern Node.js

For, CommonJS, it uses require() / module.exports and was previously used in Older Node.js style

One thing you should keep in mind: require() is synchronous, while import() is asynchronous.

Also, ES modules works in Node.js, here’s how you can enable it:

\`\`\`
{
  "type": "module"
}
\`\`\`

And in the browser:

\`\`\`
<script type="module" src="app.js"></script>
\`\`\`

This is all you need to know about ES modules! You can also be asked some follow-up questions around it, like:

What is tree shaking?

So, you can answer with:

Tree shaking is when unused code is removed during the build process. ES modules make this possible because imports and exports are statically defined.

So bundlers can figure out what is being used and safely remove the rest.

Now you’re done!`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-what-are-optional-chaining-and-nullish-coalescing",
    categorySlug: "javascript",
    title: "What are optional chaining (?.) and nullish coalescing (??)?",
    content: "What are optional chaining (?.) and nullish coalescing (??)?",
    explanation: "This might be a bit confusing at first, but worry not, I’ll walk you through it one by one!",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["javascript"],
    answers: [
      {
        content: `This might be a bit confusing at first, but worry not, I’ll walk you through it one by one!

1. Optional Chaining (?.)

Optional chaining is used when you’re accessing nested data, but you’re not very sure if every level exists.

You can use?. to safely access values. This is basically done so you don’t have to use multiple checks.

Let’s take an example:

\`\`\`
const user = {
 profile: {
   address: {
     city: "Mumbai"
   }
 }
};
console.log(user.profile.address.city); // "Mumbai"
\`\`\`

Now imagine if the API response changes and ‘address’ is missing:

\`\`\`
const user = {
 profile: {}
};
console.log(user.profile.address.city); // - this will show error
\`\`\`

To avoid this, you can use optional chaining:

\`\`\`
console.log(user.profile.address?.city); // undefined
\`\`\`

So your code doesn’t have to break, it returns undefined safely.

Now, Where can you use ?. ?

\`\`\`
obj?.a?.b       // property access
obj?.method()   // method calls
arr?.[0]        // array access
\`\`\`

If any part of the chain is null or undefined, evaluation stops there.

One thing you need to remember is:

Optional chaining cannot be used on the left side of assignment:

\`\`\`
user?.name = "John"; // invalid
\`\`\`

It is only meant for reading values.

2. Nullish Coalescing (??)

Now suppose you handled missing values, but you also want a fallback.

At first, most people use || for this.

It returns the right-hand side only if the left-hand side is null or undefined.

Here’s how:

\`\`\`
const name = null;
console.log(name ?? "Guest"); // "Guest"
\`\`\`

Here’s the difference between ?? and ||

Okay, this might be a bit confusing but stay with me:

The || operator treats many values as false, including:

- 0
- "" (empty string)
- false

So it can override valid values.

\`\`\`
const config = {
 port: 0
};
const port1 = config.port || 3000;
console.log(port1); // 3000
\`\`\`

Here, 0 is a valid value, but || ignores it.

Now using ??:

\`\`\`
const port2 = config.port ?? 3000;
console.log(port2); // 0
\`\`\`

So the difference is:

- || checks for falsy values
- ?? checks only for null or undefined

When you use both together

\`\`\`
const city = user.profile?.address?.city ?? "Not Available";
\`\`\`

Always remember: Optional chaining prevents errors, and nullish coalescing provides a fallback.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-how-do-async-await-work-how-do-you-handle-errors",
    categorySlug: "javascript",
    title: "How do async/await work? How do you handle errors?",
    content: "How do async/await work? How do you handle errors?",
    explanation: "async/await works by making a function return to its promise. You can say it’s a cleaner way to work with promises since you won’t have to deal with chaining .then() and .catch(), you can write asynchronous code that looks almost like normal synchronous code.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["async", "errors"],
    answers: [
      {
        content: `async/await works by making a function return to its promise. You can say it’s a cleaner way to work with promises since you won’t have to deal with chaining .then() and .catch(), you can write asynchronous code that looks almost like normal synchronous code.

Here’s how it works:

1. Async - Whenever you add async before a function, it will help to return it to the promise.

Example:

\`\`\`
async function getValue() {
 return 10;
}
\`\`\`

And so, this returns:

\`\`\`
Promise { 10 }
\`\`\`

2. Await - it is used inside an async function to hold the execution until a Promise is resolved.

Example:

\`\`\`
async function getData() {
 const response = await fetch("https://jsonplaceholder.typicode.com/users");
 const data = await response.json();
 console.log(data);
}
\`\`\`

So instead of .then(), You will just have to wait for the result.

Remember, this will not be blocking your code, it is used to just hold/pause the function.

How to handle errors?

Here’s how you can do it:

Use ‘try...catch’ for handling errors in async/await.

For example:

\`\`\`
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}
\`\`\`

This is basically the same as using .catch() on a Promise.

Now that your async/await uses are clear, let’s look into the common mistakes people make while using these (which you should bear in mind to avoid)

1. Forgetting to use await can cause bugs since you’ll end up having pending promise, especially in conditions.
2. If you use await inside forEach(), it won’t work as you require. Instead you should use for…of for sequential execution.

But what is Sequential Vs Parallel?

So basically,

Let’s say you want to fetch data for multiple users.

Here, Sequential is slower.

It works like this:

\`\`\`
for (const user of users) {
  await fetch(user.url);
}
\`\`\`

Each request will wait for the previous one.

Now Parallel is faster

It will work like:

\`\`\`
const promises = users.map(user => fetch(user.url));
await Promise.all(promises);
\`\`\`

Here, all requests run together.

Keep in mind that it is faster, but is only safe when tasks don’t depend on each other.

You’ll come across this a lot while working with APIs.

One important thing about Promise.all is that if even one Promise fails:

the whole Promise.all fails.

So what if you want partial results?

You can use Promise.allSettled():

Here:

\`\`\`
const results = await Promise.allSettled(promises);
\`\`\`

This will give status for each Promise instead of failing everything.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-ib-explain-map-filter-and-reduce-with-examples-implement-your-o",
    categorySlug: "javascript",
    title: "Explain map(), filter(), and reduce() with examples. Implement your own map().",
    content: "Explain map(), filter(), and reduce() with examples. Implement your own map().?",
    explanation: "Here, let’s understand the difference between each with the help of an example:",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["array-methods"],
    answers: [
      {
        content: `Here, let’s understand the difference between each with the help of an example:

1. map() is used to apply a function to every element in an array and use the return values to create a new array.

It should look like this:

\`\`\`
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
\`\`\`

So, each number gets transformed but the original array remains the same.

2. filter(), as the name suggests, is used when you only want some of the elements. Hence, it will return the elements of the array that pass a certain condition.

Check this out:

\`\`\`
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
\`\`\`

That is why, here, the values are selected instead of being changed.

3. reduce() - This one is a little different

reduc() is used when you want to turn an ARRAY into a SINGLE value.

It might feel a bit confusing right, but see, here’s how it works:

\`\`\`
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
\`\`\`

Here, the ‘acc’ stores the running result and ‘0’ is the starting value

Please note: One common mistake that most people make is forgetting the initial value. If you skip it, the first element becomes the accumulator. It might work sometimes, but eventually breaks for empty arrays.

Now, if you want to combine all in one string!

Here’s what you can do,

\`\`\`
const result = users
  .filter(user => user.isActive)
  .map(user => user.name)
  .reduce((acc, name) => acc + ", " + name, "");
console.log(result); // ", Rahul, Amit"
\`\`\`

This is just for an idea, you’ll see such patterns a lot more when you start working with APIs.

Oftentimes, people also get confused between map() and forEach().

The difference is that map() returns a new array and forEach() returns nothing. So if you’re not using the result, using map() won’t really make sense.

When it comes to implementing your own map

It’s just:

1. looping through the array

2. applying a function

3. storing the result

So, it looks something like this:

\`\`\`
function myMap(arr, callback) {
 const result = [];
 for (let i = 0; i < arr.length; i++) {
   result.push(callback(arr[i], i, arr));
 }
 return result;
}
\`\`\`

Try it:

\`\`\`
const nums = [1, 2, 3];
const output = myMap(nums, num => num * 2);
console.log(output); // [2, 4, 6]
\`\`\`

This is basically what map() does.`,
        isCorrect: true,
      },
    ],
  }
];
