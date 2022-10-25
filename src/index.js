const express = require('express');
const bodyParser = require('body-parser');
const { readTalkersData, writheNewTalkerData, updateTalkerData } = require('./Utils/fsUtils');
const {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./Middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const generateToken = () => {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  // link de onde aprendi para gerar o token https://attacomsian.com/blog/javascript-generate-random-string
  for (let i = 0; i < 16; i += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker', async (_request, response) => {
  const talkers = await readTalkersData();
  if (talkers === []) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  return response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await readTalkersData();
  const talker = talkers.find((value) => value.id === Number(id));
  if (talker) {
    return response.status(HTTP_OK_STATUS).json(talker);
  }
  return response.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', emailValidation, passwordValidation, (_request, response) => 
  response.status(200).json({ token: generateToken() }));

  app.post('/talker', 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation, 
  async (request, response) => {
  const talkersData = await readTalkersData();
  const talkers = { ...request.body };

  const newTalker = { ...talkers, id: talkersData.length + 1 };
  writheNewTalkerData(newTalker);

  response.status(201).json(newTalker);
});

app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation, 
  async (request, response) => {
  const { id } = request.params;
  const updatedTalker = { id: +id, ...request.body };

  updateTalkerData(+id, request.body);
  response.status(200).json(updatedTalker);
});

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online ');
});
