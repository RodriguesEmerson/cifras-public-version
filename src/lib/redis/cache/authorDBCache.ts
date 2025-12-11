import { redis } from '@/lib/redis/redis';
import { AuthorDataType } from '@/types/authorTypes';
import { db } from '../../firebase/firebaseServiceAccount';

export class AuthorsDBCache {

   /** Obtém um as cifras em cache */
   async get(): Promise<AuthorDataType[] | null> {
      const storedAuthors:AuthorDataType[] | null = await redis.get('authorsData');

      if (storedAuthors) {
         return storedAuthors;
      }

      try {
         const snapshotAuthors = await db.collection('collection-name')
            .orderBy('views', 'desc')
            .limit(12)
            .get();

         if (!snapshotAuthors) return null;

         /** Salva os dados das cifras */
         const authorsData: AuthorDataType[] = snapshotAuthors.docs.map(doc => {
            return {
               name: doc.data().name,
               image: doc.data().image,
               sanitized_name: doc.data().sanitized_name.replaceAll(' ', '-'),
               total_cifras: doc.data().total_cifras,
               is_verified: doc.data().is_verified
            }
         });

         await redis.set('authorsData', authorsData, {ex: 1200})

         return authorsData;

      } catch (e) {
         return null
      }
   };
}