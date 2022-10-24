const express = require('express');
const bodyParser = require('body-parser');
const { readTalkersData } = require('./Utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online ');
});
