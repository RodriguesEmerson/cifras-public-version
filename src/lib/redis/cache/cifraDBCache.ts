import { redis } from '@/lib/redis/redis';
import { YoutubeApiResponse } from '@/types/YouTubeTypes';
import { CifraType } from '@/types/cifraTypes';
import { db } from '../../firebase/firebaseServiceAccount';
const YT_URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics'
const YT_API_KEY = process.env.YT_API_KEY;

export class CifraDBCache {

   /**
    * Pega a cifra em cache ou busca no banco se não haver o cache ainda.
    * @param title já vem sanitizado de getCifra.ts
   */
   async get(title: string): Promise<CifraType | null> {

      //Tenta pegar a cifra no cache.
      const cachedCifra: CifraType | null = await redis.get(`cifra-${title}`);
      if (cachedCifra) {
         return cachedCifra;
      }

      //Busca a cifra no banco de dados.
      try {
         const snapshot = await db.collection('collection-name')
            .where('sanitized_title', '==', title.replaceAll('-', ' '))
            .get();

         const cifras = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
               id: data.id,
               author: data.author,
               author_image: data.author_image,
               cifra: data.cifra,
               intro: data.intro,
               capo: data.capo,
               number: data.number,
               title: data.title,
               sanitized_title: data.sanitized_title,
               sanitized_author_name: data.sanitized_author_name.replaceAll(' ', '-'),
               video_url: data.video_url,
               views: data.views,
               type: data.type,
               tone: data.tone,
               is_verified: data.is_verified,
               video: false
            } as CifraType;
         });

         const cifra: CifraType | null = cifras[0];

         if (!cifra) return null;

         //Pega os dados através da Url do vídeo, se tiver.
         if (cifra.video_url) {
            try {
               const url = new URL(cifra.video_url);
               const searchParams = url.searchParams;
               const id = searchParams.get('v');
               if (id) {
                  const videoDataFetch = await fetch(`${YT_URL}&id=${id}&key=${YT_API_KEY}`, { method: 'GET' });
                  if (videoDataFetch.status === 200) {
                     const videoData: YoutubeApiResponse = await videoDataFetch.json();
                     const item = videoData.items?.[0];
                     if (item?.statistics?.viewCount) {
                        cifra.video = {
                           url: cifra.video_url,
                           views: item.statistics?.viewCount,
                           id: id,
                           channelTitle: item.snippet.channelTitle
                        };
                     }
                  }
               }
            } catch (e) { }
         }

         //Cacheia a cifra no Upstash (Redis)
         await redis.set(`cifra-${title}`, cifra, {ex: 1200})
         return cifra;
      } catch (e) {
         return null;
      }
   }
}