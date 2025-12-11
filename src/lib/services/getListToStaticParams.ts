import { unstable_cache } from "next/cache";
import { CifrasDBCache } from "../redis/cache/CifrasDBCache";

const cifrasDBCache = new CifrasDBCache();
/**
    * Busca os títulos de todas as cifras para as páginas estáticas serem criadas
    * @param author 
    * @returns Array{ `tile`: string, `sanitized_title`:string } ou `null`
    */
export const getListToStaticParams = unstable_cache(
   async () => {
      const cachedCifras = await cifrasDBCache.get();
      if (!cachedCifras) return null;

      return {
         cifrasTitlesList: cachedCifras.map(cifra => {
            return {
               album: cifra.album.replaceAll(' ', '-'),
               title: cifra.sanitized_title.replaceAll(' ', '-')
            }
         }),
      }
   },
    ['cifras-static-params-list'],
   {revalidate: 864000, tags: ['cifras-static-params-list']}
)
