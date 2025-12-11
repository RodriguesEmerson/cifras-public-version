import { CifrasListGetterReturnPromise, CifrasListsType } from "@/types/CifraListsTypes";
import { AuthorDataType } from "@/types/authorTypes";
import { unstable_cache } from "next/cache";
import { CifrasDBCache } from "../redis/cache/CifrasDBCache";
import { AuthorsDBCache } from "../redis/cache/authorDBCache";

const cifrasDBCache = new CifrasDBCache();
const authorsDBCache = new AuthorsDBCache();

/**
 * Retorna todas as cifras de um álbum ou de um autor.
 * Resultados são cacheados por álbum (1 dia).
 */
export const getAllAlbumCifras = async (album: string): CifrasListGetterReturnPromise => {

   const albumKey = album.replaceAll("-", " ");
   const cacheKey = `all-album-cifras-${album}`;

   return unstable_cache(
      async () => {
         const [storedCifras, storedAuthors] = await Promise.all([
            cifrasDBCache.get(),
            authorsDBCache.get()
         ]);

         if (!storedCifras || !storedAuthors) return null;

         try {

            // Autor relacionado ao álbum
            const authorStoredData =  storedAuthors.filter(author => author.sanitized_name === albumKey);
            const authorData: AuthorDataType[] = authorStoredData
               ? authorStoredData.map(author => {
                  return {
                     name: author.name,
                     image: author.image,
                     sanitized_name: author.sanitized_name.replaceAll(' ', '-'),
                     total_cifras: author.total_cifras,
                     is_verified: author.is_verified
                  }
               })
               : []

            // Filtra as cifras do álbum
            const list: CifrasListsType[] = storedCifras
               .filter(cifra => {
                  if (albumKey === 'todas') {
                     return cifra;
                  }
                  return cifra.album === albumKey
               })
               .map(cifra => {
                  return {
                     id: cifra.id,
                     album: cifra.album.replaceAll(' ', '-'),
                     title: cifra.title,
                     author: cifra.author,
                     author_image: cifra.author_image,
                     sanitized_author_name: cifra.sanitized_author_name.replaceAll(' ', '-'),
                     sanitized_title: cifra.sanitized_title,
                     type: cifra.type,
                     number: cifra.number ?? '',
                     is_verified: cifra.is_verified
                  }
               });

            return { cifrasList: list, cifrasCount: list.length, status: 200 as const, authorData: authorData };

         } catch (e) {
            return null;
         }
      },
      [cacheKey],
      { revalidate: 864000, tags: ['all-album-cifras'] }
   )();
}