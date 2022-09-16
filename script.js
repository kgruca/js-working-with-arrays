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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


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


// NEW SECTION
// Reverse
const arr2 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr2.reverse());
// logs ['j', 'i', 'h', 'g', 'f']
// reverse() DOES mutate the original array:
console.log(arr2);
// logs ['j', 'i', 'h', 'g', 'f']
