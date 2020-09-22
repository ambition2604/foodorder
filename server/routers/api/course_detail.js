const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/get_user', async(req,res) =>{
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
    let sql = `select distinct orders.user_id,users.username from orders inner join users on users.id = orders.user_id where orders.course_id = '${course_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;

        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/get_list_order', async(req,res) =>{
    var course_id = req.body.course_id;
    var user_id = req.body.user_id;;
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
    let sql = `select orders.*,sum(order_detail.quantity*order_detail.total) as total from orders inner join order_detail on order_detail.order_id = orders.id inner join users on users.id = orders.user_id group by orders.id having orders.course_id = '${course_id}' and orders.user_id = '${user_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;

        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
router.post('/updatestatus',async (req,res) =>{
    var order_id = req.body.order_id;
    var list_status = req.body.list_status;
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
    var update_status ='Paid';
    if(list_status=='Paid') update_status = 'Unpaid';
    let sql = `UPDATE orders SET status = '${update_status}' WHERE id = '${order_id}'`;
    await db.query(sql,(error) => {
        if(error) throw error;
        res.send('Success');
    });    
    db.end();
});
router.post('/list_details', async(req,res) =>{
    var order_id = req.body.order_id;;
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
    let sql = `select orders.id,item.price,item.name,order_detail.quantity,(order_detail.quantity*order_detail.total) as total   from order_detail inner join item on item.id = order_detail.item_id inner join orders on orders.id = order_detail.order_id having orders.id = '${order_id}'`;        
    await db.query(sql,(error,result) => {
        if(error) throw error;

        if(result.length > 0){

            res.send(result);

        }else res.status(401).json({error: "Error"});
    });    
    db.end();
});
module.exports = router;