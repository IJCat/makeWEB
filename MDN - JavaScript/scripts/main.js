'use strict';

// let myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!';

// 조건문
// let iceCream = 'chocolate';
// if (iceCream === 'chocolate') {
//   alert('Yay, I love chocolate ice cream!');
// } else {
//   alert('Awwww, but chocolate is my favorite...');
// }

// 함수
function multiply(num1, num2) {
  let result = num1 * num2;
  return result;
}

console.log(multiply(4, 7));
console.log(multiply(20, 20));
console.log(multiply(0.5, 3));

// 이벤트
// document.querySelector('html').onclick = function () {
//   alert('Ouch! Stop poking me!');
// };

// 이미지 변경자 추가
let myImage = document.querySelector('img');

myImage.onclick = function () {
  let mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/firefox-icon.png') {
    myImage.setAttribute('src', 'images/Pengsu.png');
  } else {
    myImage.setAttribute('src', 'images/firefox-icon.png');
  }
};

// 개인화된 환영 메시지 추가하기
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
  let myName = prompt('Please enter your name.');
  if (!myName || myName === null) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Mozilla is cool, ' + myName;
  }
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = function () {
  setUserName();
};
