const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const bcrypt = require("bcrypt");
const AI = require("./AI.js");
const querys = require("./Querys");
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
            
            await queryAsync(querys.User, values);

            const days=AI.Dias(req.body.dias);

            const peticion= AI.createRequest(req.body.Tipo_ejercicio,req.body.edad,req.body.peso,req.body.estatura,req.body.dedicacion,days,req.body.tiempo, req.body.equipo);
            const routine= await AI.RoutineRequest(peticion);

            console.log("Rutina Generada: ", routine);

            let routine_array=AI.Parser(routine);

            const tipo = req.body.Tipo_ejercicio+" "+req.body.correo;

            await queryAsync(querys.Rutina, [tipo]);
            const rutina_id=(await queryAsync(querys.rutinaIdS, [tipo])).rows[0].id_rutina;
            await queryAsync (querys.rutina_asignar, [req.body.correo, rutina_id]);

            for (i=0; i<routine_array.length; i++){


                let Obj_routine=AI.simplifier(routine_array[i]);

                const vef_ejercicio=await queryAsync(querys.ejercicio_exist, [Obj_routine.ejercicio]);
                

                if(vef_ejercicio.rows[0].count==0){
                    await queryAsync(querys.Ejercicios, [Obj_routine.ejercicio, Obj_routine.musculo]);
                }

                const ejercicio_id= (await queryAsync(querys.EjercicioidS, [Obj_routine.ejercicio])).rows[0].id_ejercicio;


               

                console.log("Datos a ingresar:",rutina_id, ejercicio_id, Obj_routine.dia, Obj_routine.ejercicio,Obj_routine.repeticiones, Obj_routine.series);
                if(Obj_routine.tipo=='Repeticiones'){
                    await queryAsync(querys.rutina_personalizada,[rutina_id, ejercicio_id, Obj_routine.repeticiones, 0,Obj_routine.series, Obj_routine.dia]);
                }else{
                    await queryAsync(querys.rutina_personalizada,[rutina_id, ejercicio_id, 0, Obj_routine.repeticiones ,Obj_routine.series, Obj_routine.dia]);
                }
               
                



            }

            res.json({ status: 1, mensaje: "USUARIO REGISTRADO!!!" });
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message });
        }
        
    });

    //endopint /check-usario verifica si el usario a ingresar ya existe dentro de la base de datos
    app.post('/check-usuario', async (req, res) => {
        try{
            
            const values = [
                req.body.correo
            ];

            const result = await queryAsync(querys.check_usuario, values);

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