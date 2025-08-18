import { autorModel, livroModel } from "../models/association.js"

export const cadastrarLivro = async (resquest, response) => {
    const {
        titulo,
        isbn,
        descricao,
        ano_publicacao,
        genero,
        quantidade_total,
        quantidade_disponivel,
        autores
    } = resquest.body;


    if (!titulo) {
        response.status(400).json({ message: "O campo titulo não pode ser nulo" })
        return;
    }
    if (!isbn) {
        response.status(400).json({ message: "O campo isbn não pode ser nulo" })
        return;
    }
    if (!descricao) {
        response.status(400).json({ message: "O campo descricao não pode ser nulo" })
        return;
    }
    if (!ano_publicacao) {
        response.status(400).json({ message: "O campo ano_publicacao não pode ser nulo" })
        return;
    }
    if (!genero) {
        response.status(400).json({ message: "O campo genero não pode ser nulo" })
        return;
    }
    if (!quantidade_total) {
        response.status(400).json({ message: "O campo quantidade_total não pode ser nulo" })
        return;
    }
    if (!quantidade_disponivel) {
        response.status(400).json({ message: "O campo quantidade_disponivel não pode ser nulo" })
        return;
    }

    if (!Array.isArray(autores) || autores.length === 0) {
        response.status(400).json({ message: "o campo autores deve ser array e possui pelo menos um autor" })
        return;
    }

    try {
        const autoresEncontrados = await autorModel.findAll({
            where: { id: autores }
        })

        if (autoresEncontrados.length !== autores.length) {
            response.status(404).json({
                message: "Um ou mais IDs de autores são inválidos ou não existe"
            })
            return;
        }

        const livro = await livroModel.create({
            titulo,
            isbn,
            descricao,
            ano_publicacao,
            genero,
            quantidade_total,
            quantidade_disponivel
        })

        await livro.addAutores(autores);

        const livroComAutor = await livroModel.findByPk(livro.id, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: {
                model: autorModel,
                attributes: { exclude: ["created_at", "updated_at"] },
                through: { attributes: [] }
            }
        });

        response.status(201).json({ message: "Livro cadastrado", livroComAutor })
    } catch (error) {
        response.status(500).json({ message: "Erro interno ao cadastrar Livro" })
        console.log(error)
    }
};