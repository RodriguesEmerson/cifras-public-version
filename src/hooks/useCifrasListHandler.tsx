import { useCifraListStorage } from "@/globalContexts/useCifrasListStorage";
import { CifrasListGetterReturn, CifrasListsType } from "@/types/CifraListsTypes";
import { CifraHymnsType } from "@/types/cifraTypes";
import { useEffect, useState } from "react";

export function useCifrasListHandles(mostViewedCifras: CifrasListGetterReturn, author?: string) {
   const [cifrasList, setCifrasList] = useState<CifrasListsType[] | null>(mostViewedCifras.cifrasList);
   const [cifrasType, setCifrasType] = useState<CifraHymnsType>('all');
   const [cifrasOrder, setCifrasOrder] = useState<'views' | 'alph'>('views');
   const [cifrasCount, setCifrasCount] = useState<number>(mostViewedCifras.cifrasCount);
   const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
   const storedCifrasData = useCifraListStorage(state => state.storedCifrasData);
   const setStoredCifrasData = useCifraListStorage(state => state.setStoredCifrasData);
   const clearStoredCifrasData = useCifraListStorage(state => state.clearStoredCifrasData);

   useEffect(() => {
      /**
       *  Seta as cifras salvas no Zustand em cifrasList quando o usuário volta a página
       * se for o mesmo autor. Se não for o mesmo autor e haver cifras salvas elas serão deletadas.
       * @returns
       */
      const getCifrasList = async () => {
         const savedFilters = sessionStorage.getItem('filters');
         const parsedFilters = savedFilters ? JSON.parse(savedFilters) : null;
         const { StOrder = 'views', StType = 'all', StAuthor = 'none' } = parsedFilters || {};

         if (storedCifrasData && StAuthor === author) {
            setCifrasList(storedCifrasData.list);
            setCifrasCount(storedCifrasData.count);
            setCifrasOrder(StOrder);
            setCifrasType(StType);
            return clearStoredCifrasData();
         };
         clearStoredCifrasData();
      }
      getCifrasList();
   }, []);

   const showMoreCifras = async () => {
      if (isFetchingMore) return;
      //Pega o id da última cifra da lista ou 'none' se não tiver.
      const lastCifraId = cifrasList && cifrasList[cifrasList.length - 1].id || 'none';
      const isFirstPage = cifrasList && cifrasList.length > 0 ? 'n' : 'y';

      const fetchMoreCifras: boolean = await fetchCifras(cifrasType, cifrasOrder, isFirstPage, lastCifraId);
      if (!fetchMoreCifras) return;
   }

   const fetchCifras = async (cifrasType: string, cifrasOrder: string, isFirstPage: 'y' | 'n', lastCifraId: number | 'none') => {
      setIsFetchingMore(true);
      const req: CifrasListGetterReturn = await fetch(`/api/cifras/lists?type=${cifrasType}&order=${cifrasOrder}&isfp=${isFirstPage}&lcid=${lastCifraId}${author ? `&author=${author}` : ''}`, {
         method: 'GET'
      })
         .then(async res => {
            return await res.json();
         })
         .catch(e => {
            return false;
         });

      setIsFetchingMore(false);
      if (req.status === 200) {
         setCifrasList(isFirstPage === 'y' ? req.cifrasList : [...cifrasList!, ...req.cifrasList]);
         setCifrasCount(req.cifrasCount);
         setStoredCifrasData(isFirstPage === 'y' ? req.cifrasList : [...cifrasList!, ...req.cifrasList], req.cifrasCount);

         sessionStorage.setItem('filters', JSON.stringify({ StOrder: cifrasOrder, StType: cifrasType, StAuthor: author }));
         return true;
      }
      return false;
   }

   async function changeOrderDirection(direction: string) {
      const orderBy: 'views' | 'alph' = direction === 'views' || direction === 'alph' ? direction : 'views';
      if (orderBy === cifrasOrder) return;
      const updateCifrasList: boolean = await fetchCifras(cifrasType, orderBy, 'y', 'none');
      if (updateCifrasList) setCifrasOrder(orderBy);
   }

   async function changeCifrasType(cType: string) {
      const type: CifraHymnsType = cType === 'all' || cType === 'hinario' || cType === 'avulso' ? cType : 'all';
      if (type === cifrasType) return;
      const updateCifrasList: boolean = await fetchCifras(type, cifrasOrder, 'y', 'none');
      if (updateCifrasList) setCifrasType(type);
   }

   return {
      cifrasList, cifrasOrder, cifrasType,
      changeOrderDirection, changeCifrasType, showMoreCifras,
      cifrasCount, isFetchingMore
   }
}
   