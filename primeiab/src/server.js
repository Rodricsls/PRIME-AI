const express = require("express");
const cors = require("cors");
const app= express();


app.use(express.json());

app.use(cors());

app.set("port", 8888);

module.exports=app;