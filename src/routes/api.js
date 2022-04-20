const { list, addOrUpdate, remove, update } = require('../controllers/apiHandler');
const express = require('express');

const router = express.Router();

router.get('/items', list);
router.post('/item', addOrUpdate);
router.delete('/items/:_id', remove);
router.put('/item/:_id', update);

module.exports = router;