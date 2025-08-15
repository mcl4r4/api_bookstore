import express from "express";
import cors from "cors";
import {conn} from "./config/sequelize.js";

// TABELAS

import autorModel from "./models/autorModel.js";

// ROTAS

import autorRoutes from "./routes/autorRoutes.js";

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json())

conn.sync().then(() => {
    console.log("Banco de dados conectado 😎")
}).catch((error) => console.log(error))

app.use("/api/autores", autorRoutes)

app.get("/", (request, response) => {
    response.status(200).json({messagem: "Olá, Mundo!"})
})

export default app;