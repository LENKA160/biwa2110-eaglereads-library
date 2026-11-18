const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '#HunterDoomZz20',
    database: 'eaglereads_db',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();