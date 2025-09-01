import { Router } from "express";
import { atualizarLivro, BuscarLivros, buscarLivrosPorAutor, cadastrarLivro, deletarLivro, listarTodosLivros} from "../controllers/livroController.js";


const router = Router()

router.post("/", cadastrarLivro)
router.get("/", listarTodosLivros)
router.get("/:id", BuscarLivros)
router.get("/", buscarLivrosPorAutor)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)

export default router;
