

export type CifraSearchDataResult = {
   title: string;
   number: string;
   sanitized_author_name: string;
   sanitized_title: string;
   album: string;
   author: string;
}

export type CifraSearchResultStates = {
   data: CifraSearchDataResult[];
   query: string
} | 'isFetching' | 'Error' | null;

export type CifraSearchDataType = CifraSearchDataResult & {
   flag: string
}