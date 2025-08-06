import autorModel from "../models/autorModel.js";


export const cadastrarAutor = async (request, response) => {
    const {nome, biografia, data_nascimento, nacionalidade} = request.body;

    if(!nome){
        response.status(400).json({
            erro: "Campo nome inválido",
            messagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!biografia){
        response.status(400).json({
            erro: "Campo biografia inválido",
            messagem: "O campo biografia não pode ser nulo"
        })
        return
    }
    if(!data_nascimento){
        response.status(400).json({
            erro: "Campo data_nascimento inválido",
            messagem: "O campo data_nascimento não pode ser nulo"
        })
        return
    }
    if(!nacionalidade){
        response.status(400).json({
            erro: "Campo nacionalidade inválido",
            messagem: "O campo nacionalidade não pode ser nulo"
        })
        return
    }

    const validaData = new Date(data_nascimento)
    if(validaData == "Invalid Date"){
        response.status(400).json({
            erro:"Data Inválida",
            messagem: "Formato inválido"
        })
        return
    }

    const autor = {
        nome, 
        biografia,
        data_nascimento,
        nacionalidade
    }
    try {

        const novoAutor = await autorModel.create(autor);
        response.status(201).json({messagem: "Autor criado com sucesso", novoAutor});
        
    } catch (error) {
        console.error(error)
        response.status(500).josn({messagem: "Erro interno ao cadastrar autor"})
    }
}