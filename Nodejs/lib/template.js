module.exports = {
  HTML: function (title, list, control, body) {
    var htmlTemplate = `
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
    return htmlTemplate;
  },
  list: function (topics) {
    var list = '<ul>';
    var i = 0;
    while (i < topics.length) {
      list += `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i += 1;
    }
    list += '</ul>';
    return list;
  },
};

// module.exports = template;
