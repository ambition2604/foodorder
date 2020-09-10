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
app.use('/api/course',course);
app.use('/api/login',login);
app.use('/api/shop',shop);
app.use('/api/user',user);

 const port = process.env.PORT || 3000;

 app.listen(port, () => console.log(`Server started on post ${port}`));