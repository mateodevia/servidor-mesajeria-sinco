const express = require('express');
const router = express.Router();
const processController = require('../controllers/process');

/* GET home page. */
router.post('/process/:clientId', function (req, res, next) {
    if (!req.body.type) {
        res.status(400).json({ error: 'EL parametro type hace falta' });
    } else if (!req.body.quantity) {
        res.status(400).json({ error: 'EL parametro quantity hace falta' });
    } else {
        processController.createProcess(
            req.params.clientId,
            req.body.type,
            req.body.quantity,
            (response) => res.send({ msg: response }),
            (err) => {
                res.status(err.type).json({ error: err.msg });
            }
        );
    }
});

module.exports = router;
