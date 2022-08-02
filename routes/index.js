const { Router } = require('express');
const { getPalestrantes } = require('../fs-arquivos');

const router = Router();

router.get('/talker', async (_req, res) => {
  const palestrantes = await getPalestrantes();
  if (palestrantes.length > 0) {
    return res.status(200).json(palestrantes);
  }
  return res.status(200).json([]);
});

module.exports = router;