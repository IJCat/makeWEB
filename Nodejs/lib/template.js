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
  authorSelect: function (authors, author_id) {
    var tag = '';
    var i = 0;
    while (i < authors.length) {
      var selected = '';
      if (authors[i].id === author_id) {
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }

    var authorTag = `
    <select name="authorId">
      ${tag}
    </select>
    `;
    return authorTag;
  },
  makeControl: function (hasUpdate = false, hasDelete = false, queryId = '') {
    var control = `
          <p>
            <button type="button" onclick="location.href='/create'">create</button>
            `;
    if (hasUpdate === false) {
      return control + '</p>';
    } else {
      control += `
      <button type="button" onclick="location.href='/update?id=${queryId}'">update</button>
      </p>
      `;
    }

    if (hasDelete === true) {
      control += `
      <p>
        <form action="delete_process" method = "post">
          <input type="hidden" name="id" value="${queryId}">
          <input type="submit" value="delete">
        </form>
      </p>
          `;
    }
    return control;
  },

  makeParagraph: function (isPage, title, description, author) {
    var body = `
          <h2>${title}</h2>
          ${description}
          `;
    if (isPage === true) {
      return (body += `<p>by ${author}</p>`);
    }
    return body;
  },

  makeForm: function (
    formType,
    authorSelect,
    id = '',
    title = '',
    description = ''
  ) {
    var body = `<form action="/${formType}_process" method="post">`;

    if (formType === 'update') {
      body += `<input type="hidden" name="id" value="${id}"/>`;
    }
    body += `
              <p>
                <input type="text" name="title" placeholder="title" value="${title}"/>
              </p>
              <p>
                <textarea name="description" placeholder="description" cols="30" rows="10">${description}</textarea>
              </p>
              <p>
              ${authorSelect}
              </p>
              <p>
                <input type="submit" value="submit" />
              </p>
            </form>
            `;
    return body;
  },
};

// module.exports = template;
