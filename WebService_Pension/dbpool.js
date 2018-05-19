/**
 * Created by nnnyy on 2016-05-11.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password : 's1980819',
    database : 'fourseason_pension_db'
});

module.exports = pool;