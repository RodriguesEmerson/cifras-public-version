import { CifraSearchDataType } from '@/types/cifraSearchType';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

   const data = await import(`./../lib/searchData/hymnsData.json`);
   const cifrasList: CifraSearchDataType[] = data.default;

   const createCifrasMap = function ()  {
      const cifrasMap:MetadataRoute.Sitemap = cifrasList.map(cifra => {
         const title = cifra.sanitized_title.replaceAll(' ', '-');
         const album = cifra.album.replaceAll(' ', '-')
         return {
            url: `https://ccbcifras.com/${album}/${title}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
         };
      });

      return cifrasMap;
   }

   const cifrasMap = createCifrasMap();

   return [
      {
         url: 'https://ccbcifras.com',
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: 'https://ccbcifras.com/albuns',
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.9,
      },
      {
         url: 'https://ccbcifras.com/albuns/todos',
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: 'https://ccbcifras.com/albuns/ccb',
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: 'https://ccbcifras.com/albuns/avulsos',
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: 'https://ccbcifras.com/termos-de-uso',
         lastModified: new Date(),
         changeFrequency: 'yearly',
         priority: 0.5,
      },
      {
         url: 'https://ccbcifras.com/politica-de-privacidade',
         lastModified: new Date(),
         changeFrequency: 'yearly',
         priority: 0.5,
      },
      ...cifrasMap
   ]
}