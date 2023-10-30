// Import required modules
const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const select = require("./sql/SQuerys.js");
const dietObject = {Lunes:{Desayuno:{}, Almuerzo:{}, Cena:{}},Martes:{Desayuno:{}, Almuerzo:{}, Cena:{}},Miercoles:{Desayuno:{}, Almuerzo:{}, Cena:{}},Jueves:{Desayuno:{}, Almuerzo:{}, Cena:{}},Viernes:{Desayuno:{}, Almuerzo:{}, Cena:{}},Sabado:{Desayuno:{}, Almuerzo:{}, Cena:{}},Domingo:{Desayuno:{}, Almuerzo:{}, Cena:{}}};
const dias=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
module.exports=(app) =>{
    app.post('/dietObject', async (req, res) => {
        const correo=req.body.correo;
        try{
            const diet = await queryAsync(select.dietaId, [correo]);
            const ids=diet.rows[0].id_dieta;
            for (i=0; i<dias.length; i++){
                const platos= await queryAsync(select.platosAgregados, [ids, dias[i]]);
                for (a=0; a<platos.rows.length; a++){
                    let plato=platos.rows[a];
                    switch(plato.tiempo){
                        case "Desayuno":
                            dietObject[dias[i]].Desayuno=plato;
                            break;
                        case "Almuerzo":
                            dietObject[dias[i]].Almuerzo=plato;
                            break;
                        case "Cena":
                            dietObject[dias[i]].Cena=plato;
                            break;
                    }
                }
            }
            res.json({ status: 1, mensaje: "Dieta obtenida", dieta:dietObject});
                  
        }catch(error){
            res.json({ status: 0, mensaje: "Error en el servidor" + error.message});
        }
    })
}