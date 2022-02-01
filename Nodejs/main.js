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
      db.query(`SELECT * FROM topic`, function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        // 'create' button
        var control = `
        <p>
        <button type="button" onclick="location.href='/create'">create</button>
        </p>
        `;

        // html body tag
        var body = `<h2>${title}</h2><p>${description}</p>`;

        // import method template module
        var list = template.list(topics);
        var html = template.HTML(title, list, control, body);

        response.writeHead(200);
        response.end(html);
      });
    } else {
      db.query(`SELECT * FROM topic`, function (error, topics) {
        // error exception
        if (error) {
          throw error;
        }

        // log topics => array
        // console.log(topics);

        // id값을 직접 주면(${queryData.id}) DB가 갖고있는 코드의 특성에 따라 공격받을 가능성이 있다. 사용자가 입력한 정보는 무조건 불신!
        // ?를 쓰고 ?에 무슨 값이 들어올 지를 두번재 인자로 전달.
        db.query(
          `SELECT * FROM topic LEFT JOIN author ON topic.author_id =author.id WHERE topic.id=?`,
          [queryData.id],
          function (error2, topic) {
            if (error2) {
              throw error2;
            }

            console.log(topic);

            // topic 데이터는 배열 형태로 들어온다.
            console.log(topic[0].title);

            // query의 where id = queryData.id 값으로 들어오는 object의 title & description
            var title = topic[0].title;
            var description = topic[0].description;

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

            // html body tag
            var body = `
            <h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `;

            // import method template module
            var list = template.list(topics);
            var html = template.HTML(title, list, control, body);

            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === '/create') {
    db.query(`SELECT * FROM topic`, function (error, topics) {
      db.query(`SELECT * FROM author`, function (error2, authors) {
        if (error2) {
          throw error2;
        }
        console.log(authors);
        var title = 'Create';

        // 'create' button
        var control = `
        <p>
        <button type="button" onclick="location.href='/create'">create</button>
        </p>
        `;

        // html body tag with form
        var body = `
        <form action="/create_process" method="post">
          <p>
            <input type="text" name="title" placeholder="title"/>
          </p>
          <p>
            <textarea name="description" placeholder="description" cols="30" rows="10"></textarea>
          </p>
          <p>
            ${template.authorSelect(authors)}
          </p>
          <p>
            <input type="submit" value="submit" />
          </p>
        </form>
        `;

        // import method template module
        var list = template.list(topics);
        var html = template.HTML(title, list, control, body);

        response.writeHead(200);
        response.end(html);
      });
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
      console.log(post.title);

      // db로 바로 insert함
      db.query(
        `INSERT INTO topic (title, description, created, author_id) VALUE(?, ?, NOW(), ?);`,
        [post.title, post.description, post.authorId],
        function (error, result) {
          if (error) {
            throw error;
          }

          // insert한 행의 값에 대한 id값으로 redirection
          response.writeHead(302, { Location: `/?id=${result.insertId}` });
          response.end();
        }
      );
    });
  } else if (pathname === '/update') {
    db.query(`SELECT * FROM topic`, function (error, topics) {
      if (error) {
        throw error;
      }

      // update할 db값 참조 -> id값으로 검색
      db.query(
        `SELECT * FROM topic WHERE id=?`,
        [queryData.id],
        function (error2, topic) {
          if (error2) {
            throw error2;
          }

          // 검색된 row값 log
          console.log(topic);

          // author table 조회
          db.query(`SELECT * FROM author`, function (error2, authors) {
            if (error2) {
              throw error2;
            }

            var list = template.list(topics);
            var control = `
              <p>
                <button type="button" onclick="location.href='/create'">create</button>
                <button type="button" onclick="location.href='/update?id=${topic[0].id}'">update</button>
              </p>
            `;

            var body = `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}"/>
              <p>
                <input type="text" name="title" placeholder="title" value="${
                  topic[0].title
                }"/>
              </p>
              <p>
                <textarea name="description" placeholder="description" cols="30" rows="10">${
                  topic[0].description
                }</textarea>
              </p>
              <p>
                ${template.authorSelect(authors, topic[0].author_id)}
              </p>
              <p>
                <input type="submit" value="submit" />
              </p>
            </form>
            `;

            var html = template.HTML(topic[0].title, list, control, body);

            response.writeHead(200);
            response.end(html);
          });
        }
      );
    });
  } else if (pathname === '/update_process') {
    var body = '';

    request.on('data', function (data) {
      console.log('data is =>', typeof data, data);
      body += data;
    });

    request.on('end', function () {
      console.log('body is =>', body);
      var post = qs.parse(body);

      // where 값 안넣으면 db 전체가 업데이트 됨!
      db.query(
        `UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
        [post.title, post.description, post.authorId, post.id],
        function (error, result) {
          if (error) {
            throw error;
          }

          // update한 행의 값에 대한 id값으로 redirection
          response.writeHead(302, { Location: `/?id=${post.id}` });
          response.end();
        }
      );
    });
  } else if (pathname === '/delete_process') {
    var body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      var post = qs.parse(body);

      // where 값 안넣으면 db 전체가 삭제됨!
      db.query(
        `DELETE FROM topic WHERE id=?`,
        [post.id],
        function (error, result) {
          if (error) {
            throw error;
          }

          // 삭제 후 Home으로 redirection
          response.writeHead(302, { Location: `/` });
          response.end();
        }
      );
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
