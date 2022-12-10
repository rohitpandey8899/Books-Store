const express = require('express');
const con = require('./config');
const path = require('path');
const bodyParser = require("body-parser");


const app = express();

// const pathJoin = path.join(__dirname,"public");
// app.use(express.static(pathJoin));
app.use(bodyParser.urlencoded());
app.use(express.json());
app.set('view engine','ejs');

app.get('',(_,res)=>{
    res.render('home');
});

app.get('/show', (_, res) => {
    con.query("select * from books", (err, result) => {
        if (err) {
            res.send("some error")
        }
        else {
            res.render('showbooks',{data:result});
        }
    });
});

app.get('/newbook',(_,res)=>{
    res.render('newBooks');
});


app.get('*',(_,res)=>{
    res.render('404');
});


app.post('/newbooks',(req,res)=>{
    let data = req.body;
    con.query('INSERT into books SET?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});


app.delete('/:id',(req,res)=>{
    con.query('DELETE FROM books WHERE Id ='+req.params.id,(err,result,fields)=>{
        if(err) throw err
        res.render('showbook');
    })
});

app.listen(5000, () => {
    console.log('server is started at 5000 port')
})




