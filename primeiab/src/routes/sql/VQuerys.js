/*COnsulta para verificar la existencia de un usuario*/
const check_usuario = `SELECT COUNT(*) as count FROM usuario WHERE correo = $1`;
/*COnsulta para verificar si un ejercicio ya existe*/
const ejercicio_exist=`SELECT COUNT(*) as count FROM ejercicios WHERE nombre_ejercicio = $1`;