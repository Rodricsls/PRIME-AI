/*Consulta para obtener id de la rutina, desde el signup*/
const rutinaIdS=`SELECT id_rutina FROM rutina WHERE tipo = $1`;
/*COnsulta para obtener el id de un ejercicio, desde el signup*/
const EjercicioidS=`SELECT id_ejercicio FROM ejercicios WHERE nombre_ejercicio=$1`;
/*COnsulta para verificar si un ejercicio ya existe*/
const ejercicio_exist=`SELECT COUNT(*) as count FROM ejercicios WHERE nombre_ejercicio = $1`;