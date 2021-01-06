const express = require('express');
const booksrouter=express.Router();
const Bookdata= require("../model/bookdata")

const multer= require ('multer');
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
function router(){
    booksrouter.get('/',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        Bookdata.find()
        .then(function(books){
            res.send(books)
        })
        
    });

    booksrouter.put('/editbook/:id',upload.single('img'),function(req,res){
        const id=req.params.id;
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        img='http://localhost:3000/images/' + req.file.filename;
        var item = {
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:img,
            link:req.body.link
        }
        Bookdata.findByIdAndUpdate({_id:id}, item, (err,doc)=>{
                if(!err){res.send(doc)}
             })
    });
    booksrouter.delete('/deletebook/:id',function(req,res){
        const id=req.params.id;
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        Bookdata.findByIdAndRemove({_id:id},(err,doc)=>{
        if(!err){res.send(doc);}
    });
    });
    booksrouter.get('/:id',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id
        Bookdata.findOne({_id : id})
        .then(function(book){
            res.send(book)
            });
    });
    return booksrouter;
}




module.exports = router;