

export type YoutubeVideoType = {
   url: string;
   views: string;
   id: string;
   channelTitle: string
}

export type YoutubeVideoItem = {
   kind: string;
   etag: string;
   id: string;
   statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
   };
   snippet: { channelTitle: string }
}
export type YoutubeApiResponse = {
   kind: string;
   etag: string;
   id: string;
   items: YoutubeVideoItem[];
   pageInfo: { totalResults: number, resultsPerPage: number };
}