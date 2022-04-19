const express = require('express');
const {
    list,
    addOrUpdate,
    remove,
    update
} = require('../api/ApiHandler.js')

const router = express.Router();

router.get('/items', list);
router.post('/item', addOrUpdate);
router.delete('/items/:_id', remove);
router.put('/item/:_id', update);

module.exports = router;