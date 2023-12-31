const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const talkers = require('./utils/getTalker');
const generatorToken = require('./utils/tokenGenerate');
const emailValidator = require('./middlewares/auth/emailValidator');
const passwordValidator = require('./middlewares/auth/passwordValidator');
const tokenValidator = require('./middlewares/auth/tokenValidator');
const nameValidator = require('./middlewares/talker/nameValidator');
const ageValidator = require('./middlewares/talker/ageValidator');
const talkValidator = require('./middlewares/talker/talkValidator');
const watchedAtValidator = require('./middlewares/talker/watchedAtValidator');
const rateValidator = require('./middlewares/talker/rateValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
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
    return response.status(INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
});

app.get('/talker/search', tokenValidator, async (req, res) => {
  const allTalkers = await talkers();
  const filtered = allTalkers.filter((t) => t.name.includes(req.query.q));

  return res.status(HTTP_OK_STATUS).json(filtered);
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
    return response.status(INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
});

app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const { body } = req;
  const token = generatorToken();

  if (body) return res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const allTalkers = await talkers();
      const newTalker = {
        name,
        age,
        id: allTalkers.length + 1,
        talk,
      };
      await fs.writeFile(
        path.resolve(__dirname, './talker.json'),
        JSON.stringify([...allTalkers, newTalker]),
      );
      return res.status(201).json(newTalker);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
);

const talkerIndex = (allTalkers, id) =>
  allTalkers.findIndex((talker) => talker.id === Number(id));

const talkerById = (allTalkers, id) =>
  allTalkers.find((talker) => talker.id === Number(id));

const talkerNotFoundMessage = 'Pessoa palestrante não encontrada';

app.put(
  '/talker/:id',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const allTalkers = await talkers();
      const index = talkerIndex(allTalkers, req.params.id);
      const currentTalker = talkerById(allTalkers, req.params.id);
      if (!currentTalker) {
        return res.status(NOT_FOUND).json({ message: talkerNotFoundMessage });
      }
      const newTalker = { name, age, talk, id: Number(req.params.id) };
      allTalkers[index] = newTalker;
      await fs.writeFile(
        path.resolve(__dirname, './talker.json'),
        JSON.stringify(allTalkers),
      );
      return res.status(HTTP_OK_STATUS).json(newTalker);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
);

app.delete('/talker/:id', tokenValidator, async (req, res) => {
  try {
    const allTalkers = await talkers();

    const filteredTalkers = allTalkers.filter(
      (talker) => talker.id !== Number(req.params.id),
    );
    await fs.writeFile(
      path.resolve(__dirname, './talker.json'),
      JSON.stringify(filteredTalkers),
    );
    return res.status(204).json({});
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});
