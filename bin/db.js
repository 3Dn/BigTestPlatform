/**
 * Created by adm_korolev on 19.02.2016.
 */
var mysql       = require('mysql');
var dateFormat  = require('dateformat');
var connection  = mysql.createConnection({
    host        : '192.168.1.28',
    user        : 'zaslon',
    password    : 'zaslonPa$$',
    database    : 'zaslon',
    port        : '3306'
});

connection.connect();

/*module.exports = {
    foo_1: function () {
        connection.query('SELECT * from sys_log', function (err, rows, fields) {
            if (err) throw err;
            console.log('IS: ', rows[0].message);
            return true;
        });
    }
};*/

function data_for_chart(qu, callback) {
    var ret_arr = [];
    var t_arr = [];
    var sql = 'SELECT state, date from scale1_log WHERE state=0 and date >= DATE_SUB(NOW(), INTERVAL 3 DAY)';
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        rows.forEach(function (item) {
            t_arr.push(item.date);
        });
        //console.log('Test: ', dateFormat(rows[i].date, "dd-mm-yyyy HH:MM:ss"));

        for(var i = 0; i < t_arr.length; i=i+2 ){
            var t_obj = {};
            var arr = [];
            t_obj.date = Date.UTC(dateFormat(t_arr[i], "yyyy"), dateFormat(t_arr[i], "m"), dateFormat(t_arr[i], "dd"), dateFormat(t_arr[i], "HH"), dateFormat(t_arr[i], "MM"), dateFormat(t_arr[i], "ss"));
            var delta = (t_arr[i+1]-t_arr[i])/1000;
            var per_seconds = (20 / delta)*3600;
            t_obj.state = per_seconds - (per_seconds%1); // (20 / dt) * 3600 <- (== 60*60) in hour
            arr = [t_obj.date, t_obj.state];
            ret_arr.push(arr);
        }
        callback(ret_arr);
    });
}

module.exports.data_for_chart = data_for_chart;

//connection.end();