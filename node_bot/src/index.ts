import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import { config } from 'dotenv';
import  {generatePayload} from './components/dynamic-payload';
import {RequestRoot} from "./components/dynamic-payload/types";

// Load the `.env` file specific to the environment
config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

// Load the default `.env` file as a fallback
config();

// API endpoint to send the data
const nodeS3Simulator = process.env.NODE_S3_SIMULATOR;
const symfonyBackend = process.env.SYMFONY_BACKEND;
const s3SimulatorApiEndpoint:string = `${nodeS3Simulator}/payload-upload`;
const symfonyBackendApiEndpoint:string = `${symfonyBackend}/api/crawler-request`;

// Function to send the payload to the API
async function sendPayload<T>(payload: T, apiEndpoint: string): Promise<AxiosResponse<any> | void> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response:AxiosResponse<any> = await axios.post(apiEndpoint, payload, config);
    console.log('Payload successfully sent! Response:', response.data);
    return response.data;
  } catch (err:any) {
    console.error('Error sending payload:', err.message);
  }
}

// Main function
async function main():Promise<void> {
  console.log('Starting the bot...');
  const payload:RequestRoot = generatePayload();
  console.log('Sending to node_S3_simulator API...');
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
