import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from 'uuid';
import {getRandomDomain} from './domains';
import {RequestRoot, FlyerWrapper} from './types';

export function generatePayload():RequestRoot {
  // const flyers = callRandomTimes(19000, 22000, getFlyer); // To generate payloads of around 10MB
  const flyers:FlyerWrapper[] = callRandomTimes(8, 12, getFlyer);
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

const callRandomTimes = <T>(min: number, max: number, fn: (arg: number) => T): T[] => {
  const numCalls:number = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Generated ${numCalls} random flyers`);
  let results: T[] = [];
  for (let i:number = 0; i < numCalls; i++) {
    results.push(fn(i + 1));
  }

  return results;
};

const lorem:LoremIpsum = new LoremIpsum({
  wordsPerSentence: {
    max: 12,
    min: 4
  }
});

function getRandomDate(startDate:Date, endDate:Date): string {
  const startTime: number = startDate.getTime();
  const endTime: number = endDate.getTime();
  const randomTime: number = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
  const randomDate: Date = new Date(randomTime);

  const year: number = randomDate.getFullYear();
  const month: string = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(randomDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const startDateFrom:Date = new Date('2023-01-01');
const startDateTo:Date = new Date('2024-01-23');

const endDateFrom:Date = new Date('2024-01-24');
const endDateTo:Date = new Date('2025-01-24');

function getFlyer():FlyerWrapper {
  const website = getRandomDomain();
  const randomStartDate:string = getRandomDate(startDateFrom, startDateTo);
  const randomEndDate:string = getRandomDate(endDateFrom, endDateTo);
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


