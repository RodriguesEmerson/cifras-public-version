import { redis } from '@/lib/redis/redis';
import { CifraType } from '@/types/cifraTypes';
import { db } from '../../firebase/firebaseServiceAccount';

export class CifrasDBCache {
 
   /** Obtém um as cifras em cache */
   async get(): Promise<CifraType[] | null> {
      const storedCifras:CifraType[] | null = await redis.get('allCifras');
      if(storedCifras){
         return storedCifras;
      }
      try {
         const cifrasList: CifraType[] | null = await this.fetchAndCache();

         if(!cifrasList) return null;
         
         await redis.set('allCifras', cifrasList, {ex: 1200});

         return cifrasList;
      } catch (e) {
         return null
      }
   };;

   /** Salva os dados da cifras */
   async fetchAndCache() {
      try {
         const snapshotCifras = await db.collection('collection-name')
            .orderBy('views', 'desc')
            .get();

         if (!snapshotCifras) return null;

         const cifrasList: CifraType[] = snapshotCifras.docs.map(doc => {
            return {
               id: doc.data().id,
               title: doc.data().title,
               cifra: doc.data().cifra,
               intro: doc.data().intro,
               tone: doc.data().tone,
               video: doc.data().video,
               video_url: doc.data().video_url,
               views: doc.data().views,
               capo: doc.data().capo,
               album: doc.data().album.replaceAll(' ', '-'),
               sanitized_author_name: doc.data().sanitized_author_name.replaceAll(' ', '-'),
               sanitized_title: doc.data().sanitized_title,
               author: doc.data().author,
               author_image: doc.data().author_image,
               type: doc.data().type,
               number: doc.data().number,
               is_verified: doc.data().is_verified,
            }
         });

         return cifrasList
      } catch (e) {
         return null
      }

   };
}