/**
 * Created by adm_korolev on 19.02.2016.
 */
var mysql       = require('mysql');
var connection  = mysql.createConnection({
    host        : '192.168.1.28',
    user        : 'zaslon',
    password    : 'zaslonPa$$',
    database    : 'zaslon',
    port        : '3306'
});

connection.connect();

module.exports = {
    foo_1: function () {
        connection.query('SELECT * from sys_log', function (err, rows, fields) {
            if (err) throw err;
            console.log('IS: ', rows[0].message);
            return "abc";
        });
    }
};

function foo() {
    connection.query('SELECT * from sys_log', function (err, rows, fields) {
        if (err) throw err;
        console.log('IS: ', rows[0].message);
        return 0;
    });
};

module.exports.foo = foo;

//connection.end();