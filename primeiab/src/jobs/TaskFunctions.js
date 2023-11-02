const pool = require("../db");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);
const update=require("../routes/sql/UQUerys");

async function updateWeek(){
    console.log(update.ExercisesWeek);
    await queryAsync(update.ExercisesWeek);
    console.log("Semana actualizada");
}

async function updateStreak(){
    console.log(update.StreakWeek);
    await queryAsync(update.StreakWeek);
    console.log("Racha actualizada");
}

async function updateToday(dia){
    console.log(update.TodayExercises);
    await queryAsync(update.TodayExercises, [dia]);
    console.log("Hoy actualizado");
}
async function updateNo(dia){
    console.log(update.noExercises);
    await queryAsync(update.noExercises, [dia]);
    console.log("No actualizado");
}
module.exports = {
    updateWeek,
    updateStreak,
    updateToday,
    updateNo
}   