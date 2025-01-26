"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const dotenv_1 = require("dotenv");
const dynamic_payload_1 = require("./components/dynamic-payload");
// Load the `.env` file specific to the environment
(0, dotenv_1.config)({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});
// Load the default `.env` file as a fallback
(0, dotenv_1.config)();
// API endpoint to send the data
const nodeS3Simulator = process.env.NODE_S3_SIMULATOR;
const symfonyBackend = process.env.SYMFONY_BACKEND;
const s3SimulatorApiEndpoint = `${nodeS3Simulator}/payload-upload`;
const symfonyBackendApiEndpoint = `${symfonyBackend}/api/crawler-request`;
// Function to send the payload to the API
function sendPayload(payload, apiEndpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = yield axios_1.default.post(apiEndpoint, payload, config);
            console.log('Payload successfully sent! Response:', response.data);
            return response.data;
        }
        catch (err) {
            console.error('Error sending payload:', err.message);
        }
    });
}
// Main function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting the bot...');
        const payload = (0, dynamic_payload_1.generatePayload)();
        console.log('Sending to node_S3_simulator API...');
        const s3response = yield sendPayload(payload, s3SimulatorApiEndpoint);
        if (typeof s3response === 'undefined') {
            return;
        }
        console.log('Sending the fileUrl to symfony-backend' + symfonyBackendApiEndpoint);
        const symfonyBackendResponse = yield sendPayload(s3response, symfonyBackendApiEndpoint);
        if (typeof symfonyBackendResponse === 'undefined') {
            return;
        }
        console.log('Bot work completed.');
    });
}
// Run the bot
main();
