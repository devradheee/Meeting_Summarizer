<<<<<<< HEAD
const express = require("express");
const { generateSummary } = require("../controllers/summaryController");

const router = express.Router();

router.post("/", generateSummary);
=======
const express = require('express');
const router = express.Router();
const { generateSummary, shareSummary } = require('../controllers/summaryController');

// Route to generate a summary
router.post('/generate', generateSummary);

// Route to share a summary
router.post('/share', shareSummary);
>>>>>>> 6e2e440e4f0b97275586e4c73e5766928171e79a

module.exports = router;
