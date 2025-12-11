import { CifrasListsType } from "@/types/CifraListsTypes";
import { MostViewdListItem } from "./mostViewdListItem";

export function MostViewdList({ mostViewdCifras }: { mostViewdCifras: CifrasListsType[] }) {
   let listNumber = 0;
   const sliceCut = mostViewdCifras.length / 2;

   return (
      <div className="flex flex-col gap-0 w-full sm:flex-row sm:gap-2 flex-[2_1]">
         <ul className="flex flex-col gap-0 max-w-screen w-full">
            {mostViewdCifras.slice(0, sliceCut).map(cifra => {
               listNumber++
               return (
                  <MostViewdListItem
                     key={cifra.title}
                     cifra={cifra}
                     listNumber={listNumber}
                  />
               )
            })}
         </ul>
         <ul className="flex flex-col gap-1 max-w-screen w-full">
            {mostViewdCifras.slice(sliceCut, ).map(cifra => {
               listNumber++
               return (
                  <MostViewdListItem
                     key={cifra.title}
                     cifra={cifra}
                     listNumber={listNumber}
                  />
               )
            })}
         </ul>
      </div>
   )
}