import { CifrasListsType } from "@/types/CifraListsTypes";
import { unstable_cache } from "next/cache";
import { CifrasDBCache } from "../redis/cache/CifrasDBCache";

const cifrasDBCache = new CifrasDBCache();

/**
* Busca as últimas 10 cifras adicionadas
*/
export const getCachedMostViewedCifras = unstable_cache(
   async (): Promise<CifrasListsType[] | null> => {
      const cachedCifras = await cifrasDBCache.get();
      if (!cachedCifras) return null;

      const cifrasList: CifrasListsType[] = cachedCifras.slice(0, 12).map(cifra => {
         return {
            id: cifra.id,
            title: cifra.title,
            album: cifra.album.replaceAll(' ', '-'),
            sanitized_author_name: cifra.sanitized_author_name.replaceAll(' ', '-'),
            sanitized_title: cifra.sanitized_title,
            author: cifra.author,
            author_image: cifra.author_image,
            type: cifra.type,
            number: cifra.number,
            is_verified: cifra.is_verified,
         }
      });

      return cifrasList;

   },
   ['most-viewed-cifras'],
   { revalidate: 864000, tags: ['most-viewed-cifras'] } //Revalidate 10 dias
)