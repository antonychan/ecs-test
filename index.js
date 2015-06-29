var path = require('path');
var express = require('express');
var dust = require('express-dustjs');

// Constants
var PORT = 80;

// App
var app = express();
// Use Dustjs as Express view engine
app.engine('dust', dust.engine({
  // Use dustjs-helpers
  useHelpers: true
}));
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './templates'));

app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/du', function (req, res) {
  res.send('ma\n');
});

app.get('/console', function (req, res) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'mysql',
        user     : 'root',
        password : 'password',
        database : 'bookings'
    });

    connection.connect();

    var query = 'INSERT INTO reservations (check_in_time, check_in_date, number_of_people) VALUES (?, ?, ?)';
    var values = ['19:00:00', '2015-06-28', 2];
    connection.query(query, values, function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.', err);
    });

    connection.end();
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
