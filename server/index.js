const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


const login = require('./routers/api/login');
const course = require('./routers/api/course');
const shop = require('./routers/api/shop');
const user = require('./routers/api/user');
const menu = require('./routers/api/menu');
const item = require('./routers/api/item');
const order = require('./routers/api/order');
const course_detail = require('./routers/api/course_detail');
app.use('/api/course',course);
app.use('/api/login',login);
app.use('/api/shop',shop);
app.use('/api/user',user);
app.use('/api/menu',menu);
app.use('/api/item',item);
app.use('/api/order',order);
app.use('/api/course_detail',course_detail);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on post ${port}`));


