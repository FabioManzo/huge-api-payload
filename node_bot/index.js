const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { generatePayload } = require('./modules/dynamic-payload/index.js');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
require('dotenv').config(); // Load default .env as a fallback


// API endpoint to send the data
const nodeS3Simulator = process.env.NODE_S3_SIMULATOR;
const symfonyBackend = process.env.SYMFONY_BACKEND;
const s3SimulatorApiEndpoint = `${nodeS3Simulator}/payload-upload`;
const symfonyBackendApiEndpoint = `${symfonyBackend}/api/crawler-request`;

// Function to read the payload from a file
function readPayload(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading payload file:', err.message);
    process.exit(1);
  }
}

// Function to send the payload to the API
async function sendPayload(payload, apiEndpoint) {
  try {
    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Payload successfully sent! Response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error sending payload:', err.message);
  }
}

// Main function
async function main() {
  console.log('Starting the bot...');
  const payload = generatePayload();
  console.log('Payload loaded successfully. Sending to node_S3_simulator API...');
  const s3response = await sendPayload(payload, s3SimulatorApiEndpoint);

  if (typeof s3response === 'undefined') {
    return;
  }

  console.log('Sending the fileUrl to symfony-backend' + symfonyBackendApiEndpoint);
  const symfonyBackendResponse = await sendPayload(s3response, symfonyBackendApiEndpoint);
  if (typeof symfonyBackendResponse === 'undefined') {
    return;
  }
  console.log('Bot work completed.');
}

// Run the bot
main();
