import express from "express";
import { dividir, multiplicar, restar, sumar } from "./calcular.js";

let fs = require('fs');

const app = express();
app.use(express.json());



const ambiente = process.env.NODE_ENV || "Ambiente_desconocido"
const api = fs.readFileSync('/run/secrets/my_secret.txt', 'utf8');




app.get("/", (req, res) => {
  res.send("Tarea docker-compose Hola Mundo");
});

app.post("/calcular", (req, res) => {
  const operacion = req.body;
  if (operacion.operacion === "add") {
    return res.send({ resultado: sumar(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "min") {
    return res.send({ resultado: restar(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "div") {
    return res.send({ resultado: dividir(operacion.num1, operacion.num2) });
  } else if (operacion.operacion === "mul") {
    return res.send({ resultado: multiplicar(operacion.num1, operacion.num2) });
  }
  return res.send({ resultado: "hola mundo" });
});

app.get("/info", (req, res) => {
  res.send(`Prueba de variable entorno ambiente con docker-compose: ${ambiente}`);
});

app.get("/api", (req, res) => {
  res.send(`Prueba de variable entorno api-key con docker-compose: ${api}`);
  console.log(api);
});



export default app;