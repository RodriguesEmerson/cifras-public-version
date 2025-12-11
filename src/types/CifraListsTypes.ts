import { AuthorDataType } from "./authorTypes";

export type CifrasListsType = {
   id: number;
   album: string;
   author: string;
   author_image: string;
   title: string;
   sanitized_author_name: string;
   sanitized_title: string;
   number: string;
   type: 'hinario' | 'avulso';
   is_verified: boolean
}

export type CifrasListGetterReturn = {
   cifrasList: CifrasListsType[],
   cifrasCount: number,
   authorData: AuthorDataType[];
   status: 200 | 400 | 500
};

export type CifrasListGetterReturnPromise = Promise<CifrasListGetterReturn | null>