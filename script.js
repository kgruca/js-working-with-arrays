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
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((arr, mov) => arr + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};


const calcDisplaySummary = function(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${out}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);

  // Display balance
  calcDisplayBalance(account);

  // Display summary 
  calcDisplaySummary(account);
}


// const user = 'Steven Thomas Williams';
// want to convert this to lower-case initials (stw)
// const username = user.toLowerCase().split(' ').map(name => 
// name[0]).join('');
// console.log(username);

// now make a function from this

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};
createUsernames(accounts);


// Event handlers for login

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting 
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`; 
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update the user's UI
    updateUI(currentAccount);
  }
});


// event handler for money transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(amount, receiverAccount);

  if (amount > 0 && 
    receiverAccount &&
    currentAccount.balance >= amount && 
    receiverAccount?.username !== currentAccount.username) {
      // doing the transfer
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
  }

  // update the user's UI
  updateUI(currentAccount);
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;


/*
// NEW SECTION
// FIND method

// retrieves an element from the array, using a callback function
const firstWithdrawal = movements.find(mov => mov < 0); 
console.log(firstWithdrawal);
// logs -400

// the difference between find() and filter() is that
// filter() returns a new array with all elems that satisfy the condition
// find() returns the first element that satisfies the condition

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
// logs {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 
// 2222, username: 'jd'}

// Challenge: corresponding for-Of loop:
for (const account of accounts) {
  if (account.owner === "Jessica Davis") console.log(account);
}
// logs {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 
// 2222, username: 'jd'}


// NEW SECTION
// Chaining methods together
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
// logs 5522.000000000001

// CAN ONLY CHAIN ONE METHOD TO ANOTHER IF THE FIRST RETURNS A NEW ARRAY

// when chaining methods, look for way to optimize them (reduce the total amt)
// makes errors less likely for larger arrays

// it's considered bad practice in JS to chain methods that directly mutate 
// the original array. So, try not to chain methods like splice() or reverse()


// NEW SECTION
// REDUCE method

// reduce() takes parameters: accumulator, current, i, array
// accumulator acts like a snowball - changes with each element
// in this case, it will add the elems of movements together 
// const balance = movements.reduce(function(acc, curr, i, arr) {
//   return acc + curr // accumulator is the sum of all the previous values
// }, 0); 
// this second value (0) is the amount that the accumulator should start at
// console.log(balance);
// logs 3840

const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);
// logs 3840

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
// logs 3840

// reduce() doesn't need to be used for just sums. Say we want the max value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
// logs 3000 


// NEW SECTION
// FILTER method

const deposits = movements.filter(function(mov) {  
  return mov > 0;
});

console.log(movements);
// logs [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposits);
// logs [200, 450, 3000, 70, 1300]
// only elements that satisfy the condition get added to the new array
 
//vs

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
// logs [200, 450, 3000, 70, 1300]

// so why not use for loop for everything?
// 1. because there is a push for this style of coding in JS now
// 2. the methods (functional) approach can chain methods one after another

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
// logs [-400, -650, -130]


// NEW SECTION
// MAP method
// let's say we want ot convert these from euro to dollars

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
// loop is more procedural. Modern JS is shifting to functional programming
// so map() is more often preferred over for-of

// challenge: to replace the callback for movementsUSD with an arrow func:
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD);
// logs [220.00000000000003, 495.00000000000006, -440.00000000000006, 
// 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// const movDesc = movements.map((mov, i, arr) => {
//   if (mov > 0) {
//     return `Movement ${i + 1}: You deposited ${mov}`;
//   } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
//   }
// }); 
// consolidate the code above using ternary operator + arrow function:

const movDesc = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);

console.log(movDesc);

// difference between using map() and forEach - forEach creates a 'side-effect'
// in that something is logged to the console. map() creates a new array
*/


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

