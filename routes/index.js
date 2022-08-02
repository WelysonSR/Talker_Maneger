const { Router } = require('express');
const { getPalestrantes } = require('../fs-arquivos');
const generateToken = require('../generateToken');
const {
  validateEmail,
  validatePassword,
} = require('../middlewares/userValidation');

const router = Router();

router.get('/talker', async (_req, res) => {
  const palestrantes = await getPalestrantes();
  try {
    if (palestrantes.length > 0) {
      return res.status(200).json(palestrantes);
    }
    return res.status(200).json([]);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const palestrantes = await getPalestrantes();
  try {
    const palestrante = palestrantes.find((p) => p.id === Number(id));
    if (palestrante) {
      return res.status(200).json(palestrante);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/login', validateEmail, validatePassword, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;