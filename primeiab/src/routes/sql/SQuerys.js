/*Consulta para obtener id de la rutina, desde el signup*/
const rutinaIdS=`SELECT id_rutina FROM rutina WHERE tipo = $1 ORDER BY id_rutina DESC LIMIT 1`;
/*COnsulta para obtener el id de un ejercicio, desde el signup*/
const EjercicioidS=`SELECT id_ejercicio FROM ejercicios WHERE nombre_ejercicio=$1`;
/*COnsulta para verificar si un ejercicio ya existe*/
const ejercicio_exist=`SELECT COUNT(*) as count FROM ejercicios WHERE nombre_ejercicio = $1`;
/* Obtain password from the users table */  
const password = `SELECT contraseña FROM usuario WHERE correo = $1`;
/* Select diet id associated with the description */    
const dietId = `SELECT id_dieta FROM dieta WHERE objetivo = $1`;
/* Select dish id associated with a time, description and day */    
const dishId = `SELECT id_plato FROM platos WHERE dia = $1 AND descripcion = $2 AND tiempo = $3`; 

module.exports={    
    rutinaIdS,
    EjercicioidS,
    ejercicio_exist,
    password,
    dietId,
    dishId
}