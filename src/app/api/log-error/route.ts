import { db } from "@/lib/firebase/firebaseServiceAccount";
import { Timestamp } from "firebase-admin/firestore";


export async function POST(req: Request) {

   const body = await req.json();
   
   if (!body) return Response.json({ message: 'Erro: Empty body' }, { status: 200 }); //Sempre 200, mesmo sendo ignorado

   const cookies = req.headers.get('cookie') || '';
   if (cookies.includes('next_e_time_s=y')) {
      return Response.json({ message: 'Ignored' }, { status: 200 });
   }

   const data = {
      error: body.error || 'alterado',
      stack: body.stack || 'alterado',
      url: body.url || 'alterado',
      userAgent: body.userAgent || 'alterado',
      created_at: Timestamp.now()
   }

   try {
      await db.collection('collection-name').add(data);
   } catch (e) {

   }
}