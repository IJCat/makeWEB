// Links 객체 생성
var Links = {
  // 컬러를 지정하는 코드 중복 해결
  setColor: function (color) {
    // var alist = document.querySelectorAll("a");
    // var i = 0;
    // while (i < alist.length) {
    //   alist[i].style.color = color;
    //   i = i + 1;
    // }
    $("a").css("color", color);
  },
};

// Body 객체 생성
var Body = {
  setColor: function (color) {
    // document.querySelector("body").style.color = color;
    $("body").css("color", color);
  },

  setColorOnBackground: function (color) {
    // document.querySelector("body").style.backgroundColor = color;
    $("body").css("backgroundColor", color);
  },
};

// 함수 안에서 파라미터로 자기 자신을 사용할 때는 self 사용. (this 전역객체를 가리킴!!)
function nightDayHandler(self) {
  // querySelector은 ('태그')의 첫번째 부분만 가져온다
  // 전체를 사용하고 싶으면 querySelectorAll을 사용!
  var target = document.querySelector("body");

  if (self.value === "night") {
    Body.setColorOnBackground("black");
    Body.setColor("white");
    self.value = "day";
    Links.setColor("white");
  } else {
    Body.setColorOnBackground("white");
    Body.setColor("black");
    self.value = "night";
    Links.setColor("purple");
  }
}
