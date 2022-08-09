const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "entries"
});

connection.connect(function(err){
    if(err){
        console.log("Sorry error on connection "+err);
        throw err;
    }
    console.log("Mysql connected successfully");
});

app.post('/search', (req,res)=>{
    connection.query(`SELECT *from entries WHERE word = "${req.body.word}" `, (err,rows)=>{
        if(err){
            return res.status(500).json({message:'INTERNAL_SERVER_EROOR'});
        }
        return res.json({
            total: rows.length,
            data: rows
        });
    });
});

const port = 3500;

app.listen(port,()=>{
    console.log('Server has been started at port ' + port);
});