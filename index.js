var express = require('express');

// Constants
var PORT = 80;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/du', function (req, res) {
  res.send('ma\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
