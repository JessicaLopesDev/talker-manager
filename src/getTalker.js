const fs = require("fs").promises;
const path = require("path");

const talkerPath = path.resolve(__dirname, "./talker.json");

const getAllTalkers = async () => {
  const talkersFile = await fs.readFile(talkerPath);
  return JSON.parse(talkersFile);
};

module.exports = getAllTalkers;
