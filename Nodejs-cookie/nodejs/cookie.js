var http = require('http');
var cookie = require('cookie');
http
  .createServer(function (request, response) {
    console.log(request.headers.cookie);

    var cookies = {};

    // parse는 undefined를 수용하지 못한다.
    // header에 쿠키 데이터가 없을때를 위한 수정 코드.
    if (request.headers.cookie !== undefined) {
      var cookies = cookie.parse(request.headers.cookie);
    }

    console.log(cookies.tasty_cookie);

    response.writeHead(200, {
      'Set-Cookie': [
        'yummy_cookie=choco',
        'tasty_cookie=strawberry',
        `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`,
        'Secure=Secure; Secure',
        'HttpOnly=HttpOnly;HttpOnly',
      ],
    });

    response.end('Cookie!!');
  })
  .listen(3000);
