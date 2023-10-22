/*Consulta para insertar una nueva rutina*/
const Rutina=`INSERT INTO rutina (tipo) VALUES ($1)`;
/*COnsulta para asignar una nueva rutina*/
const rutina_asignar=`INSERT INTO asignar_rutinas (correo, id_rutina) VALUES ($1,$2)`;
/*Consulta para crear una nueva rutina personalizada*/
const rutina_personalizada=`INSERT INTO rutina_personalizada (id_rutina, id_ejercicio, repeticiones, tiempo_ejercicio, series, dia) VALUES ($1, $2, $3, $4, $5, $6)`;
/*Consulta para obtener id de la rutina, desde el signup*/
const rutinaIdS=`SELECT id_rutina FROM rutina WHERE tipo = $1`;
/*COnsulta para obtener el id de un ejercicio, desde el signup*/
const EjercicioidS=`SELECT id_ejercicio FROM ejercicios WHERE nombre_ejercicio=$1`;
/*COnsulta para verificar si un ejercicio ya existe*/
const ejercicio_exist=`SELECT COUNT(*) as count FROM ejercicios WHERE nombre_ejercicio = $1`;
/*Consulta para ingresar un nuevo ejercicio*/
const Ejercicios=`INSERT INTO ejercicios (nombre_ejercicio, musculo, imagen_ejercicio) VALUES ($1, $2, '#')`;
/*COnsulta para ingresar un nuevo usuario*/
const User = `INSERT INTO usuario (correo, contraseña, nombre, apellido, peso, estatura, imagen_usuario, edad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
/*COnsulta para verificar la existencia de un usuario*/
const check_usuario = `SELECT COUNT(*) as count FROM usuario WHERE correo = $1`;

module.exports={
    Rutina,
    rutina_asignar,
    rutina_personalizada,
    EjercicioidS,
    ejercicio_exist,
    Ejercicios,
    User,
    rutinaIdS,
    check_usuario
}