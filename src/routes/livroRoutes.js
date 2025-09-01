import { Router } from "express";
import { cadastrarLivro, listarTodosLivros } from "../controllers/livroController.js";

const router = Router()

router.post("/", cadastrarLivro )
router.get("/", listarTodosLivros )

export default router;
