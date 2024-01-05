// Import all required modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Log = require('./models/log');
require('dotenv').config();

// Create instance of express app
const app = express();

// Define default port
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

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

// POST route to search for logs with required keywords
app.post('/search-logs', async (req, res) => {
    try {
        const filters = req.body;
        const query = buildQuery(filters);
        const results = await Log.find(query);

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to build the MongoDB query based on provided filters
function buildQuery(filters) {
    const query = {};
    if (filters.level) {
        query.level = filters.level;
    }
    if (filters.message) {
        query.message = { $regex: new RegExp(filters.message, 'i') };
    }
    if (filters.resourceId) {
        query.resourceId = filters.resourceId;
    }
    if (filters.timestamp) {
        query.timestamp = new Date(filters.timestamp);
    }
    if (filters.traceId) {
        query.traceId = filters.traceId;
    }
    if (filters.spanId) {
        query.spanId = filters.spanId;
    }
    if (filters.commit) {
        query.commit = filters.commit;
    }
    if (filters.parentResourceId) {
        query['metadata.parentResourceId'] = filters.parentResourceId;
    }

    // Advanced filters
    if (filters.startDate && filters.endDate) {
        query.timestamp = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate),
        };
    }

    return query;
}

// Start server on default port
app.listen(PORT, () => {
    console.log(`Query Interface Server is running on port ${PORT}`);
});
