var mysql = require('mysql');
var moment = require('moment');

// Constants
var MYSQL_FORMAT = 'YYYY-MM-DD hh:mm:ss';

function createDatabaseInstance (callback) {
    var connection = mysql.createConnection({
        host     : 'mysql',
        user     : 'root',
        password : 'Pa55word',
        database : 'bookings'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            callback(err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);

        callback(null, connection);
    });
}

function generateInventory (req, res, next) {
    var start = moment('2015-06-29 18:00:00');
    var end = moment('2015-07-15 18:00:00');
    var current = start;

    var inventory = [];

    createDatabaseInstance(function(err, connection) {
        if (err) {
            return next(err);
        }

        while (current < end) {
            var now = current.format('LLLL');
            inventory.push([
                1,
                current.format(MYSQL_FORMAT),
                current.add(90, 'minutes').format(MYSQL_FORMAT),
                12,
                now,
                25
            ]);

            current.add(30, 'minutes');

            if (current.hour() > 19) {
                current = current.startOf('day').add(1, 'day').add(10, 'hours');
            }
        };

        console.log(inventory)

        connection.query('INSERT INTO inventory (activity_id, start_time, end_time, quantity, notes, price) VALUES ?', [inventory], function (err, bah) {
            console.log(err);
            console.log(bah)
        });
    });
};

module.exports = {
    generateInventory: generateInventory
};
