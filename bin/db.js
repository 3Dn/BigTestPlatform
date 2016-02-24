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
    var sql = 'SELECT state, UTC_DATE(date) as date from scale1_log WHERE state=0 and date >= DATE_SUB(NOW(), INTERVAL 3 DAY)';
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        rows.forEach(function (item) {
            var obj = {};
            obj.date = item.date;
            t_arr.push(obj.date);
        });

        for(var i = 0; i < t_arr.length; i=i+2 ){
            var t_obj = {};
            var arr = [];
            var temp_date = new Date(t_arr[i]);
            //var temp_date = t_arr[i];

            t_obj.date = Date.UTC(temp_date.getFullYear(), temp_date.getMonth(), temp_date.getDay(), temp_date.getHours(), temp_date.getMinutes());

            t_obj.test = temp_date.getFullYear() + " : " + temp_date.getMonth() + " : " + temp_date.getDay() + " : " + temp_date.getHours() + " : " + temp_date.getMinutes();

            var delta = (t_arr[i+1]-t_arr[i])/1000;
            var per_seconds = (20 / delta)*3600;
            t_obj.state = per_seconds - (per_seconds%1); // (20 / dt) * 3600 <- (== 60*60) in hour

            arr = [temp_date, t_obj.state, t_obj.test];

            ret_arr.push(arr);
        }
        callback(ret_arr);
    });

}

module.exports.data_for_chart = data_for_chart;

//connection.end();