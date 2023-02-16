
var pg = require('pg');
var bodyParser = require('body-parser');
const path = require('path');

const config = {
    user: 'postgres',
    database: 'ited',
    password: 'postgres',
    port: 5432
};

const pool = new pg.Pool(config);



pool.connect(function (err, client, done) {

    if (err) {
        console.log("Can not connect to the DB" + err);
    }
    client.query('SELECT * FROM users WHERE id=8', function (err, result) {
        done();
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }
        console.log(result.rows);
        pool.end()
    })
})
