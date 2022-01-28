var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
  var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
  return template;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list += `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(pathname);

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var body = `<h2>${title}</h2><p>${description}</p>`;
        var control = `
            <p>
              <button type="button" onclick="location.href='/create'">create</button>
            </p>
            `;

        var template = templateHTML(title, list, body, control);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', function (err, filelist) {
        fs.readFile(
          `data/${queryData.id}`,
          'utf8',
          function (err, description) {
            var title = queryData.id;
            var list = templateList(filelist);
            var body = `<h2>${title}</h2><p>${description}</p>`;
            var control = `
            <p>
              <button type="button" onclick="location.href='/create'">create</button>
              <button type="button" onclick="location.href='/update?id=${title}'">update</button>
            </p>
            `;

            var template = templateHTML(title, list, body, control);
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', function (err, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
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
      var template = templateHTML(title, list, body, control);

      response.writeHead(200);
      response.end(template);
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
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = templateList(filelist);
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

        var template = templateHTML(title, list, body, control);
        response.writeHead(200);
        response.end(template);
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
      console.log(post);
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
