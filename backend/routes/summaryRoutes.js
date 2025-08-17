const express = require('express');
const router = express.Router();
const { generateSummary, shareSummary } = require('../controllers/summaryController');

// Route to generate a summary
router.post('/generate', generateSummary);

// Route to share a summary
router.post('/share', shareSummary);

module.exports = router;
