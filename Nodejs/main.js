var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'cafe7979',
  database: 'opentutorials',
});

db.connect();

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(pathname);

  if (pathname === '/') {
    if (queryData.id === undefined) {
      /* fs.readdir('./data', function (err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var body = `<h2>${title}</h2><p>${description}</p>`;
        var control = `
        <p>
        <button type="button" onclick="location.href='/create'">create</button>
        </p>
        `;
        var html = template.HTML(title, list, body, control); 
      */

      db.query(`SELECT * FROM topic`, function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        // html body tag
        var body = `<h2>${title}</h2><p>${description}</p>`;

        // 'create' button
        var control = `
        <p>
        <button type="button" onclick="location.href='/create'">create</button>
        </p>
        `;

        // import method template module
        var list = template.list(topics);
        var html = template.HTML(title, list, body, control);

        response.writeHead(200);
        response.end(html);
      });
    } else {
      /* fs.readdir('./data', function (err, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          var list = template.list(filelist);
          var body = `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`;
          var control = `
            <p>
            <button type="button" onclick="location.href='/create'">create</button>
              <button type="button" onclick="location.href='/update?id=${sanitizedTitle}'">update</button>
              <form action="delete_process" method = "post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
              </form>
              </p>
              `;
          var html = template.HTML(sanitizedTitle, list, body, control); */

      db.query(`SELECT * FROM topic`, function (error, topics) {
        // error exception
        if (error) {
          throw error;
        }

        // log topics => array
        console.log(topics);

        // id값을 직접 주면(${queryData.id}) DB가 갖고있는 코드의 특성에 따라 공격받을 가능성이 있다. 사용자가 입력한 정보는 무조건 불신!
        // ?를 쓰고 ?에 무슨 값이 들어올 지를 두번재 인자로 전달.
        db.query(
          `SELECT * FROM topic WHERE id=?`,
          [queryData.id],
          function (error2, topic) {
            // error2 exceiption
            if (error2) {
              throw error2;
            }

            // topic 데이터는 배열 형태로 들어온다.
            console.log(topic[0].title);

            // query의 where id = queryData.id 값으로 들어오는 object의 title & description
            var title = topic[0].title;
            var description = topic[0].description;

            // html body tag
            var body = `<h2>${title}</h2>${description}`;

            // button tag
            var control = `
            <p>
              <button type="button" onclick="location.href='/create'">create</button>
              <button type="button" onclick="location.href='/update?id=${queryData.id}'">update</button>
              <form action="delete_process" method = "post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>
            </p>
            `;

            // import method template module
            var list = template.list(topics);
            var html = template.HTML(title, list, body, control);

            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', function (err, filelist) {
      var title = 'WEB - create';
      var list = template.list(filelist);
      var body = `<form action="/create_process" method="post">
      <p>
      <input type="text" name="title" placeholder="title"/>
      </p>
      <p>
      <textarea name="description" placeholder="description" cols="30" rows="10"></textarea>
      </p>
      <p>
      <input type="submit" value="submit" />
      </p>
      </form>
      `;
      var control = '';
      var html = template.HTML(title, list, body, control);

      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === '/create_process') {
    var body = '';

    request.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10,6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        request.connection.destroy();
      }
    });

    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post.title);
      // use post['blah'], etc.

      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (err, filelist) {
      var filteredId = path.parse(queryData.id).base;

      fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var body = `
        <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}"/>
            <p>
            <input type="text" name="title" placeholder="title" value="${title}"/>
            </p>
            <p>
            <textarea name="description" placeholder="description" cols="30" rows="10">${description}</textarea>
            </p>
            <p>
            <input type="submit" value="submit" />
            </p>
            </form>
        `;
        var control = `
        <p>
        <button type="button" onclick="location.href='/create'">create</button>
        <button type="button" onclick="location.href='/update?id=${title}'">update</button>
        </p>
          `;
        var html = template.HTML(title, list, body, control);

        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === '/delete_process') {
    var body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;

      fs.unlink(`data/${filteredId}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
