import autorModel from "./autorModel.js";
import livroModel from "./livroModel.js";

autorModel.belongsToMany(livroModel, {
    through: "autores_livros",
    foreignKey: "autor_id",
    otherKey: "livros_id"
})
livroModel.belongsToMany(autorModel, {
    through: "autores_livros",
    foreignKey: "livros_id,",
    otherKey: "autor_id"
})

export {autorModel, livroModel};