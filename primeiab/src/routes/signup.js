const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const bcrypt = require("bcrypt");
const Routine_AI = require("./Routine_AI.js");
const insert = require("./sql/IQuerys.js");
const verify = require("./sql/VQuerys.js");
const saltRounds = 10;

module.exports = (app) => {
    //endopoint /signup ingresa un nuevo usuario en la base de datos 
    app.post('/signup', async (req, res) => {
        try{
            const hashedContraseña = await bcrypt.hash(req.body.contraseña, saltRounds);
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
            
            await queryAsync(insert.User, values);

            const days=Routine_AI.Dias(req.body.dias);

            const peticion= Routine_AI.createRequest(req.body.Tipo_ejercicio,req.body.edad,req.body.peso,req.body.estatura,req.body.dedicacion,days,req.body.tiempo, req.body.equipo);
            const routine= await Routine_AI.RoutineRequest(peticion);

            console.log("Rutina Generada: ", routine);

            let routine_array=Routine_AI.Parser(routine);

            const tipo = req.body.Tipo_ejercicio+" "+req.body.correo;

            await queryAsync(insert.Rutina, [tipo]);
            const rutina_id=(await queryAsync(querys.rutinaIdS, [tipo])).rows[0].id_rutina;
            await queryAsync (insert.rutina_asignar, [req.body.correo, rutina_id]);

            for (i=0; i<routine_array.length; i++){


                let Obj_routine=AI.simplifier(routine_array[i]);

                const vef_ejercicio=await queryAsync(verify.ejercicio_exist, [Obj_routine.ejercicio]);
                

                if(vef_ejercicio.rows[0].count==0){
                    await queryAsync(insert.Ejercicios, [Obj_routine.ejercicio, Obj_routine.musculo]);
                }

                const ejercicio_id= (await queryAsync(querys.EjercicioidS, [Obj_routine.ejercicio])).rows[0].id_ejercicio;


               

                console.log("Datos a ingresar:",rutina_id, ejercicio_id, Obj_routine.dia, Obj_routine.ejercicio,Obj_routine.repeticiones, Obj_routine.series);
                if(Obj_routine.tipo=='Repeticiones'){
                    await queryAsync(insert.rutina_personalizada,[rutina_id, ejercicio_id, Obj_routine.repeticiones, 0,Obj_routine.series, Obj_routine.dia]);
                }else{
                    await queryAsync(insert.rutina_personalizada,[rutina_id, ejercicio_id, 0, Obj_routine.repeticiones ,Obj_routine.series, Obj_routine.dia]);
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

            const result = await queryAsync(verify.check_usuario, values);

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