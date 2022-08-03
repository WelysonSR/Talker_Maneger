const { Router } = require('express');
const { getPalestrantes, setPalestrantes } = require('../fs-arquivos');
const {
  speakerName,
  speakerAge,
  speakerTalk,
  speakerTalkRate,
} = require('../middlewares/speakerValidator');

const routerAlt = Router();

routerAlt.post('/talker',
speakerName,
speakerAge,
speakerTalk,
speakerTalkRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const palestrante = await getPalestrantes();
  try {
    const user = {
      id: palestrante.length + 1,
      name,
      age,
      talk,
    };
    palestrante.push(user);
    await setPalestrantes(palestrante);
    res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = routerAlt;