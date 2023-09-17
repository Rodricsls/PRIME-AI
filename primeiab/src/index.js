// import express
const app= require("./server");
require("./routes/signup")(app);
require("./routes/login")(app);


app.listen(app.get("port"), 
() => console.log(`Escuchando en servidor puerto : ${app.get("port")}`));