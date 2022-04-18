const express = require('express');
const ApiHandler = require('../api/ApiHandler.js')

const router = express.Router();

router.get('/items',
    function(req, res, next) {
        (new ApiHandler).handleListRequest(req, res , next);
    });

router.post('/item',
    function(req, res, next) {
        (new ApiHandler).handleUpdateRequest(req, res , next);
    });

module.exports = router;