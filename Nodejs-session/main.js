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
    key: 'is_logined',
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use(
  session({
    key: 'nickname',
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
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
