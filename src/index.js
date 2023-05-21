const express = require('express');
const talkers = require('./utils/getTalker');
const generatorToken = require('./utils/tokenGenerate');
const emailValidator = require('./middlewares/auth/emailValidator');
const passwordValidator = require('./middlewares/auth/passwordValidator');
const tokenValidator = require('./middlewares/auth/tokenValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_request, response) => {
  try {
    const getTalkers = await talkers();

    if (!getTalkers) {
      return response.status(HTTP_OK_STATUS).json([]);
    }
    return response.status(HTTP_OK_STATUS).json(getTalkers);
  } catch (error) {
    return response.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
});

app.get('/talker/:id', async (request, response) => {
  try {
    const getTalkers = await talkers();
    const talkerById = getTalkers.find(
      (talker) => talker.id === Number(request.params.id),
    );
    if (!talkerById) {
      return response.status(NOT_FOUND).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return response.status(HTTP_OK_STATUS).json(talkerById);
  } catch (error) {
    return response.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
});

app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const { body } = req;
  const token = generatorToken();

  if (body) return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', tokenValidator, async (request, response) => {
  try {
    // const { body, headers } = request;
    return response.status(HTTP_OK_STATUS).json([]);
  } catch (error) {
    return response.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
});
