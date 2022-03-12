var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

function authIsOwner(req, res) {
  if (req.session.is_logined) {
    return true;
  } else {
    return false;
  }
}

function authStatusUI(req, res) {
  var authStatusUI = `<a href="/auth/login">login</a>`;
  if (authIsOwner(req, res)) {
    authStatusUI = `${req.session.nickname} | <a href="/auth/logout">logout</a>`;
  }
  return authStatusUI;
}

router.get('/', (req, res) => {
  console.log(req.session);

  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:400px; display:block; margin-top:10px;">
    `,
    `<a href="/topic/create">create</a>`,
    authStatusUI(req, res)
  );
  res.send(html);
});

module.exports = router;
