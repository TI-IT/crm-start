const express = require('express');

const { saveCity, getAllCity } = require('../../services/crm/directory/directory.service');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Products');
});

router.post('/city/add', async (req, res) => {
  const city = req.body;
  try {
    await saveCity(city);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.json({ ok: false });
  }
});

router.get('/citys/get/all', async (req, res) => {
  const citys = await getAllCity();
  res.json({ ok: true, citys: citys });
});

module.exports = router;
