const axios = require('axios');
const url ='http://localhost:3000/api/login';
async function getc(){
    var res =await axios.get(url);
    console.log(res);
}
getc();