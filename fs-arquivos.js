const fs = require('fs').promises;

const getPalestrantes = async () => {
  const user = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(user);
};

const setPalestrantes = async (user) => {
  await fs.writeFile('./talker.json', JSON.stringify(user));
};

module.exports = {
  getPalestrantes,
  setPalestrantes,
};
