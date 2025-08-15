import { Router} from "express"
import {buscarAutorPorId, cadastrarAutor, listarTodosAutores} from "../controllers/autorController.js"


const router = Router()

router.post("/", cadastrarAutor)

router.get("/", listarTodosAutores)

router.get("/:id", buscarAutorPorId)


export default router;