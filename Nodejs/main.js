var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db');
var topic = require('./lib/topic');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(pathname);

  if (pathname === '/') {
    if (queryData.id === undefined) {
      topic.home(request, response); // topic과 관련된 모듈(함수)
    } else {
      topic.page(request, response); // 상세페이지 함수
    }
  } else if (pathname === '/create') {
    topic.create(request, response); // Create 페이지 함수
  } else if (pathname === '/create_process') {
    topic.create_process(request, response); // Create process 처리 함수
  } else if (pathname === '/update') {
    topic.update(request, response); // Update 페이지 함수
  } else if (pathname === '/update_process') {
    topic.update_process(request, response); // Update process 처리 함수
  } else if (pathname === '/delete_process') {
    topic.delete_process(request, response); // Delete process 처리 함수
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
