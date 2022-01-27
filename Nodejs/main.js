var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
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
        <button type="button" onclick="location.href='/create'">create</button>
        <a href="/create">create</a>
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

        var template = templateHTML(title, list, body);

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

            var template = templateHTML(title, list, body);
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
      var body = `<form action="http://localhost:3000/precess_create" method="post">
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

      var template = templateHTML(title, list, body);

      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
