
import { unstable_cache } from 'next/cache';
import { CifraDBCache } from '../redis/cache/cifraDBCache';

const cifraDBCache = new CifraDBCache();

export async function getCifrab(title: string) {
   const cachedCifra = cifraDBCache.get(title);
   
   if (!cachedCifra) return null ;
   return cachedCifra

}

export async function getCifra(title: string) {

   const parsedTitle = title
      .replaceAll(' ', '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

   return unstable_cache(
      async () => {
         const cachedCifra = cifraDBCache.get(title);
         return cachedCifra
      },
      [`cifra-${parsedTitle}`],
      { revalidate: 864000, tags: ['cifra'] } //10 dias
   )()

}