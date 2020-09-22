const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/add',async (req,res) =>{
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
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
    let sql = `INSERT INTO order (user_id,course_id) VALUES ('${user_id}','${course_id}')`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});

router.post('/detail',async (req,res) =>{
    var order_id = req.body.order_id;
    var item_id = req.body.item_id;
    var quantity = req.body.quantity;
    var total = req.body.total;
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
    let sql = `INSERT INTO order (order_id,item_id,quantity,total) VALUES ('${order_id}','${item_id}','${quantity}','${total}')`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});

router.post('/', async(req,res) =>{
    var user_id = req.body.user_id;
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
    let sql = `SELECT DISTINCT orders.course_id,orders.user_id,course.status,course.title,users.username FROM orders inner join course on course.id = orders.course_id inner join users on users.id = course.host_id having orders.user_id = '${user_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/list', async(req,res) =>{
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
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
    let sql = `SELECT sum(order_detail.total*order_detail.quantity) as total,orders.*,course.status,course.title,users.username FROM orders inner join course on course.id = orders.course_id inner join users on users.id = course.host_id inner join order_detail on order_detail.order_id = orders.id group by orders.id having orders.user_id = '${user_id}' and orders.course_id = '${course_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/getdetail', async(req,res) =>{
    var order_id = req.body.order_id;
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
    let sql = `SELECT order_detail.*,item.name,item.price FROM order_detail inner join item on item.id = order_detail.item_id WHERE order_detail.order_id = '${order_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;
        
        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
module.exports = router;