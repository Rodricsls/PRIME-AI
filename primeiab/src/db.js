const { Pool } = require('pg');
const {dbase} = require('./config');
require('dotenv').config();

const pool =new Pool({
    user: String(process.env.DB_USER),
    password:String(process.env.DB_PASSWORD),
    host:String(process.env.DB_HOST),
    port:String(process.env.DB_PORT),
    database:String(process.env.DB_NAME)

});

pool.connect(err => {
    if (err){
        console.log("conexion fallida al servidor: " + err.message);
    }else{
        console.log("conexion exitosa a la base de datos");
    }
});
module.exports = pool;