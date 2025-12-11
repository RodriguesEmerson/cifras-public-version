'use client'

import { useCifrasListHandles } from '@/hooks/useCifrasListHandler';
import { CifrasListGetterReturn } from '@/types/CifraListsTypes';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Select } from '../UI/Select';
import { CifraListItem } from './cifraListItem';

type CifrasListProps = {
   mostViewedCifras: CifrasListGetterReturn;
   showOnlyOrderByFilter: boolean;
   author?: string;
}

export function CifrasList({ mostViewedCifras, showOnlyOrderByFilter = false, author }: CifrasListProps) {
   const {
      cifrasList, changeCifrasType, changeOrderDirection,
      showMoreCifras, cifrasCount, isFetchingMore,
      cifrasOrder, cifrasType
   } = useCifrasListHandles(mostViewedCifras, author);

   const orderByOptions = [
      { text: 'Mais Tocados', value: 'views' },
      { text: 'Ordem alfabética', value: 'alph' },
   ]

   const cifrasTypeOptions = [
      { text: 'Todos', value: 'all' },
      { text: 'Hinário', value: 'hinario' },
      { text: 'Avulsos', value: 'avulso' },
   ]

   let listNumber = 0;
   return (
      <div className='flex flex-col gap-3 justify-start w-full min-h-[70vh] md:max-w-[800px] max-[1024px]:m-auto ml-[5%] px-2 max-w-[100vw] overflow-hidden'>

         <div className='flex flex-row gap-2 items-center border-b border-[var(--border-color)] pb-2 w-full h-15 max-w-[780px] mb-5'>
            <p className='text-[var(--text-main-color)] text-sm'>
               <span className='max-[365px]:hidden'>Filtros</span>
            </p>
            {!showOnlyOrderByFilter &&
               <div className='flex  gap-1 flex-col items-start sm:flex-row sm:items-center'>
                  <Select
                     options={cifrasTypeOptions}
                     width='small'
                     defaultOption={cifrasTypeOptions.findIndex(op => op.value === cifrasType)}
                     name='cifras-type'
                     onClick={changeCifrasType}
                  />
               </div>
            }
            <div className='flex  gap-1 flex-col items-start sm:flex-row sm:items-center'>
               <Select
                  options={orderByOptions}
                  width='mid'
                  defaultOption={orderByOptions.findIndex(op => op.value === cifrasOrder)}
                  name='cifras-order-by'
                  onClick={changeOrderDirection}
               />
            </div>
         </div>

         <>
            <ul className="flex flex-col justify-center items-center w-full max-w-[780px]">
               {mostViewedCifras.cifrasList.length > 0
                  ? mostViewedCifras.cifrasList.map((cifra, index) => {
                     listNumber++;
                     return (
                        <CifraListItem
                           key={cifra.sanitized_title + index}
                           cifra={cifra}
                           listNumber={listNumber}
                        />
                     )
                  })
                  : <li className='text-gray-600'>
                     Nenhum resultado encontrado. <SearchOffIcon sx={{ fontSize: 22 }} />
                  </li>
               }
            </ul>
            {/* {(mostViewedCifras.cifrasList.length > 0 && mostViewedCifras.cifrasCount > mostViewedCifras.cifrasList.length) &&
                  <div className='flex flex-row'>
                     <ShowMoreBtn onClick={showMoreCifras} isFething={isFetchingMore} />
                  </div>
               } */}
         </>
      </div>
   )
}