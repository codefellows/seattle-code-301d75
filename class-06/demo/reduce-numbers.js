let nums = [1,2,3,4];

// nums is an instance of Array()

// Accumulator, Curent Value, Current Index

// Reduce Args: Callback Function, Initial State
let initialState = [];
let evens = nums.reduce( (currentState, value, idx) => {
  
  if (value % 2 === 0) { 
    currentState.push(value);
  }

  return currentState; // technically this is "next state"

}, initialState );
console.log(evens);

initialState = '';
let sentence = nums.reduce( (currentState, value, idx) => {
  return currentState + value;
}, initialState )

console.log(sentence);
