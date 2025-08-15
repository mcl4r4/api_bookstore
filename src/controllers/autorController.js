import { request, response } from "express";
import autorModel from "../models/autorModel.js";
import { DataTypes } from "sequelize";


export const cadastrarAutor = async (request, response) => {
    const { nome, biografia, data_nascimento, nacionalidade } = request.body;

    if (!nome) {
        response.status(400).json({
            erro: "Campo nome inválido",
            messagem: "O campo nome não pode ser nulo"
        })
        return;
    }
    if (!biografia) {
        response.status(400).json({
            erro: "Campo biografia inválido",
            messagem: "O campo biografia não pode ser nulo"
        })
        return;
    }
    if (!data_nascimento) {
        response.status(400).json({
            erro: "Campo data_nascimento inválido",
            messagem: "O campo data_nascimento não pode ser nulo"
        })
        return;
    }
    if (!nacionalidade) {
        response.status(400).json({
            erro: "Campo nacionalidade inválido",
            messagem: "O campo nacionalidade não pode ser nulo"
        })
        return;
    }

    const validaData = new Date(data_nascimento)
    if (validaData == "Invalid Date") {
        response.status(400).json({
            erro: "Data Inválida",
            messagem: "Formato inválido"
        })
        return;
    }

    const autor = {
        nome,
        biografia,
        data_nascimento,
        nacionalidade
    }
    try {

        const novoAutor = await autorModel.create(autor);
        console.log(novoAutor)
        response.status(201).json({ messagem: "Autor criado com sucesso", novoAutor });

    } catch (error) {
        console.error(error)
        response.status(500).json({ messagem: "Erro interno ao cadastrar autor" })
    }
}

export const listarTodosAutores = async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const autores = await autorModel.findAndCountAll({
            offset,
            limit
        })
        const totalPaginas = Math.ceil(autores.count / limit)
        response.status(200).json({
            totalAutores: autores.count,
            totalPaginas,
            paginaAtual: page,
            autoresPorPagina: limit,
            autores: autores.rows
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({ messagem: "Erro interno ao listar autores" })
    }
}

export const buscarAutorPorId = async (request, response) => {
    const {id} = request.params;

    if(!id){
        response.status(400).json({messagem: "ID inválido"})
        return;
    }
    try {
        const autorSelecionado = await autorModel.findByPk(id)

        if(!autorSelecionado){
            response.status(404).json({messagem: "Autor não encontrado"})
            return;
        }

        response.status(200).json({
            messagem: "Autor encontrado",
            autorSelecionado
        })
    } catch (error) {
        response.status(500).json({messagem: "Erro interno ao encontrar autor"})
        console.log(error)
    }
}

export const atualizarAutor = async (request, response) => {
    const {id} = request.params;
    const {nome, biografia, data_nascimento, nacionalidade} = request.body;

    if(!id){
        response.status(400).json({messagem: "ID inválido"})
        return;
    }

    if(!nome){
        response.status(400).json({messagem: "Campo nome obrigátorio"})
        return;
    }
    if(!biografia){
        response.status(400).json({messagem: "Campo biografia obrigátorio"})
        return;
    }
    if(!data_nascimento){
        response.status(400).json({messagem: "Campo data_nascimento obrigátorio"})
        return;
    }
    if(!nacionalidade){
        response.status(400).json({messagem: "Campo nacionalidade obrigátorio"})
        return;
    }

    try {
         const autorSelecionado = await autorModel.findByPk(id)

        if(!autorSelecionado){
            response.status(404).json({messagem: "Autor não encontrado"})
            return;
        }

        if(!nome !== undefined){
            autorSelecionado.nome = nome
        }
        if(!biografia !== undefined){
            autorSelecionado.biografia = biografia
        }
        if(!data_nascimento !== undefined){
            autorSelecionado.data_nascimento = data_nascimento
        }
        if(!nacionalidade !== undefined){
            autorSelecionado.nacionalidade = nacionalidade
        }

        await autorSelecionado.save()

        response.status(200).json({
            messagem: "Autor atualizado",
            autor: autorSelecionado
        })
    } catch (error) {
        response.status(500).json({messagem: "Erro interno ao atualizar autor"})
    }
}

export const deletarAutor = async (request, response) => {
const {id} = request.params;

if(!id){
    response.status(400).json({messagem:"ID inválido"})
}

try {

    const autorSelecionado = await autorModel.findByPk(id)

        if(!autorSelecionado){
            response.status(404).json({messagem: "Autor não encontrado"})
            return;
        }

       await autorModel.destroy({where:{id}})
       response.status(204).send()
} catch (error) {
    response.status(500).json({messagem: "Erro interno ao deletar autor"})

}
}