export interface NYTArticle {
  title: string;
  abstract: string;
  url: string;
  byline: string;
  published_date: string;
  multimedia?: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
  }[];
}
