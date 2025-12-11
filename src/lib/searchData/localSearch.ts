import { CifraSearchDataResult, CifraSearchDataType } from '@/types/cifraSearchType';


const getCifrasIndexData = async () => {
   const data = await import(`./hymnsData.json`);
   return data.default;
}

export async function localCifrasSearch(query: string): Promise<CifraSearchDataResult[] | null> {
   const cifrasIndexData = await getCifrasIndexData();

   if(!cifrasIndexData) return null;
   const parsedQuery = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/gi, '')
      .toLowerCase()
      .trim();

   const splitedQuery = parsedQuery.split(/\s+/);
   const increasedQuery = splitedQuery.map(word => {
      if (!isNaN(Number(word))) {
         return `\\b` + `${word}` + `\\b.*`
      }
      return `${word}.*`
   })

   const queryRegex = new RegExp(increasedQuery.join('').replace(/[*]$/, '').replace(/[.]$/, ''), 'i');

   let results = cifrasIndexData
      .filter((item: CifraSearchDataType) => queryRegex.test(item.flag))
      .slice(0, 25)
      .map((item: CifraSearchDataType) => ({
         title: item.title,
         number: item.number,
         sanitized_author_name: item.sanitized_author_name,
         sanitized_title: item.sanitized_title.replaceAll(' ', '-'),
         author: item.author,
         album: item.album
      }))

   return results;
}