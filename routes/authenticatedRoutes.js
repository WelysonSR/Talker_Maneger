const { Router } = require('express');
const { getPalestrantes, setPalestrantes } = require('../fs-arquivos');
// const {} = require('../middlewares/speakerValidator');

const routerAlt = Router();

routerAlt.post('/talker', async (req, res) => {
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

routerAlt.put('/talker/:id', async (req, res) => { 
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const palestrantes = await getPalestrantes(); 
    const palestrante = palestrantes.find((pales) => pales.id === Number(id));
    const newPalestrante = { name, age, id: Number(id), talk };
    palestrantes[palestrantes.indexOf(palestrante)] = newPalestrante;
    await setPalestrantes(palestrantes);
    res.status(200).json(newPalestrante);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

routerAlt.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const palestrantes = await getPalestrantes();
    const delite = palestrantes.some((pales) => Number(pales.id) === Number(id));

    if (!delite) {
      throw new Error('Pessoa palestrante não encontrada');
    }

    const newPalestrantes = palestrantes.filter((pales) => Number(pales.id) !== Number(id));
    await setPalestrantes(newPalestrantes);
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = routerAlt;
