'use server'

import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firebase/firebaseServiceAccount";

export async function incrementView(id:string){
   
   if (!/^\d+$/.test(id) || id.length > 4) return;

   const formatedId = id.padStart(3, '0'); //1 = 001, 99 = 099

   try{
      const hymnRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> = await db.collection('collection-name').doc(formatedId);
      
      if(!hymnRef) return;
   
      await hymnRef.update({views: FieldValue.increment(1)})

   }catch(e){
   }
}