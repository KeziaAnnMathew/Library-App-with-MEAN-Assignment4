const express = require('express');
const app= new express();
const Bookdata= require("./src/model/bookdata")
const port = 3000;
const cors = require('cors');
var bodyparser= require('body-parser');
app.use(cors());
app.use(bodyparser.json());
const booksrouter= require('./src/routes/bookRoutes')(app);
const authorsRouter= require('./src/routes/authorRoutes')(app);
const addRouter=  require('./src/routes/addRoutes')(app);
const signRouter= require('./src/routes/signRoutes')(app);
app.use(express.urlencoded({extended:true}))
app.use(express.static(require('path').join(__dirname,'/public')));
app.use('/books',booksrouter);
app.use('/',addRouter);
app.use('/',signRouter);
app.use('/authors',authorsRouter);
app.get('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    Bookdata.find()
    .then(function(books){
        res.send(books)
    })
});


app.listen(port,()=>{
    console.log("Server ready at port:"+port);
});
