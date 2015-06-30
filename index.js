var path = require('path');
var express = require('express');
var dust = require('express-dustjs');

// Constants
var PORT = 80;

// Controllers
var adminController = require('./controllers/admin');
var InventoryController = require('./controllers/inventory');

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

app.get('/console', adminController);

app.get('/inventory', InventoryController.generateInventory);

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
