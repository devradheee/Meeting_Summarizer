const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const summaryRoutes = require('./routes/summaryRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/summary', summaryRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('AI Meeting Notes Summarizer Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
