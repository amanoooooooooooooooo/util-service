// get the client
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ethwallet',
    connectionLimit: 10,
    queueLimit: 0
});


// pool.query('select * from address LIMIT 1').then(console.log)


// pool.getConnection().then((conn) => {
//     conn.query('select * from address LIMIT 1').then(console.log)
// })


async function main () {
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    // await conn.query(" INSERT INTO `key_value`(`key`, `value`, `version`) VALUES  ('wallet.eth.address.index', '2', 2);  ")
    await conn.query('INSERT INTO key_value SET ?', [{ key: 'keyy', value: 'valueee', version: 1 }])
    await conn.commit()
    await conn.rollback()
    await conn.release()
    // process.exit()
}



main()