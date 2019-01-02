const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/**
 * Assuming DB/TABLE is already set
 * DB - Table - FORM_TAB
 * FORM_ID, FORM_NAME, FORM_HTML
 * 
 */

db conn
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'inputDB'
});

connection.connect(err => {
    if(err){
        console.log("Database Error: ", err);
        process.exit(1);
    }
    console.log("Connected To Database.");
})

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// routes
app.post('/newInput', (req, res) => {
    console.log(res);
    // get data and pass it to insert
    var data = req.body
    var r = insertToDB(data)
    if(r){
        res.json({success: true, msg: 'insert successful'})
    }else{
        res.json({success: false, msg: 'insert error'})
    }
});

app.get('/render/:id', (req, res) => {
    var html = getFromDB(req.params.id);
    res.send(html)
})

// db func
insertToDB = data => {
    var sql = `INSERT TO FORM_TAB (FORM_NAME, FORM_HTML) VALUES ('${data.name}', '${data.html}')`;
    connection.query(sql, (err, res, fields) => {
        if(err){
            console.log("Query Error: ", err);
            return false;
        }
        connection.commit(err => {
            if(err){
                console.log("Commit Error: ", err);
                return false;
            }
        })
        return true;
    })
}

getFromDB = name => {
    var sql = `SELECT FORM_HTML FROM FORM_TAB WHERE FORM_NAME = '${name}'`;
    connection.query(sql, (err, res) => {
        if(err){
            console.log("Query Error: ", err);
            return false;
        }
        return res;
    })
}

// start server
app.listen(3000);
console.log("Server Started!");

