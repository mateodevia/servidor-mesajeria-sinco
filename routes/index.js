const express = require('express');
const router = express.Router();
const processController = require('../controllers/process');

/* GET home page. */
router.post('/client/:clientId/process', (req, res) => {
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

//This is a webhook
router.post('/client/:clientId/notification', (req, res) => {
    console.log(req.body);

    if (!req.body.type) {
        console.log('F');
        res.status(400).json({ error: 'EL parametro type hace falta' });
    } else if (!req.body.result) {
        console.log('FF');
        res.status(400).json({ error: 'EL parametro result hace falta' });
    } else {
        processController.handleSubProcessCompletion(
            req.params.clientId,
            req.body.type,
            req.body.result,
            (response) => res.send({ msg: response }),
            (err) => {
                console.log(err);
                res.status(err.type).json({ error: err.msg });
            }
        );
    }
});

module.exports = router;
