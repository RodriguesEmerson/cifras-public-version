import { db } from "@/lib/firebase/firebaseServiceAccount";
import { CifrasListsType } from "@/types/CifraListsTypes";
import { OrderByDirection, WhereFilterOp } from "firebase-admin/firestore";

type CifrasParamsType = 'hinario' | 'avulso' | 'all';

export async function GET(req: Request) {
   
   const url = new URL(await req.url);
   const type = url.searchParams.get('type') || 'all';
   const order = url.searchParams.get('order') || 'views';
   const isfp = url.searchParams.get('isfp') || true;
   const lcid = url.searchParams.get('lcid') || null;
   const author = url.searchParams.get('author') || 'all';
   const album = author === 'todas' ? 'all' : author;

   const lastCifraId: number = lcid && !isNaN(Number(lcid)) ? Number(lcid) : 1;
   const isFirstPage: boolean = isfp === 'y' ? true : false;
   const cifrasType: CifrasParamsType = type === 'hinario' || type === 'avulso' ? type : 'all';
   const filterType: WhereFilterOp = cifrasType === 'all' ? '!=' : '==';
   const orderBy: 'sanitized_title' | 'views' = order === 'alph' ? 'sanitized_title' : 'views';
   const orderDirection: OrderByDirection = orderBy === 'views' ? 'desc' : 'asc';

   try {
      //Filtro das cifras
      const snapshot = album === 'all'
         ? db.collection('collection-name').orderBy(orderBy, orderDirection).where('type', filterType, cifrasType)
         : db.collection('collection-name')
            .where('album', '==', album)
            .orderBy(orderBy, orderDirection)
            .where('type', filterType, cifrasType);

      const snapshotCount = await snapshot
         .count()
         .get();

      const cifrasCount = snapshotCount.data().count;

      //Busca a lista de cifras após o ID passado na query, se não tiver busca a partir da primeira da lista.
      const getCifras = async () => {
         if (isFirstPage) {
            const startAtSnapshot = await snapshot
               .limit(1)
               .get();

            const firstDoc = startAtSnapshot.docs[0] || 0;
            return snapshot
               .startAt(firstDoc)
               .limit(50)
               .get();
         }

         const startAfterSnapshot = await db.collection('collection-name')
            .where('id', '==', lastCifraId)
            .get();

         const lastDoc = startAfterSnapshot.docs[startAfterSnapshot.docs.length - 1];
         return snapshot
            .startAfter(lastDoc)
            .limit(20)
            .get();
      }

      const snapshotCifras = await getCifras();

      const list: CifrasListsType[] = snapshotCifras.docs.map(doc => {
         return {
            id: doc.data().id,
            album: doc.data().album,
            author: doc.data().author,
            author_image: doc.data().author_image,
            title: doc.data().title,
            sanitized_author_name: doc.data().sanitized_author_name,
            sanitized_title: doc.data().sanitized_title,
            type: doc.data().type,
            number: doc.data().number ? doc.data().number : '',
            is_verified: doc.data().is_verified
         }
      });

      return Response.json({ cifrasList: list, cifrasCount: cifrasCount }, { status: 200 });

   } catch (e) {
      return Response.json({ message: 'Erro ao buscar a lista de cifras' }, { status: 500});
   }

}