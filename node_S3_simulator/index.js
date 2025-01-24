const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
require('dotenv').config(); // Load default .env as a fallback

const app = express();
const PORT = 4000;
const URL = process.env.API_URL;
const URLDockerNetwork = process.env.API_URL_DOCKER_NETWORK;

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// Middleware to parse JSON and set request body size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(UPLOAD_DIR));

// POST /payload-upload
app.post('/payload-upload', (req, res) => {
  try {
    const payload = req.body;

    // Validate payload
    if (typeof payload !== 'object' || Array.isArray(payload) || payload === null) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    // Generate UUID
    const uuid = uuidv4();

    // Save payload to file
    const filePath = path.join(UPLOAD_DIR, `${uuid}.json`);
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));

    const fileUrl = `${URLDockerNetwork}/uploads/${uuid}.json`;

    // Respond with the link to the file
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error('Error processing payload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${URL}`);
});
