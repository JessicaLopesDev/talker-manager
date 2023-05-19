const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  const minPasswordLength = 6;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < minPasswordLength) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = passwordValidator;
