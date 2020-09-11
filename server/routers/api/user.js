const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Get 
router.get('/', async(req,res) =>{
    var db =  mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '1234',
        database    : 'foodorder'
    });
    await db.connect((error) => {
        if(error){
            throw error;
        }
    });
    let sql = `SELECT * from users `;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/', async(req,res) =>{
    var username = req.body.username;
    var db =  mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : '1234',
        database    : 'foodorder'
    });
    await db.connect((error) => {
        if(error){
            throw error;
        }
    });
    let sql = `SELECT * FROM users WHERE username = '${username}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;  
        if(result.length > 0){
            res.send(result);
        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
module.exports = router;