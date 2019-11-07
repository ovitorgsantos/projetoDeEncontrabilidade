const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contabil-site',
    multipleStatements: true
});

module.exports = connection;