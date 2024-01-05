// Import all required modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Log = require('./models/log');
require('dotenv').config();

// Create instance of express app
const app = express();

// Define default port
const PORT = process.env.PORT || 3000;

// MongoDB connection - use the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// Event listeners for failed and successful MongoDB connection respectively
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Middleware to parse json objects
app.use(bodyParser.json());

// POST route to ingest logs into database
app.post('/logs', async (req, res) => {
    try {
        const logData = req.body;
        const log = new Log(logData);
        await log.save();
        res.status(201).json({ message: 'Log ingested successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server on default port
app.listen(PORT, () => {
    console.log(`Log Ingestor is running on port ${PORT}`);
});
