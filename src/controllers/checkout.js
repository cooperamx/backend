const express = require('express');

module.exports = (checkoutRepository) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    console.info(req.body);
    const commerceId = await checkoutRepository.create(req.body);
    return res.json({ id: commerceId });
  });

  return router;
};
