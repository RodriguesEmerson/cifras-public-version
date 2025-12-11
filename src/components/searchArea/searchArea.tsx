'use client';
import { useGlobalModalsVisibility } from "@/globalContexts/globalModalsVisibility";
import { localCifrasSearch } from "@/lib/searchData/localSearch";
import { CifraSearchResultStates } from "@/types/cifraSearchType";
import { useState } from "react";
import { SearchForm } from "./searchForm";
import { SearchModal } from "./searchModal";

export function SearchArea() {
   const isSearchModalVisible = useGlobalModalsVisibility(state => state.isSearchModalVisible);
   const setSearchModalVisibility = useGlobalModalsVisibility(state => state.setSearchModalVisibility);
   const [results, setResults] = useState<CifraSearchResultStates>(null);

   const handleSearchCifra = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (results === "isFetching") return;

      const form = e.currentTarget;
      const formData = new FormData(form);
      const formEntries = Object.fromEntries(formData);

      const query = formEntries.q ?? null;
      if (!query) return;

      setResults('isFetching');
      setSearchModalVisibility(true);

      const searchResult = await localCifrasSearch(query.toString());
      if (!searchResult) {
         return setResults('Error')
      }
      
      return setResults({
         data: searchResult,
         query: `${query}`
      })
   };

   return (
      <>
         <SearchForm onSubmit={handleSearchCifra} />
         {isSearchModalVisible &&
            <SearchModal results={results} handleSearchCifra={handleSearchCifra} />
         }
      </>

   )

}