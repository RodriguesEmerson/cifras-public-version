'use client';
import { Spinner } from "@/components/UI/Spinner";
import { CifrasListsType } from "@/types/CifraListsTypes";
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from "next/link";
import { useState } from 'react';

export function MostViewdListItem({ cifra, listNumber }: { cifra: CifrasListsType, listNumber: number}) {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   
   return (
      <li 
         className="min-w-75 md:min-w-90 w-full relative"
         onClick={() => {{setIsLoading(true)}}}
      >
         <Link
            href={`albuns/${cifra.album}/${cifra.sanitized_title.replaceAll(' ', '-')}`}
            className={`group hover:bg-[#7008d21b] hover:text-[#5f08b1] transition-all h-15 leading-8 p-1 px-2 rounded-md w-full flex flex-row gap-1 md:gap-3 items-center ${isLoading ? 'bg-[#7008d21b]' : ''}`}
         >
            <span
               className={`font-bold text-xl  md:text-3xl text-gray-300 group-hover:text-[#5f08b1] duration-150 ${isLoading ? '!text-[#5f08b1]' : ''}`}
            >
               {listNumber}
            </span>
            <div className="flex flex-col gap-0 items-start px-2 w-full text-[#3b3b3b]">
               <div className="flex flex-row gap-1 items-center">
                  <p className={`h-5 leading-5 font-semibold text-base`}>{cifra.title}</p>
                  {cifra.is_verified && <VerifiedIcon sx={{ color: 'var(--main-color)', fontSize: 17 }} />}
               </div>
               <div className="flex flex-col items-center gap-2 text-[#6b6b6b]">
                  <p className="text-xs">Autor: <span className="font-semibold">{cifra.author}</span></p>
               </div>
               <span className="text-xs text-gray-700 bg-gray-200 h-4 px-1 rounded-xs">
                  {cifra.type === 'hinario'
                     ? `Hino ${cifra.number}`
                     : 'Avulso'
                  }
               </span>  
            </div>
            {isLoading &&
               <span className="absolute right-2 bottom-1 flex flex-row gap-1 items-center text-xs">
                  <Spinner size="small" />
                  <span>Abrindo Cifra</span>
               </span>
            }
         </Link>
      </li>
   )

}