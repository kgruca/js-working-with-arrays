'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements) {

  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i, ) {

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} 
        ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// NEW SECTION
// MAP method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// let's say we want ot convert these from euro to dollars
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd;
// });
// console.log(movements);
// logs [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movementsUSD);
// logs [220.00000000000003, 495.00000000000006, -440.00000000000006, 
// 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
// will learn later where the errors come from ^

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);
// logs [220.00000000000003, 495.00000000000006, -440.00000000000006, 
// 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
// so for of loop and map method create the same result

// the map method is more in line with functional programming, while for-of
// loop is more procedural

// challenge: to replace the callback for movementsUSD with an arrow func:
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD);
// logs [220.00000000000003, 495.00000000000006, -440.00000000000006, 
// 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// NEW SECTION
// Array transformations - Map, Filter, Reduce

/* 
1. map()
- is similar to the forEach() method as it loops over arrays,
but it creates a brand new array, based on the original array
- uses a callback function to transform the elems of the original 
array, and then maps the values of the original arr to a new array
- map returns a new array containing the results of applying an
operation on all original array elems

2. filter()
- returns a new array containing the array elems that passed a 
specified test condition
- all elems that do not pass the test condition are filtered out
and are not added to the new array

3. reduce()
- boils down (reduces) all array elems down to a single value
(e.g. adding all the elems together)


/* 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


*/


/*
// NEW SECTION
// forEach() works with maps and sets

// with a map
currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});
// logs USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

// with a set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// remember that sets create a list of UNIQUE values
console.log(currenciesUnique);
// logs {'USD', 'GBP', 'EUR'}
currenciesUnique.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});
// logs USD: USD
// GBP: GBP
// EUR: EUR
// this doesn't really make sense, since there is no key in sets
// key was kept in the list of params, to make it less confusing for devs
// this way, forEach() retains the same params for arrays, maps, and sets
// the list of params in this forEach() loop may be written as 
// forEach(value, _, map);
// '_' can be used for "throw-away" variables
*/ 


/*
// NEW SECTION
// For-Each Loop

// for camparison, the for-of loop:
for (const [index, movement] of movements.entries()) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// Movement 4: You deposited 3000
// Movement 5: You withdrew 650
// Movement 6: You withdrew 130
// Movement 7: You deposited 70
// Movement 8: You deposited 1300

console.log('---------FOREACH--------');

// for-each achieves the same thing, in a maybe easier way
// movements.forEach(function(movement) {
//   if(movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
// logs You deposited 200
// You deposited 450
// You withdrew 400
// You deposited 3000
// You withdrew 650
// You withdrew 130
// You deposited 70
// You deposited 1300

// what if we need to know the index of the value?
// for-of used entries() (modifying the above to demonstrate this)
// for-Each makes it easy in that it passes in the index, values, and arr
// so the above can become:
movements.forEach(function(movement, index, array) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// it's important that the 1st arg is always the element, the 2nd arg
// is always the index, and the 3rd arg is always the array
// logs Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// Movement 4: You deposited 3000
// Movement 5: You withdrew 650
// Movement 6: You withdrew 130
// Movement 7: You deposited 70
// Movement 8: You deposited 1300

// when should for-Of or forEach() be used?
// break and continue statements don't work in a forEach() loop
// if need to break out of a loop, then use for-Of loop
// other than that, it's up to personal preference
*/


/////////////////////////////////////////////////


/*
// NEW SECTION
// the At method
const arr = [23, 11, 78];
console.log(arr[0]);
// logs 23
// can now do the same thing with the new 'at' method
console.log(arr.at(0));
// logs 23

// why do we care? It does the same thing as the bracket notation
// there is one thing about it that makes it useful to use 
// suppose we want the value at the end of the array

// getting the last element
console.log(arr[arr.length - 1]);
// logs 78
// the other traditional way to do this is 
console.log(arr.slice(-1)[0]);
// logs 78 (without the [0], we would get [78] instead of 78)
console.log(arr.at(-1));
// logs 78

// so, it's a slightly faster and more modern way of grabbing the last element 
// so which should be used: bracket notation or at()? It depends 
// if need to grab last elem or count from end of array, use at()
// also use in situations in which you need to do method chaining (more later)
// otherwise, use bracket notation

// the at method also works on strings!
console.log('Svitlana'.at(-1));
// logs a
*/


/*
// NEW SECTION
// Slice
let arr = ['a', 'b', 'c', 'd', 'e'];
// slice returns a new array and does't mutate the original array
console.log(arr.slice(2));
// logs ['c', 'd', 'e']
console.log(arr.slice(2, 4));
// logs ['c', 'd']
console.log(arr.slice(-2));
// logs ['d', 'e']
console.log(arr.slice(-1));
// logs ['e']
console.log(arr.slice(1, -2));
// logs ['b', 'c']
// can also use slice() to create a shallow copy of an array
console.log(arr.slice());
// logs ['a', 'b', 'c', 'd', 'e']


// NEW SECTION
// Splice
// console.log(arr.splice(2));
// logs ['c', 'd', 'e']
// console.log(arr.splice(arr));
// logs ['a', 'b']
*/

/* therefore, the big difference between slice() and splice() it:
- slice() returns a new array and doesn't modify the original arr
- splice() modifies the original arr
*/

// commenting out above to be able to continue practicing with methods

// arr.splice(-1);
// console.log(arr);
// logs ['a', 'b', 'c', 'd']

// when passing two args into the splice() method, the 2nd arg is deleteCount
// so, the 2nd arg in splice() doesn't mean the ending
// arr.splice(1, 2);
// console.log(arr);
// logs ['a', 'd']
// so splicing starts at index 1 (b) and splices 2 elements away (b, and c)

// commenting out above to be able to continue practicing with methods


/*
// NEW SECTION
// Reverse
const arr2 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr2.reverse());
// logs ['j', 'i', 'h', 'g', 'f']
// reverse() DOES mutate the original array:
console.log(arr2);
// logs ['j', 'i', 'h', 'g', 'f']
arr2.reverse();


// NEW SECTION
// Concat
const letters = arr.concat(arr2);
console.log(letters);
// logs ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// this is the same as [...arr, ...arr2]
const letters2 = [...arr, ...arr2];
console.log(letters2);
// logs ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// neither of these 2 methods mutates the original array


// NEW SECTION
// Join
console.log(letters.join('-'));
// logs a-b-c-d-e-f-g-h-i-j
*/

