const { Pool } = require("pg");
const configs = require('../../configs/index')

const pool = new Pool(configs.database.posgresql)

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();  // release the client back to the pool
        if (err) {
            return console.error('Error executing query', err.stack);
        }
    });
});

module.exports = pool