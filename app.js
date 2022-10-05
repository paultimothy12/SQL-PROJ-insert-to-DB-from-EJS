var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'books',
  password:  'password',
  multipleStatements: 'true' 
});

app.get("/", function(req, res){
    var q = "SELECT COUNT(*) AS count FROM books";
    connection.query(q, function(error, results){
        if(error) throw error;
        var count = results[0].count; 
        console.log("Number of books in DB:"+count);
        res.render("home"); 
    });
}); 
app.post("/register", function(req, res){
    var data= {title: req.body.title, author_fname:req.body.author_fname ,author_lname:req.body.author_lname, released_year:req.body.released_year, stock_quantity:req.body.stock_quantity, pages:req.body.pages};
    connection.query('INSERT INTO books SET?;',data,function(error, result) {
          if (error) throw error;
             res.redirect("/");
            });
        });
app.listen(8080, function(){
    console.log("Server running on 8080!");
});