const express = require('express');
const signRouter=express.Router();
const Userdata=require("../model/userdata");
// const Bookdata= require("../model/bookdata");
const jwt=require('jsonwebtoken')
function router(){
   signRouter.post('/validateuser',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        let userdataname= req.body.user.uname;
        let userdatapassword=req.body.user.password;
        Userdata.findOne({$or: [{username:userdataname},{email:userdataname}],password:userdatapassword},(err,doc)=>{
            if(!doc){
                res.send(doc)
               }    
            else{
                let payload={subject:userdataname+userdatapassword}
                let token=jwt.sign(payload,'secretKey')
                res.send({doc:doc,token:token})
               }
                
                
    })
   });    
    signRouter.post('/adduser',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        var item = {
            fname:req.body.user.fname,
            lname:req.body.user.lname,
            username:req.body.user.username,
            email:req.body.user.email,
            password:req.body.user.password,
            permission:"user"
        }
        var user= Userdata(item);
        user.save();
    });
   
    return signRouter;
}




module.exports = router;