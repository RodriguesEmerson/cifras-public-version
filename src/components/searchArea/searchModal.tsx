'use client';

import { useGlobalModalsVisibility } from "@/globalContexts/globalModalsVisibility";
import { CifraSearchResultStates } from "@/types/cifraSearchType";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import { Spinner } from "../UI/Spinner";
import { SearchForm } from "./searchForm";

export function SearchModal(
   { results, handleSearchCifra }: { results: CifraSearchResultStates, handleSearchCifra: (e: React.FormEvent<HTMLFormElement>) => void }
) {
   const setSearchModalVisibility = useGlobalModalsVisibility(state => state.setSearchModalVisibility);


   return (
      <section
         className="fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-30 bg-[#00000080]"
         // onClick={() => setSearchModalVisibility(false)}
      >
         <div
            className="w-[90%] sm:w-[85%] max-w-[1224px] h-[97vh] shadow-md shadow-[#00000030] max-h-[98vh] bg-white rounded-md overflow-hidden pb-2"
            onClick={(e) => e.stopPropagation()}
         >
            {/* cabeçalho */}
            <div
               className="flex flex-row justify-between items-center w-full h-10 bg-[var(--main-color)] px-2"
            >
               <div className="max-w-80 w-full md:ml-[15%] mr-2">
                  <SearchForm 
                     onSubmit={handleSearchCifra} 
                     defaultText={(results && (results !== 'Error' && results !== "isFetching")) ? results.query : ''}
                  />
               </div>
               <span
                  className="content-center text-center leading-8 h-8 min-w-8 rounded-md bg-[#00000030] text-white right-2 cursor-pointer"
                  onClick={() => setSearchModalVisibility(false)}
               >
                  <CloseIcon />
               </span>
            </div>



            {results === "isFetching" &&
               <div className="w-fit m-auto pt-15">
                  <Spinner />
                  <span>Procurando cifras</span>
               </div>
            }

            {(results && (results !== 'Error' && results !== "isFetching")) &&

               //    ALTRAR PARA CIMA
               <div className="w-full max-h-[calc(100%-37px)] overflow-y-auto pb-2">
                  {/* // body do componente */}
                  <div className="flex flex-col sm:gap-3 md:w-[70%] m-auto pt-5 px-2">

                     <div className="border-b border-b-gray-200 pb-1">
                        <p className="text-xs">
                           {results.data.length === 25 ? 'Mais de' : ''} {results.data.length} cifra{results.data.length > 1 ? 's': ''} encontrada{results.data.length > 1 ? 's': ''} para <strong>{results.query}</strong>
                        </p>
                     </div>

                     {/* lista de resultados */}
                     {results.data.map((result, index) => {
                        return (
                           <div
                              key={result.author + index}
                              className="border-b border-b-gray-200 pb-2 md:border-none md:p-0 bg-white"
                           >
                              <Link href={`/albuns/${result.album}/${result.sanitized_title}`}
                                 className="block w-fit h-5 text-purple-900 hover:underline"
                              >Hino {!!result.number ? `${result.number} - ${result.title}` : `avulso ${result.title}`}</Link>
                              <div className="text-[13px] text-[#7a7a7a]">
                                 <p
                                    className="h-4 overflow-hidden text-ellipsis max-w-full text-nowrap"
                                 >
                                    {`albuns › ${result.album} › `}{result.sanitized_title}
                                 </p>
                                 <p
                                    className="text-black leading-4"
                                 >
                                    Cifra do hino {!!result.number
                                       ? <>  <strong>{result.number} - {result.title}</strong> do hinário 5, composto pela  </>
                                       : <>avulso <strong>{result.title}</strong>, composto por </>}  <strong>{result.author}</strong>.
                                 </p>
                              </div>
                           </div>
                        )
                     })}

                     {results.data.length === 0 &&
                        <div>
                           <p>Nenhum resultado para <strong>{results.query}.</strong></p>
                        </div>
                     }
                     {results.data.length === 25 &&
                        <div className="pt-2">
                           <p className="text-sm text-[#7a7a7a]">O termo "<strong>{results.query}</strong>" pode ser muito genérico. Para um melhor resultado, refine sua busca. Ex: "Hino 1" ou "Hino Cristo meu Mestre" ou até "meu Mestre".</p>
                        </div>
                     }
                  </div>
               </div>
            }
         </div>
      </section>
   )
}