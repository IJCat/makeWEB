// "use strict";
let someValue = "hello";

function outerFunc() {
  console.log(this.someValue); // 첫번째 : ?, 두번째 : ?
  this.innerFunc();
}
const obj = {
  someValue: "world",
  outerFunc,
  innerFunc: function () {
    console.log("innerFunc's this : ", this); // 첫번째 : ?, 두번째 : ?
  },
};
obj.outerFunc(); // 첫번째
outerFunc(); // 두번째
