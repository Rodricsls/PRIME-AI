// Import required modules
const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const select = require("./sql/SQuerys.js");

module.exports = (app) => {
    //endpoint construct routineObject
    app.post('/routineObject', async (req, res) => {
        const routineObject = {Domingo:[],Lunes:[],Martes:[],Miercoles:[],Jueves:[],Viernes:[],Sabado:[]};
        const correo=req.body.correo;
        console.log(correo);
        try{
            const routines = await queryAsync(select.rutinaId, [correo]);

            const ids=routines.rows;
            console.log(ids);
            for (i=0; i<ids.length; i++){
                const dias= await queryAsync(select.diasRutina, [ids[i].id_rutina]);
                console.log(2);
                for (a=0; a<dias.rows.length; a++){
                    const exerciseday= (await queryAsync(select.rutinaPersonalizada,[ids[i].id_rutina, dias.rows[a].dia])).rows;
                    let routineData={idr:ids[i].id_rutina, ejercicios:exerciseday};
                    switch(dias.rows[a].dia){
                        case "Domingo":
                            routineObject.Domingo.push(routineData);
                            break;
                        case "Lunes":
                            routineObject.Lunes.push(routineData);
                            break;
                        case "Martes":
                            routineObject.Martes.push(routineData);
                            break;
                        case "Miércoles":
                            routineObject.Miercoles.push(routineData);
                            break;
                        case "Jueves":
                            routineObject.Jueves.push(routineData);
                            break;
                        case "Viernes":
                            routineObject.Viernes.push(routineData);
                            break;
                        case "Sábado":
                            routineObject.Sabado.push(routineData);
                            break;
                    }
                }

            }
            res.json({ status: 1, mensaje: "Rutina obtenida", rutina:routineObject});

        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message});
        }
    });

    app.post('/DeleteRutina', async (req, res) => {
        try{
            const query1=`DELETE FROM asignar_rutinas WHERE id_rutina = $2 and correo =$1`;
            const values=[req.body.correo, req.body.id_rutina];
            const result=await queryAsync(query1, values);            

                res.json({ status: 1, mensaje: "Rutina Eliminada exitosamente!"});
                
            
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message});
        }
        
    });

}