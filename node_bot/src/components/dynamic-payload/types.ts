type Flyer = {
  id: string;
  title: string;
  url: string;
  start_date: string;
  end_date: string;
  flyer_url: string;
  flyer_files: string[];
};

export type FlyerWrapper = {
  Flyer: Flyer;
};

type Types = {
  retailer_id: string;
  crawler_id: string;
  data: {
    flyers: FlyerWrapper[];
  };
};

export type RequestRoot = {
  CrawlerRequest: Types;
};

