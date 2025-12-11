'use client';
import { hiddeReCaptchaBox, showReCaptchaBox } from "@/lib/utils/reCaptchaStyleHandle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export function Menu() {
   const path = usePathname();
   useEffect(() => {
      //Esconde o icone do reCaptcha
      if(path === '/contato'){
         return showReCaptchaBox();
      }
      hiddeReCaptchaBox();
   },[path])

   return (
      <section className="max-[640px]:hidden">
         <nav>
            <ul className="flex flex-row gap-1 ">
               <li>
                  <Link
                     href={'/'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Início
                  </Link>
               </li>
               <li>
                  <Link
                     href={'/albuns'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/albuns' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Álbuns
                  </Link>
               </li>
               <li>
                  <Link
                     href={'/contato'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/contato' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Contato
                  </Link>
               </li>
               <li className="max-[690px]:hidden">
                  <Link
                     href={'/sobre'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/sobre' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Sobre
                  </Link>
               </li>
               <li className="max-[820px]:hidden">
                  <Link
                     href={'/termos-de-uso'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/termos-de-uso' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Termos de Uso
                  </Link>
               </li>
               <li className="max-[980px]:hidden">
                  <Link
                     href={'/politica-de-privacidade'} target="_self"
                     className={`text-white p-2 py-2 text-sm rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === '/politica-de-privacidade' ? 'bg-white   !text-purple-800' : ''}`}
                  >
                     Política de Privacidade
                  </Link>
               </li>
            </ul>
         </nav >
      </section>
   )
}