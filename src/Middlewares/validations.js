const emailValidation = (request, response, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
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

module.exports = {
  passwordValidation,
  emailValidation,
};
