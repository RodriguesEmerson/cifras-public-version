'use client';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";


export function MenuMobile() {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   return (
      <section className="sm:hidden ml-1">
         <button
            className='text-white h-9 w-9 rounded-full bg-black'
            onClick={() => setIsOpen(true)}
         ><MenuIcon sx={{ fontSize: 28 }} /></button>
         {isOpen &&
            <MenuMobileNav setIsOpen={setIsOpen}/>
         }
      </section>
   )
}

function MenuMobileNav({setIsOpen}:{setIsOpen: Dispatch<SetStateAction<boolean>>}) {
   const path = usePathname();
   const pages: { text: string, href: string }[] = [
      { text: 'Início', href: '/' },
      { text: 'Álbuns', href: '/albuns' },
      { text: 'Contato', href: '/contato' },
      { text: 'Sobre', href: '/sobre' },
      { text: 'Termos de Uso', href: '/termos-de-uso' },
      { text: 'Política de Privacidade', href: '/politica-de-privacidade' },
   ]
   return (
      <div 
         className={`fixed top-0 left-0 z-20 bg-[#00000090] w-screen h-screen`}
         onClick={() => setIsOpen(false)}
      >
         <nav 
            className={`fixed bottom-0 w-full rounded-t-3xl bg-white py-2`}
            onClick={(e) => e.stopPropagation()}
         >  
            <span 
               className='absolute -top-9 right-1 bg-white rounded-full p-1 pointer-events-none'
            ><CloseIcon /></span>
            <ul className="flex flex-col gap-4 p-3">
               {pages.map(page => (
                  <li key={`pagelink-${page.href}`}>
                     <Link
                        href={page.href} target="_self"
                        className={`flex items-center justify-between text-[var(--text-main-color)] p-1 text-base rounded-sm transition-all hover:bg-white hover:text-purple-800 ${path === page.href ? 'bg-white   !text-purple-800' : ''}`}
                     >
                        <span>{page.text}</span>
                        {path !== page.href 
                           ? <OpenInNewIcon sx={{ fontSize: 16 }} />
                           : <span className='block h-3 w-3 bg-purple-800 rounded-full'></span>
                        }

                     </Link>
                  </li>
               ))}
            </ul>
         </nav >
      </div>
   )
}