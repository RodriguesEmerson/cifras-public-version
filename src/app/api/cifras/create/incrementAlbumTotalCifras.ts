'use server'

import { db } from "@/lib/firebase/firebaseServiceAccount";
import { FieldValue } from "firebase-admin/firestore";

export async function incrementAlbumTotalCifras(album:string){
   try{
      const albumData = await db.collection('colletcion-name').where('sanitized_name', '==', album).get();

      const albumId = albumData.docs.map(doc => doc.id);
      const formatedId = albumId[0].padStart(3, '0'); //1 = 001, 99 = 099
      const hymnRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> = await db.collection('authors').doc(formatedId);
      if(!hymnRef) return;
   
      await hymnRef.update({total_cifras: FieldValue.increment(1)});

   }catch(e){
      // console.log(`Erro ao tentar incrementar vews no album ${album}. \nErro: ` + e)
   }
}