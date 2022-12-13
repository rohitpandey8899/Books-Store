const express = require('express');
const con = require('./config');
//const path = require('path');
const bodyParser = require("body-parser");
const { error } = require('console');

const app = express();

// const pathJoin = path.join(__dirname,"public");
// app.use(express.static(pathJoin));
app.use(bodyParser.urlencoded());
app.use(express.json());
app.set('view engine','ejs');

app.get('',(_,res)=>{
    res.render('home');
});

//******************************************************************Book API******************************************************************

app.get('/newbook',(_,res)=>{
    res.render('newBooks');
});
app.post('/newbooks',(req,res)=>{
    let data = req.body;
    con.query('INSERT into books SET?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('newBooks');
    })
});


app.get('/updatebook',(_,res)=>{
    res.render('updatebook');
});
app.post('/updatebooks',(req,res)=>{
    let data = [req.body.Name, req.body.Price, req.body.Type, req.body.Id];
    con.query('UPDATE books SET Name=?,Price=?,Type=? WHERE Id=?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
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


app.delete('/:id',(req,res)=>{
    con.query('DELETE FROM books WHERE Id ='+req.params.id,(err,result,fields)=>{
        if(err) throw err
        res.render('showbook');
    })
});

//******************************************************************Sellers API******************************************************************

app.get('/newseller',(_,res)=>{
    res.render('newsellers');
});
app.post('/newsellers',(req,res)=>{
    let data = req.body;
    con.query('INSERT into sellers SET?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});


app.get('/updateseller',(_,res)=>{
    res.render('updateSeller');
});
app.post('/updatesellers',(req,res)=>{
    let data = [req.body.seller, req.body.address, req.body.contact, req.body.Id];
    con.query('UPDATE sellers SET seller=?,address=?,contact=? WHERE Id=?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});

//******************************************************************Sellers API******************************************************************

//******************************************************************Customer API******************************************************************

app.get('/newcustomer',(_,res)=>{
    res.render('newcustomer');
});
app.post('/newcustomers',(req,res)=>{
    let data = req.body;
    con.query('INSERT into customer SET?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});


app.get('/updatecustomer',(_,res)=>{
    res.render('updatecustomer');
});
app.post('/updatecustomers',(req,res)=>{
    let data = [req.body.cust, req.body.address, req.body.contact, req.body.Id];
    con.query('UPDATE customer SET cust=?,address=?,contact=? WHERE Id=?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});

// app.get('/show', (_, res) => {
//     con.query("select * from seller", (err, result) => {
//         if (err) {
//             res.send("some error")
//         }
//         else {
//             res.render('showbooks',{data:result});
//         }
//     });
// });


// app.delete('/:id',(req,res)=>{
//     con.query('DELETE FROM books WHERE Id ='+req.params.id,(err,result,fields)=>{
//         if(err) throw err
//         res.render('showbook');
//     })
// });

//******************************************************************Customer API******************************************************************


 //******************************************************************Purchase API******************************************************************

app.get('/purchaseBook',(_,res)=>{
    res.render('purchaseBook');
});
app.post('/purchBook',(req,res)=>{
    let data = req.body;
    con.query('INSERT into purchase SET?',data,(err,result,fields)=>{
        if(err) throw err
        res.render('home')
    })
});

//******************************************************************Purchase API******************************************************************

//******************************************************************Show List API******************************************************************

app.get('/showCustomer', (_, res) => {
    con.query("SELECT customer.cust,customer.address,customer.contact,purchase.qty,purchase.price FROM purchase INNER join customer ON customer.Id=purchase.custID;", (err, result) => {
        if (err) {
            res.send("some error")
        }
        else {
            res.render('showCustomer',{data:result});
        }
    });
});

app.get('/showSeller', (_, res) => {
    con.query("SELECT sellers.seller,sellers.address,sellers.contact,purchase.qty,purchase.price FROM purchase INNER join sellers ON sellers.Id=purchase.sellerID;", (err, result) => {
        if (err) {
            res.send("some error")
        }
        else {
            res.render('showSeller',{data:result});
        }
    });
});

//******************************************************************Show List API******************************************************************

app.get('*',(_,res)=>{
    res.render('404');
});






app.listen(5000, () => {
    console.log('server is started at 5000 port')
})




