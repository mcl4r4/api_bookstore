import { Router } from "express";
import { BuscarLivros, buscarLivrosPorAutor, cadastrarLivro, listarTodosLivros } from "../controllers/livroController.js";

const router = Router()

router.post("/", cadastrarLivro)
router.get("/", listarTodosLivros)
router.get("/:id", BuscarLivros)
router.get("/", buscarLivrosPorAutor)

export default router;
