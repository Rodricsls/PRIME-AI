const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const bcrypt = require("bcrypt");
const AI = require('./AI');

module.exports = (app) => {
    //Endpoint /login verifica si existe el usuario
    app.post('/login', async (req, res) => {
        try{
            const query1=`SELECT contraseña FROM usuario U WHERE U.correo=$1`;
            const values=[req.body.correo];
            const result=await queryAsync(query1, values);
            if (result.rows.length===0){
                res.json({ status: 0, mensaje: "El usuario ingresado no existe" , autenticacion:false});
            }else{
                const aux=result.rows[0].contraseña;
                
                const contraseñasCoinciden = await bcrypt.compare(req.body.contraseña, aux);
                if(contraseñasCoinciden){
                    res.json({ status: 1, mensaje: "Usuario autenticado", autenticacion:true});
                }else{
                    res.json({ status: 0, mensaje: "contraseña incorrecta", autenticacion:false});
                }
            }
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message});
        }
        
    });



}