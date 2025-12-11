import { db } from "@/lib/firebase/firebaseServiceAccount";

import { Timestamp } from "firebase-admin/firestore";
import { incrementAlbumTotalCifras } from "./incrementAlbumTotalCifras";
import { newCifraDTO } from "./newCifraDTO";
import { saveCifraSearchData } from "./saveCifraSearchData";

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const data = newCifraDTO(body);
      if (!data) return Response.json({ message: 'Erro: Empty data' }, { status: 400 });

      saveCifraSearchData(data);

      //Insere o número do capo apenas após o DTO, já que não é necessário em todos os hinos.
      if(data?.capo && !isNaN(data.capo)){
         data.capo = Number(data.capo)
      }

      await db.collection('hymns').doc(`${data.id.toString().padStart(3, '0')}`).set({...data, created_at: Timestamp.now()});

      incrementAlbumTotalCifras(data.album);

      return Response.json({ message: `A Cifra do hino ${data.title.toUpperCase()}, foi criada.` }, { status: 201});

   } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      return Response.json({ message: 'Erro: ' + err }, { status: 500});
   }
}