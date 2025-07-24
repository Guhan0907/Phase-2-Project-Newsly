export interface NYTArticle {
  title: string;
  abstract: string;
  url: string;
  byline: string;
  published_date: string;
  subsection: string;
  section: string;
  des_facet?: string[];
  isRead: boolean;

  // Top Stories & Archive
  multimedia?: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
  }[];

  // Trending
  media?: {
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
    approved_for_syndication: number;
    "media-metadata": {
      url: string;
      format: string;
      height: number;
      width: number;
    }[];
  }[];
}
