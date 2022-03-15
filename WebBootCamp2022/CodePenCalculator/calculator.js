/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

'use strict';

//Shortcut to get elements
var el = function (element) {
  // If passed an ID
  if (element.charAt(0) === '#') {
    return document.querySelector(element); // ... returns single element
  }

  return document.querySelectorAll(element); // Otherwise, returns a nodelist
};

// variables
var viewer = el('#viewer'); // Calculator screen where result is displayed
var equals = el('#equals'); // Equal button
var nums = el('.num'); // List of numbers
var ops = el('.ops'); // List of operators
var theNum = el(''); // Current number
var oldNum = el(''); // First number
var resultNum; // result
var operator; // Batman

// When: Number is clicked. Get the current number selected
var setNum = function () {
  if (resultNum) {
    // If a result was displayed, reset number
    theNum = this.getAttribute('data-num');
    resultNum = '';
  } else {
    // Otherwise, add digit to previous number (this is a string!)
    theNum += this.getAttribute('data-num');
  }

  viewer.innerHTML = theNum; // Display current number
};

// When: Operator is clicked. Pass number to oldNum and save operator
