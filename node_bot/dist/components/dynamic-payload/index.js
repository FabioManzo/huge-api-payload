"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePayload = generatePayload;
const lorem_ipsum_1 = require("lorem-ipsum");
const uuid_1 = require("uuid");
const domains_1 = require("./domains");
function generatePayload() {
    // const flyers = callRandomTimes(19000, 22000, getFlyer); // To generate payloads of around 10MB
    const flyers = callRandomTimes(8, 12, getFlyer);
    return {
        "CrawlerRequest": {
            "retailer_id": "3249",
            "crawler_id": "1385",
            "data": {
                "flyers": flyers
            }
        }
    };
}
const callRandomTimes = (min, max, fn) => {
    const numCalls = Math.floor(Math.random() * (max - min + 1)) + min;
    console.info(`Generated payload with ${numCalls} random flyers. Min: ${min} and Max: ${max}. Set higher number to generate a larger payload`);
    let results = [];
    for (let i = 0; i < numCalls; i++) {
        results.push(fn(i + 1));
    }
    return results;
};
const lorem = new lorem_ipsum_1.LoremIpsum({
    wordsPerSentence: {
        max: 12,
        min: 4
    }
});
function getRandomDate(startDate, endDate) {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const randomTime = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
    const randomDate = new Date(randomTime);
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const startDateFrom = new Date('2023-01-01');
const startDateTo = new Date('2024-01-23');
const endDateFrom = new Date('2024-01-24');
const endDateTo = new Date('2025-01-24');
function getFlyer() {
    const website = (0, domains_1.getRandomDomain)();
    const randomStartDate = getRandomDate(startDateFrom, startDateTo);
    const randomEndDate = getRandomDate(endDateFrom, endDateTo);
    return {
        "Flyer": {
            "id": (0, uuid_1.v4)(),
            "title": lorem.generateSentences(1),
            "url": `https://${website}/flyers/flyer.pdf`,
            "start_date": randomStartDate,
            "end_date": randomEndDate,
            "flyer_url": `https:\/\/${website}`,
            "flyer_files": [`http:\/\/www.${website}\/flyer_front.jpg`]
        }
    };
}
