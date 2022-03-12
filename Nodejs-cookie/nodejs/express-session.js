var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var File;
var app = express();

app.use(
  session({
    secret: 'asdfasdfljhi2lkj2@@asdf', //버전관리를 한다면 다른걸로 바꿔서 올리거나 변수처리 해야한다.
    resave: false, // 그냥  false로 하면 됨. resave가 false이면 세션 데이터 값이 바뀌기 전까지는 세션 저장소의 값을 저장하지 않는다.
    saveUninitialized: true, // 그냥  true로 하면 됨. 세션이 필요하기 전까지는 세션을 구동시키지 않는다.
  })
);

app.get('/', function (req, res, next) {
  console.log(req.session);
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  res.send(`Views : ${req.session.num}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
