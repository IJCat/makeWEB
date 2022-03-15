'use strict';

// Promise is a JavaScript object for asynchronous operation.
// State(promise의 상태): pending(operation이 수행중일 때) -> fulfilled(operation을 성공적으로 다 끝내면) or rejected(file을 찾을 수 없거나 network에 문제가 생긴다면)
// Producer(우리가 원하는 기능을 수행해서 해당하는 데이터를 만들어내는(promise object)) vs Consumer(소비)

// 1. Producer
// when new Promise is created, the executor runs automatically.!!
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log('doing something...');

  setTimeout(() => {
    resolve('success : ellie');
    // reject(new Error('no network'));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise //
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally');
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then(getEgg)
  .catch(error => {
    return '🌭';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
