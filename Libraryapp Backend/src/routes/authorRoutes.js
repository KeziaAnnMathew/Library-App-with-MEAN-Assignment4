const express = require('express');
const authorsRouter=express.Router();
const Authordata= require("../model/authordata");

const multer= require ('multer');
const path=require('path');
const storage=multer.diskStorage({
        destination:'./public/images/',
        filename:function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname));
        }
});
const upload=multer({
    storage:storage
}).single('img');

function router(){
    authorsRouter.get('/',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        Authordata.find()
        .then(function(authors){
            res.send(authors)
        })
    })
    authorsRouter.put('/editauthor/:id',upload,function(req,res){
        const id=req.params.id;
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        img='http://localhost:3000/images/' + req.file.filename;
        var item = {
            name:req.body.name,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:img,
            link:req.body.link
        }
        Authordata.findByIdAndUpdate({_id:id}, item, (err,doc)=>{
                if(!err){res.send(doc)}
            })
    });
    authorsRouter.delete('/deleteauthor/:id',function(req,res){
        const id=req.params.id;
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        Authordata.findByIdAndRemove({_id : id},(err,doc)=>{
                if(!err){res.send(doc);}
            })
    });
    authorsRouter.get('/:id',function(req,res){
      res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id
        Authordata.findOne({_id : id})
        .then(function(author){
            res.send(author)
            });
    });

    return authorsRouter;
}




module.exports = router;