import { Router } from "express";
import { BuscarLivros, cadastrarLivro, listarTodosLivros } from "../controllers/livroController.js";

const router = Router()

router.post("/", cadastrarLivro )
router.get("/", listarTodosLivros )
router.get("/", BuscarLivros )

export default router;
