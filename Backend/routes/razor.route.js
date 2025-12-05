const { createOrder, verifyOrder } = require('../controllers/razor.controller');

const router = require('express').Router();

router.post("/create", createOrder);
router.post("/verify", verifyOrder);

module.exports = router;