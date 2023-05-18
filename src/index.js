const express = require("express");
const talkers = require("./getTalker");

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || "3001";

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log("Online");
});

app.get("/talker", async (_request, response) => {
  const getTalkers = await talkers();
  if (!getTalkers) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json(getTalkers);
});
