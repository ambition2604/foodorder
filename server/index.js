const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


const login = require('./routers/api/login');
const course = require('./routers/api/course');


app.use('/api/course',course);

 const port = process.env.PORT || 3000;

 app.listen(port, () => console.log(`Server started on post ${port}`));