const express = require('express');

module.exports = (commerceRepository) => {
  const router = express.Router();

  router.get('/:id', async (req, res) => {
    const commerce = await commerceRepository.get(req.params.id);
    return res.json(commerce);
  });

  router.post('/', async (req, res) => {
    const commerceId = await commerceRepository.create(req.body);
    return res.json({ id: commerceId });
  });

  return router;
};
