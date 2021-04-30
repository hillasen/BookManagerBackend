const express = require('express');
var mysql = require('mysql');
const security = require('./security.js');
const app = express();
const port = process.env.PORT || 80;
const dbSecurity = security.dbSecurity;




app.get('/', (req, res)=> {
    res.send("Hello World!");
})

app.get('/add', (req, res) => {
    const connection = mysql.createConnection({
        host : dbSecurity.host,
        password : dbSecurity.password,
        user : dbSecurity.user,
        database : dbSecurity.database
        
    });
    queries = req.query;
    qry = "INSERT INTO `mybook` (`id`, `token`, `isbn`, `when`) VALUES (NULL, '" + queries.token + "', '" + queries.isbn +"', CURRENT_TIMESTAMP);"
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error);
        }
        console.log(results);
        
    })
    connection.end();
    res.send("OK");
});

app.get('/del', (req, res) => {
    const connection = mysql.createConnection({
        host : dbSecurity.host,
        password : dbSecurity.password,
        user : dbSecurity.user,
        database : dbSecurity.database
        
    });
    queries = req.query;
    qry = "DELETE FROM `mybook` WHERE `token` LIKE '" + queries.token + "' AND `isbn` = " + queries.isbn;
    console.log(qry);
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error);
        }
        console.log(results);
    })
    connection.end();
    res.send("OK");
});

app.get('/show', (req, res) => {
    const connection = mysql.createConnection({
        host : dbSecurity.host,
        password : dbSecurity.password,
        user : dbSecurity.user,
        database : dbSecurity.database
        
    });
    queries = req.query;
    qry = "SELECT * FROM `mybook` WHERE `token` LIKE '" + queries.token +"'";
    connection.query(qry, function(error, results, fields){
        if(error){
            console.log(error)
        }
        res.send(JSON.stringify(results))
    });

    connection.end();
});

app.listen(port , ()=>{
    console.log(`Running app on http://localhost:${port}`);
})