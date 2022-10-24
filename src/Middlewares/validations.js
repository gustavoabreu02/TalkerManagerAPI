const emailValidation = (request, response, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email } = request.body;
  if (!email) {
    return response
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regex.test(email)) {
    return response
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (request, response, next) => {
  const { password } = request.body;
  const tamanho = 6;

  if (!password) {
    return response
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < tamanho) {
    return response
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;
  const tamanho = 16;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < tamanho) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (request, response, next) => {
  const { name } = request.body;
  const tamanho = 3;

  if (!name) {
    return response
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < tamanho) {
    return response
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (request, response, next) => {
  const { age } = request.body;
  const tamanho = 18;

  if (!Number(age)) {
    return response
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (tamanho > Number(age)) {
    return response
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (request, response, next) => {
  const { talk } = request.body;

  if (!talk) {
    return response
      .status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const watchedAtValidation = (request, response, next) => {
  const { watchedAt } = request.body.talk;

  const dataRegex = /\d{2}\/\d{2}\/\d{4}/;

  if (!watchedAt) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!watchedAt.match(dataRegex)) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (request, response, next) => {
  const { rate } = request.body.talk;

  if (rate === undefined) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }

  if (Number(rate) < 1 || Number(rate) > 5) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  passwordValidation,
  emailValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
