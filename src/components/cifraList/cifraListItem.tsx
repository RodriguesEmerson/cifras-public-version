import { Spinner } from "@/components/UI/Spinner";
import { CifrasListsType } from "@/types/CifraListsTypes";
import Link from "next/link";
import { useState } from "react";

type CifraListItemProps = {
   cifra: CifrasListsType;
   listNumber: number;
}

export function CifraListItem({ cifra, listNumber }: CifraListItemProps) {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const afterContent = cifra.type === 'hinario' ? `Hino ${cifra.number}` : 'Avulso';

   return (
      <li 
         className="w-full min-w-[320px]" 
         onClick={() => setIsLoading(true)}
      >
         <Link
            href={`/albuns/${cifra.album.replaceAll(' ', '-')}/${cifra.sanitized_title.replaceAll(' ', '-')}`}
            className="group hover:bg-[#7008d21b] hover:text-[#5f08b1] transition-all h-10 leading-8 p-1 px-2  rounded-md w-full flex flex-row gap-3 items-center justify-center"
         >
            <span className="font-bold text-xl text-gray-300 group-hover:text-[#5f08b1] duration-150">{listNumber}</span>
            <div className="flex flex-row justify-between items-center w-full text-[#3b3b3b]">
               <p
                  className={`max-[350px]:text-[13px] text-sm sm:text-base max-w-[72%]`}
               >{cifra.title}</p>
               {!isLoading
                  ? <span className="text-xs text-gray-700 bg-gray-200 h-4 px-1 rounded-xs">{afterContent}</span>
                  : <span className="flex flex-row gap-1 items-center text-xs"><Spinner size="small"/> Abrindo Cifra</span>
               }
               
            </div>
         </Link>
      </li>
   )
}