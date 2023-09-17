const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (app) => {
    //endopoint /signup ingresa un nuevo usuario en la base de datos 
    app.post('/signup', async (req, res) => {
        try{
            const hashedContraseña = await bcrypt.hash(req.body.contraseña, 10);
            const values = [
            req.body.correo,
            hashedContraseña,
            req.body.nombre,
            req.body.apellido,
            req.body.peso,
            req.body.estatura,
            req.body.imagen_usuario,
            req.body.edad,
            ];
            const query = `INSERT INTO usuario (correo, contraseña, nombre, apellido, peso, estatura, imagen_usuario, edad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const result = await queryAsync(query, values);
            res.json({ status: 1, mensaje: "USUARIO REGISTRADO!!!" });
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message });
        }
        
    });

    //endopint /check-usario verifica si el usario a ingresar ya existe dentro de la base de datos
    app.post('/check-usuario', async (req, res) => {
        try{
            const query = `SELECT COUNT(*) as count FROM usuario WHERE correo = $1`;
            const values = [
                req.body.correo
            ];

            const result = await queryAsync(query, values);

            if(result.rows[0].count!=0){
                res.json({existe:true});
            }else{
                res.json({existe:false});
            }
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message });
        }
        
    });

}