const mysql = require('mysql2');

let connection;
function getConnection(){
    if(!connection){
        connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'route',
        database: 'testdb'
    });
    connection.connect();

}
return connection;
}



function getAllDogs(callback) {
    getConnection().query('SELECT * FROM dogs', function (err, rows) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, rows)
        }
    })
}

function createDog(name, age, nick, callback) {
    const sql = 'INSERT INTO `dogs`(`name`, `age`, `nick`) VALUES (?, ?, ?)';
    const values = [name, age, nick];
   
    getConnection().execute(sql, values, function (err, result) {
        if (err) {
            callback(err, null);
        }
        getConnection().query('SELECT * FROM dogs', function (err, rows) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        })
    })
}

module.exports = { getAllDogs, createDog };