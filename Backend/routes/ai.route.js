const { summarize } = require('../controllers/ai.controller');

const router = require('express').Router();

router.post("/summarize", summarize);

module.exports = router;