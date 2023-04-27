# Projeto TalkerManagerAPI

Este projeto é uma aplicação de cadastro de palestrantes, em que é possível realizar operações básicas de CRUD (Create, Read, Update e Delete). A aplicação foi desenvolvida em Node.js, utilizando o framework Express para criação da API.

## Como utilizar

Para utilizar a aplicação, é necessário ter o Node.js instalado em sua máquina. Depois de clonar o repositório, navegue até a pasta raiz do projeto e execute o comando `npm install` para instalar as dependências.

Em seguida, basta executar o comando `npm start` para iniciar a aplicação, que ficará disponível no endereço `http://localhost:3000`.

## Endpoints

Abaixo estão listados os endpoints disponíveis na aplicação:

### GET `/talker`

Retorna a lista completa de palestrantes cadastrados.

### GET `/talker/search?q=`

Retorna a lista de palestrantes que possuem o nome informado no parâmetro `q`.

### GET `/talker/:id`

Retorna as informações do palestrante com o id informado.

### POST `/login`

Realiza a autenticação do usuário, utilizando as credenciais informadas no corpo da requisição (email e senha). Caso as credenciais sejam válidas, um token é gerado e retornado na resposta.

### POST `/talker`

Cadastra um novo palestrante, utilizando as informações informadas no corpo da requisição.

### PUT `/talker/:id`

Atualiza as informações do palestrante com o id informado, utilizando as informações informadas no corpo da requisição.

### DELETE `/talker/:id`

Remove o palestrante com o id informado. É necessário estar autenticado para realizar esta operação.

## Validações

Para garantir a integridade dos dados cadastrados, algumas validações são realizadas antes de cadastrar ou atualizar um palestrante. São elas:

- `nameValidation`: Verifica se o nome do palestrante foi informado e possui pelo menos 3 caracteres.
- `ageValidation`: Verifica se a idade do palestrante foi informada e é um número inteiro maior que 18.
- `talkValidation`: Verifica se o título da palestra foi informado e possui pelo menos 3 caracteres.
- `watchedAtValidation`: Verifica se a data em que a palestra foi assistida foi informada e possui o formato `dd/mm/aaaa`.
- `rateValidation`: Verifica se a nota atribuída à palestra foi informada e é um número inteiro entre 1 e 5.

## Persistência dos dados

As informações dos palestrantes são armazenadas em um arquivo `.json`, utilizando o módulo `fs` do Node.js. As operações de leitura, escrita, atualização e remoção dos dados são realizadas utilizando funções definidas no módulo `fsUtils`.

## Autores

- [@gustavoabreu02](https://www.github.com/gustavoabreu02)
