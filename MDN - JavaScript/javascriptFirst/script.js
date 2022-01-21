'use strict';

//이 이벤트리스너는 "DOMContentLoad" 이벤트가 발생되었을 때 function()을 실행한다는 의미
document.addEventListener('DOMContentLoaded', function () {
  function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'You clicked the button!';
    document.body.appendChild(para);
  }

  /*
  1. Get references to all the buttons on the page and sort them in an array.
  2. Loop through all the buttons and add a click event listener to each one.

  When any button is pressed, the createParagraph() function will be run.
*/

  const buttons = document.querySelectorAll('button');
  //모든 <button>태그를 List 형태로 buttons 변수에 저장한다.

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createParagraph);
  }
  //복수이기 때문에 for를 사용해 루프를 돌린다.
});
