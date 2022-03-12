var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
app.use(helmet());

var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlendcoded
app.use(compression()); // compress all responses

// session middleware
app.use(
  session({
    secret: 'asdfasdfljhi2lkj2@@asdf', //버전관리를 한다면 다른걸로 바꿔서 올리거나 변수처리 해야한다.
    resave: false, // 그냥  false로 하면 됨. resave가 false이면 세션 데이터 값이 바뀌기 전까지는 세션 저장소의 값을 저장하지 않는다.
    saveUninitialized: true, // 그냥  true로 하면 됨. 세션이 필요하기 전까지는 세션을 구동시키지 않는다.
    store: new FileStore(),
  })
);

// My milldeware
app.get('*', function (req, res, next) {
  fs.readdir('./data', function (error, filelist) {
    req.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
