const express = require('express');
const router = express.Router();
const processController = require('../controllers/process');

/* GET home page. */
router.post('/process/:clientId', function (req, res, next) {
    //falta logica de negocio
    processController.createProcess(
        req.params.clientId,
        req.body.type,
        req.body.quantity,
        (response) => res.send({ msg: response }),
        (err) => res.status(500).json({ error: err })
    );
});

module.exports = router;
