import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from 'uuid';
import {getRandomDomain} from './domains.js';


export function generatePayload() {
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
    }
  ;
}

const callRandomTimes = (min, max, fn) => {
  const numCalls = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Generated ${numCalls} random flyers`);
  let results = [];
  for (let i = 0; i < numCalls; i++) {
    results.push(fn(i + 1));
  }

  return results;
};

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 12,
    min: 4
  }
});

function getRandomDate(startDate, endDate) {
  // Get the time values for the start and end dates
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  // Generate a random time between the start and end times
  const randomTime = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  // Format the date to 'YYYY-MM-DD'
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero
  const day = String(randomDate.getDate()).padStart(2, '0'); // Adding leading zero

  return `${year}-${month}-${day}`;
}

const startDateFrom = new Date('2023-01-01');
const startDateTo = new Date('2024-01-23');

const endDateFrom = new Date('2024-01-24');
const endDateTo = new Date('2025-01-24');

function getFlyer() {
  const website = getRandomDomain();
  const randomStartDate = getRandomDate(startDateFrom, startDateTo);
  const randomEndDate = getRandomDate(endDateFrom, endDateTo);
  return {
    "Flyer": {
      "id": uuidv4(),
      "title": lorem.generateSentences(1),
      "url": `https://${website}/flyers/flyer.pdf`,
      "start_date": randomStartDate,
      "end_date": randomEndDate,
      "flyer_url": `https:\/\/${website}`,
      "flyer_files": [`http:\/\/www.${website}\/flyer_front.jpg`]
    }
  }
}


