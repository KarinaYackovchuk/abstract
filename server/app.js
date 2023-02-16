const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var pg = require('pg');

const config = {
    user: 'postgres',
    database: 'ited',
    password: 'postgres',
    port: 5432
};

const pool = new pg.Pool(config);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/main', function (req, res) {
    res.json({ main: 'Hello World!' })
})

app.get('/question', function (req, res) {
    res.json({ question: 'Hello Karina!' })
})
app.get('/getallquestion', function (req, res) {
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(`SELECT * FROM questions;`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result.rows);
            res.json({ resultSaveQuestion: result.rows })
        })
    })

})
app.post('/savequestion', function (req, res) {
    console.log(req.body)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(`INSERT INTO questions (question, answer) values ('${req.body.question}','${req.body.answer}');`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result.rows);
            res.json({ resultSaveQuestion: 'Сохранено успешно' })
        })
    })

})

app.post('/editquestion', function (req, res) {
    console.log(req.body.id)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(`UPDATE questions SET answers='${answer}' WHERE id=${id};`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result.rows);
            res.json({ response: ' Изменено успешно' })
        })
    })

})

app.post('/delete_question', function (req, res) {
    console.log(req.body.id)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(`DELETE FROM questions WHERE id=${req.body.id}`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result.rows);
            res.json({ response: 'Удалено успешно' })
        })
    })

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
