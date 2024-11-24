const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000; // Use a different port for the backend

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path to JSON file
const jsonFilePath = path.join(__dirname, 'data.json');

// Route to get all entries
app.get('/api/data', (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read file' });
        }
        res.json(JSON.parse(data));
    });
});

// Route to add a new entry
app.post('/api/data', (req, res) => {
    const newData = req.body;

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read file' });
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (err) {
            // If file is empty or invalid, we start with an empty array
        }

        jsonData.push(newData);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not write to file' });
            }
            res.status(201).json(newData);
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
