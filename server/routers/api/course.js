const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Get 
router.post('/', async(req,res) =>{
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
    var status = 'Opening';
    let sql = `SELECT users.username,course.title,course.status,course.id,course.shop_id,shop.name,shop.phone,users.username FROM course inner join shop on shop.id  = course.shop_id inner join users on course.host_id = users.id having course.status = '${status}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});

//Post

router.post('/id', async(req,res) =>{
    var host_id = req.body.host_id;
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
    let sql = `SELECT course.id,course.title,course.createDate,course.status,course.host_id,shop.name,shop.phone FROM course inner join shop on shop.id  = course.shop_id having course.host_id = '${host_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});


router.post('/add',async (req,res) =>{
    var title = req.body.title;
    var des = req.body.des;
    var shop_id = req.body.shop_id;
    var host_id = req.body.host_id;
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
    let sql = `INSERT INTO course (title,des,shop_id,host_id) VALUES ('${title}','${des}','${shop_id}','${host_id}')`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});
router.post('/updatestatus',async (req,res) =>{
    var course_id = req.body.course_id;
    var course_status = req.body.course_status;
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
    var update_status ='Closing';
    if(course_status=='Closing') update_status = 'Opening';
    let sql = `UPDATE course SET status = '${update_status}' WHERE id = '${course_id}'`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});
module.exports = router;