const express = require('express');
var mysql = require('mysql');
const security = require('./security.js');
const app = express();
const port = 3000;
const dbSecurity = security.dbSecurity;
const connection = mysql.createConnection({
    host : dbSecurity.host,
    password : dbSecurity.password,
    user : dbSecurity.user,
    database : dbSecurity.database
    
});

app.get('/', (req, res)=> {
    res.send("Hello World!");
})

app.get('/add', (req, res) => {
    queries = req.query;
    qry = "INSERT INTO `mybook` (`id`, `token`, `isbn`, `when`) VALUES (NULL, '" + queries.token + "', '" + queries.isbn +"', CURRENT_TIMESTAMP);"
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error);
        }
        console.log(results);
        
    })
    res.send("OK");
});

app.get('/del', (req, res) => {
    queries = req.query;
    qry = "DELETE FROM `mybook` WHERE `token` LIKE '" + queries.token + "' AND `isbn` = " + queries.isbn;
    console.log(qry);
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error);
        }
        console.log(results);
    })
    res.send("OK");
});

app.get('/show', (req, res) => {
    queries = req.query;
    qry = "SELECT * FROM `mybook` WHERE `token` LIKE '" + queries.token +"'";
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error)
        }
        res.send(JSON.stringify(results))
    });
    
});

app.listen(port , ()=>{
    console.log(`Running app on http://localhost:${port}`);
})