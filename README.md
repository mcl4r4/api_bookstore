## Visão Geral do Projeto

API RESTful para sistema de biblioteca com funcionalidades
de gerenciamento de livros, autores, usuários, empréstimos 
e interações sociais.

## Sprint 1 - Módulo Autor

### Funcionalidades

[ ] Cadastro de autores
[ ] Listagem de autores (com paginação)
[ ] Busca por autor específico
[ ] Atualização de dados do autor
[ ] Remoção de autor

{
  "id": "string/number",
  "nome": "string",
  "biografia": "string",
  "dataNascimento": "date",
  "nacionalidade": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}

## Sprint 2 - Módulo Livros

### Funcionalidades

- Cadastro de livros vinculados a autores
- Listagem de livros (com filtros e paginação)
- Busca por livro específico
- Atualização de dados do livro
- Remoção de livro
- Relacionamento Many-to-Many com autores

### Estrutura do Modelo Livro
{
  "id": "string/number",
  "titulo": "string",
  "isbn": "string",
  "descricao": "string",
  "anoPublicacao": "number",
  "genero": "string",
  "quantidadeTotal": "number",
  "quantidadeDisponivel": "number",
  "autores": ["array of author ids"],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}