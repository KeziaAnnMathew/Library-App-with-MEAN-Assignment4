const express = require('express');
const addRouter=express.Router();
const Bookdata=require("../model/bookdata");
const Authordata=require("../model/authordata");
const multer= require ('multer');
const cors = require('cors');
const jwt=require('jsonwebtoken')
var bodyparser= require('body-parser');
addRouter.use(cors());
addRouter.use(bodyparser.json());
const path=require('path');
const storage=multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, './public/images');
          },
          filename: (req, file, cb) => {
            // cb(null, 'image-' + Date.now() + '.' + filetype);
            cb(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname));
          }
});
const upload=multer({
    storage:storage
});
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1];
    if(token=="null"){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()  
}
function router(){
    addRouter.post('/addbook',verifyToken,upload.single('img'),function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        img='http://localhost:3000/images/' + req.file.filename;
        var book= {
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:img,
            link:req.body.link
        }
        var bookItem= Bookdata(book);
        bookItem.save();
        
    });
    addRouter.post('/addauthor',upload.single('img'),verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        img='http://localhost:3000/images/' + req.file.filename;
        var item = {
            name:req.body.name,
            book:req.body.book,
            genre:req.body.genre,
            details:req.body.details,
            img:img,
            link:req.body.link
        }
        var author= Authordata(item);
        author.save();
    });

    return addRouter;
}




module.exports = router;