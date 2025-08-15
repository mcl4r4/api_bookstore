import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const livroModel = conn.define(
    "livro",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ano_publicacao: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false

        },
        quantidade_total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade_disponivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        autores:{
            type:DataTypes.UUID
            defaultValue: DataTypes.UUIDV4,
            
        },
    },
    {}
)

export default livroModel