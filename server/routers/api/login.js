const express = require('express');
const mysql = require('mysql');
const secret = "private";
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
    let sql = `SELECT * from course `;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
//Post
router.post('/',async (req,res) =>{
    var username = req.body.username;
    var password = req.body.password;
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
    let sql = `SELECT * from users WHERE username = '${username}' and password = '${password}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){
            const token=jwt.sign({username},secret,(error,token) => {
                res.header("auth-token", token).send(token);
        });
        
        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
function authenticateToken(req, res, next) {
    const token = req.headers['auth-token'];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token,'private',(error,username) =>{
        if(error)   return res.sendStatus(403);
        req.username = username;
        next();
    });
};
module.exports = router;