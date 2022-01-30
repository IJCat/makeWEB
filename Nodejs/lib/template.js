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
  authorSelect: function (authors) {
    var tag = '';
    var i = 0;
    while (i < authors.length) {
      tag += `<option value="${authors[i].id}"}>${authors[i].name}</option>`;
      i++;
    }

    var authorTag = `
    <select name="author">
      ${tag}
    </select>
    `;
    return authorTag;
  },
};

// module.exports = template;
