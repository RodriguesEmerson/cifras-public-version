'use client';

import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useRef } from "react";


export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

   const wasErrorSent = useRef(false);

   const setErrorCookieCoolDown = () => {
      const expires = new Date(Date.now() + 10 * 60 * 1000).toUTCString(); //10 minutos
      document.cookie = `next_e_time_s=y; expires=${expires}; path=/;`;
   }

   const recordError = async () => {
      await fetch('api/log-error', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent
         })
      })
         .then(res => {
            if (res.status === 200) {
               setErrorCookieCoolDown();
            }
         })
   }

   useEffect(() => {
      if (wasErrorSent.current) return;
      recordError();

      wasErrorSent.current = true;
   }, [error])

   return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-[86vh]">
         <div className="w-fit">
            <Image src={'/images/oops-notfound-page.png'} width={250} height={70} alt="Oops - algo deu errado | CCB Cifras" />
         </div>
         <h2 className="font-semibold text-xl">Algo deu errado!</h2>
         <button
            className="flex flex-row gap-4 w-fit mt-5 bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 rounded-md text-white hover:cursor-pointer"
            onClick={() => reset()}
         >
            <span>Tentar novamente</span>
            <RotateLeftIcon />
         </button>

         <div>
            <p>Se o erro persistir, entre em contanto <Link className='text-blue-700 underline' href={'/contato'} >clicando aqui</Link>.</p>
         </div>
      </div>
   )
}