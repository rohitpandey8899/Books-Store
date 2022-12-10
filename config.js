const mysql= require("mysql");

const con= mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"book"
});

 // to check the connection.......
    con.connect((err)=>{
    if(err)
    {
        console.warn("not connect")
    }else{
        console.warn("connected!!!")
    }
    });

    module.exports = con;