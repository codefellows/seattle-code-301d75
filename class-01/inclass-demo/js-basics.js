// Basic JS topics: Arrow functions & classes

// Arrow functions

// Write a function that takes in 2 numbers and returns the sum of those 2 numbers

function sum(a, b) {
  let add = a + b;
  return add;
}

let sumArrowFunction = (a, b) => {
  let add = a + b;
  return add;
};

// one line arrow functions: the coolest
let sumShortArrow = (a, b) => a + b;

// all three of these work the same way!


// classes: a new way of constructor functions

class Animal {
  constructor(name) {
    this.name = name;
  }

  sayHello = () => {
    console.log(`Hello from ${this.name}`);
  }
}

// extends means this Dog class is a special type of Animal
class Dog extends Animal {

  constructor(name, favoriteToy) {
    // super lets us access the superclass's constructor function
    super(name);
    this.favoriteToy = favoriteToy;
  }

  bark = () => {
    console.log('bark bark');
  }
}

let myAnimal = new Animal('Bingo');
let secondAnimal = new Dog('Spot');
