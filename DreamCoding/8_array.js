'use strict';

// Array ❤

// 1. Declaration
console.log('--- 1. Declaration ---');
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
console.log('--- 2. Index position ---');
const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[fruits.length - 1]);

// 3. Looping over an array
// print all fruits
console.log('--- 3. Looping over an array ---');

// a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// b. for of
for (let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
fruits.forEach(fruit => console.log(fruit));

// 4. Addition, deletion, copy
console.log('--- 4. Addition, deletion, copy ---');

// push: add an item to the end
fruits.push('🍓', '🍇');
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
console.log(fruits);
fruits.pop();
console.log(fruits);

// unshift: add an item to the begining
// 앞에서부터 추가
fruits.unshift('🍓', '🍇');
console.log(fruits);

// shift: remove add an item from the begining
fruits.shift();
console.log(fruits);
fruits.shift();
console.log(fruits);

//note!! shift, unshift are slower than pop, push
// splice: remove an item by index position
fruits.push('🍓', '🥦', '🌽');
console.log(fruits);
fruits.splice(1, 1);
console.log(fruits);
fruits.splice(1, 1, '🍔', '🥚');
console.log(fruits);
// combine two arrays
const fruit2 = ['🍖', '🍤'];
const newFruits = fruits.concat(fruit2);
console.log(newFruits);

// 5. Searching
console.log('--- 5. Searching ---');
// indexOf: find the index
console.log(fruits);
console.log(fruits.indexOf('🌽'));
console.log(fruits.indexOf('🌭'));

// includes
console.log(fruits.includes('🌽'));
console.log(fruits.includes('🥫'));

// 6. lastIndexOf
console.log('--- 6. lastIndexOf ---');
fruits.push('🍎');
console.log(fruits);
console.log(fruits.indexOf('🍎'));
console.log(fruits.lastIndexOf('🍎'));
