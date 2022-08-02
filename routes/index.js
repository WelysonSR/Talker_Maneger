const { Router } = require('express');
const { getPalestrantes } = require('../fs-arquivos');

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

module.exports = router;