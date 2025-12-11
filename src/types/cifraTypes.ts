import { ChordsType } from "./chodsTypes";
import { YoutubeVideoType } from "./YouTubeTypes";

export type CifraHymnsType = 'hinario' | 'avulso' | 'all';

export type CifraType = {
   id: number;
   author: string;
   album: string;
   author_image: string;
   cifra: string;
   intro: string;
   number: string;
   title: string;
   capo?: number;
   sanitized_title: string;
   sanitized_author_name: string;
   video_url: string;
   video: YoutubeVideoType | false;
   views: number;
   type: 'hinario' | 'avulso';
   tone: ChordsType;
   is_verified: boolean;
}

export type NewCifraType = {
   id: number;
   album: string;
   author: string;
   author_image: string;
   cifra: string;
   capo?: number;
   intro: string;
   number: string;
   title: string;
   sanitized_title: string;
   sanitized_author_name?: string;
   video_url: string;
   views: number;
   type: 'hinario' | 'avulso';
   tone: ChordsType;
   is_verified: boolean;
}

export type NewCifraDTOType = {
   [K in keyof NewCifraType]?: any;
}