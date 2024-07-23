const mysql = require('mysql2')


 const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crud_mysql'
    })


conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to MySQL')
    }
})


module.exports = conn
