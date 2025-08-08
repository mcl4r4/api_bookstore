import { Router} from "express"
import {cadastrarAutor, listarTodosAutores} from "../controllers/autorController.js"


const router = Router()

router.post("/", cadastrarAutor)

router.get("/", listarTodosAutores)


export default router;