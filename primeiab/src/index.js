// import express
const { updateWeek, updateStreak, updateToday, updateNo } = require("./jobs/TaskFunctions");
const app= require("./server");
const cron = require('node-cron');
require("./routes/signup")(app);
require("./routes/login")(app);
require("./routes/user")(app);
require("./routes/routines")(app);
require("./routes/diets")(app);
require("./routes/stadistics")(app);
require("./jobs/TaskFunctions");


/* Un cron job que se ejecute todos los dias a las 11:58 */ 
cron.schedule('55 11 * * *', () =>{
    const date = new Date().getDate();
    let day;
    switch(date){
        case 0:{day="Domingo";break;}
        case 1:{day="Lunes";break;}
        case 2:{day="Martes";break;}
        case 3:{day="Miércoles";break;}
        case 4:{day="Jueves";break;}
        case 5:{day="Viernes";break;}
        case 6:{day="Sábado";break;}
    }
    updateToday(day);
    updateNo(day);
})

/*Una cron job que se ejecute todos los domingos a las 11:58*/
cron.schedule('58 11 * * 0', () =>{
    updateWeek();
    updateStreak();
})


app.listen(app.get("port"), 
() => console.log(`Escuchando en servidor puerto : ${app.get("port")}`));