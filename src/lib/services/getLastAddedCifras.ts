import { CifrasListsType } from "@/types/CifraListsTypes";
import { unstable_cache } from "next/cache";
import { CifrasDBCache } from "../redis/cache/CifrasDBCache";

const cifrasDBCache = new CifrasDBCache();

/**
* Busca as últimas 10 cifras adicionadas
*/
export const getCachedLastAddedCifras = unstable_cache(
   async () => {
      const cachedCifras = await cifrasDBCache.get();
      if (!cachedCifras) return null;

      const cifrasList: CifrasListsType[] = cachedCifras
         .sort((prev, curr) => Number(curr.id) - Number(prev.id))
         .slice(0, 10)
         .map(cifra => {
            return {
               id: cifra.id,
               album: cifra.album.replaceAll(' ', '-'),
               title: cifra.title,
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
   ['last-added-cifras'],
   { revalidate: 864000, tags: ['last-added-cifras'] } //Revalidate 10 dias
)