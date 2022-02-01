var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'cafe7979',
  database: 'opentutorials',
});

db.connect();

module.exports = db;
