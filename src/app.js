import express from "express";
import cors from "cors";
import {conn} from "./config/sequelize.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json())

conn.sync()

app.get("/", (request, response) => {
    response.status(200).json({messagem: "Olá, Mundo!"})
})

export default app;