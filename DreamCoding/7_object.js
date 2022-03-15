'use strict';

// Objects
// one of the JavaScript's data types.
// a collection of related data and/or functionality.
// Nearly all objects in JavaScript are instance of Object

// 1. Literals and properties
console.log('--- 1. Literals and properties ---');
// const name = 'ellie';
// const age = 4;
// print(name, age);

// 인자가 많아지면 사용하기 힘들다.
// Logical 하게 그룹으로 묶어서 사용하면 좋다.

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const ellie = { name: 'ellie', age: 4 };
print(ellie);

// object = {key: value};
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

// 동적 언어이기 때문에 뒤에 오브젝트 멤버를 CRUD 할 수 있다.
// with JavaScript magic (dynamically typed language)
// can ad properties later
ellie.hasJob = true;
console.log(ellie.hasJob);

// can delete properties later
delete ellie.hasJob;
console.log(ellie.hasJob);

// 2. Computed properties
console.log('--- 2. Computed properties ---');
console.log(ellie.name);
console.log(ellie['name']); //key 는 항상 string type이어야 한다.
ellie['hasJob'] = true;
console.log(ellie.hasJob);

// computed properties는 동적으로 key의 value를 받아와야 할 때 유용하다
function printValue(obj, key) {
  console.log(obj[key]);
}
printValue(ellie, 'name');
printValue(ellie, 'age');

// 3. Property value shorthand
console.log('--- 3. Property value shorthand ---');
const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 3 };
const person3 = { name: 'dave', age: 4 };
const person4 = makePerson('junsoo', 35);
console.log(person4);

// key와 value가 같다면 생략가능(property value shorthand)
function makePerson(name, age) {
  return {
    name,
    age,
  };
}
// 4. Constructor function
console.log('--- 4. Constructor function ---');
const person5 = new Person('ellie', 30);
console.log(person5);

// 위 javascript 엔진이 object를 자동 생성해준다.
function Person(name, age) {
  // this = {}
  this.name = name;
  this.age = age;
  //return this;
}

// 5. in operator : property existence check (key in obj)
console.log('--- 5. in operator  ---');
console.log('name' in ellie);
console.log('age' in ellie);
console.log('random' in ellie);
console.log(ellie.random);

// 6. for...in vs for..of
console.log('--- 6. for...in vs for..of  ---');
// for (key in obj)
for (const key in ellie) {
  console.log(key);
}

//for (value of iterable)
const array = [1, 2, 4, 5];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

for (const value of array) {
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3...])
console.log('--- 7. Fun cloning  ---');
const user = { name: 'ellie', age: '20' };
const user2 = user;

user2.name = 'coder';
console.log(user);

// old way
const user3 = {};
for (const key in user) {
  user3[key] = user[key];
}
console.log(user3);

// Object.assign
const user4 = {};
Object.assign(user4, user);
console.log(user4);
const user5 = Object.assign({}, user); //이런식으로 return값을 받아와서 작성 해도 된다.

// another example
// 뒤에 나오는 파라미터가 다 오버로딩 한다.
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color);
console.log(mixed.size);
