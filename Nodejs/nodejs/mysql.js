var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'cafe7979',
  database: 'opentutorials',
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
