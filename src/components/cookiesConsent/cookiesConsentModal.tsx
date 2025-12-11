'use client'

import { useCookiesConsentContext } from '@/globalContexts/cookiesConsentContext';
import { useGlobalModalsVisibility } from '@/globalContexts/globalModalsVisibility';
import { TypesValidators } from '@/lib/utils/typesValidators';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Switch } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

type CookiesConsentDataType = {
   necessariesCookies: boolean;
   youtubeCookies: boolean;
   analyticsCookies: boolean;
   timestamp: number;
}

export function CookiesConsentModal() {
   const cookiesConcentKeys = ['necessariesCookies', 'youtubeCookies', 'analyticsCookies', 'timestamp'];
   const isCookiesConsentModalVisible = useGlobalModalsVisibility(state => state.isCookiesConsentModalVisible)
   const setIsCookiesConsentModalVisibility = useGlobalModalsVisibility(state => state.setIsCookiesConsentModalVisibility);
   const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
   const setCookiesConsent = useCookiesConsentContext(state => state.setCookiesConsent);
   const [cookiesConsentData, setCookiesConsentData] = useState<CookiesConsentDataType>(
      { necessariesCookies: true, youtubeCookies: false, analyticsCookies: false, timestamp: 0 }
   );

   const todaytimestamp = new Date().getTime();
   const ms90days = 7776000000;

   useEffect(() => {
      try {
         const typesValidators = new TypesValidators();
         const consent = localStorage.getItem('cookiesConcent');
         if (!consent) return setIsCookiesConsentModalVisibility(true);

         const consentParsed: CookiesConsentDataType = JSON.parse(consent);

         Object.keys(consentParsed).map(key => {
            if (!cookiesConcentKeys.includes(key)) {
               return setIsCookiesConsentModalVisibility(true);
            }
         })

         typesValidators.validateBoolean('', consentParsed.necessariesCookies, true);
         typesValidators.validateBoolean('', consentParsed.youtubeCookies, true);
         typesValidators.validateBoolean('', consentParsed.analyticsCookies, true);
         typesValidators.validateNumber('', consentParsed.timestamp, true);

         if (consentParsed.timestamp < todaytimestamp - ms90days) {
            if (!consentParsed.youtubeCookies || !consentParsed.analyticsCookies) {
               return setIsCookiesConsentModalVisibility(true);
            }
         }

         //Habilita o analytics se os cookies forem aceitos
         if (consentParsed.analyticsCookies) {
            window.gtag('consent', 'update', {
               analytics_storage: 'granted',
            });
            window.gtag('config', 'G-SZ0X87TQXZ');

         }else{
            //Desabilita o analytics se os cookies não forem aceitos
            window.gtag('consent', 'update', {
               analytics_storage: 'denied',
            });
   
            //Apaga todos os cookeis do analytics no navegador
            document.cookie.split(";").forEach(cookie => {
               const [name] = cookie.split("=");
   
               if (name.trim().startsWith("_ga") || name.trim().startsWith("_gid")) {
                  document.cookie = name + "=; Max-Age=0; path=/;";
               }
            });

         }
         setCookiesConsent(consentParsed);
      } catch (e) {
         setIsCookiesConsentModalVisibility(true);
      }
   }, [isCookiesConsentModalVisible]);

   function saveCookiesConsent(cookiesConsent: CookiesConsentDataType) {
      localStorage.setItem('cookiesConcent', JSON.stringify(cookiesConsent));
      setCookiesConsent(cookiesConsent);
   }

   function handleCookiesConsent(whichCookies: 'all' | 'essentials' | 'definedByUser') {
      switch (whichCookies) {
         case 'all':
            saveCookiesConsent(
               { necessariesCookies: true, youtubeCookies: true, analyticsCookies: true, timestamp: todaytimestamp }
            );
            break;
         case 'essentials':
            saveCookiesConsent(
               { necessariesCookies: true, youtubeCookies: false, analyticsCookies: false, timestamp: todaytimestamp }
            );
            break;
         case 'definedByUser':
            saveCookiesConsent({ ...cookiesConsentData, timestamp: todaytimestamp });
            break;
      }
      setIsCookiesConsentModalVisibility(false);
   }

   if (!isCookiesConsentModalVisible) return;
   return (
      <section
         className="fixed bottom-5 z-100 w-full pointer-events-none"
      >
         <div className="w-fit flex flex-col gap-2 max-w-[95%] rounded-md h-fit bg-white m-auto pointer-events-auto p-2 shadow-[0px_0px_30px_0px_rgba(0,_0,_0,_0.3)]">
            <div className='flex flex-row items-center justify-center'>
               <h2 className="text-sm text-center"><strong>Para melhorar sua experiência</strong>, nós utilizamos cookies.</h2>
            </div>
            <p className="text-xs">
               Alguns cookies são essenciais para o funcionamento do site, enquanto outros nos ajudam a entender como você interage com o conteúdo, personalizar sua navegação e oferecer recursos de terceiros, como vídeos incorporados ou serviços de análise.

               Você pode escolher aceitar ou recusar os cookies não essenciais. Ao continuar navegando, você concorda com o uso dos cookies necessários para o funcionamento básico do site. Para saber mais sobre como tratamos seus dados, consulte nossa <Link href={'/politica-de-privacidade'} className="text-blue-700">Política de Privacidade</Link>.
            </p>
            <div className="text-sm">
               <button className='cursor-pointer' onClick={() => setIsConfigOpen(!isConfigOpen)}>
                  <span>Definir cookies</span>
                  <ExpandMoreIcon />
               </button>
               <div className={`flex min-[600px]:flex-row flex-col flex-[1_1] min-[600px]:items-center justify-between gap-2 overflow-hidden px-2 transition-all ${isConfigOpen ? 'h-fit border border-[var(--border-color)] rounded-md p-2  ' : 'h-0'}`}
               >
                  <ul className="flex flex-row flex-wrap gap-2 w-fit">
                     <li>
                        <div className="flex flex-row items-center w-fit">
                           <Switch
                              color="secondary"
                              defaultChecked
                              disabled
                              size="small"
                              onClick={() =>
                                 setCookiesConsentData(
                                    { ...cookiesConsentData, necessariesCookies: true }
                                 )
                              }
                           />
                           <h4>Cookies Essenciais</h4>
                        </div>
                        <p className="text-xs pl-2">Essencias para o funcionamento correto do site.</p>
                     </li>
                     <li>
                        <div className="flex flex-row items-center w-fit">
                           <Switch
                              color="secondary"
                              size="small"
                              onClick={() =>
                                 setCookiesConsentData(
                                    { ...cookiesConsentData, youtubeCookies: !cookiesConsentData.youtubeCookies }
                                 )
                              }
                           />
                           <h4>Cookies do YouTube</h4>
                        </div>
                        <p className="text-xs pl-2">É necessário ativá-los para exibir os vídeos ao lado das cifras.</p>
                     </li>
                     <li>
                        <div className="flex flex-row items-center w-fit">
                           <Switch
                              color="secondary"
                              size="small"
                              onClick={() =>
                                 setCookiesConsentData(
                                    { ...cookiesConsentData, analyticsCookies: !cookiesConsentData.analyticsCookies }
                                 )
                              }
                           />
                           <h4>Cookies de Desempenho</h4>
                        </div>
                        <p className="text-xs pl-2">Utilizados para analisar o uso do site e melhorar sua experiência.</p>
                     </li>
                  </ul>
                  <button
                     className="leading-8 h-10 min-w-35 w-fit text-center text-sm rounded-md hover:brightness-90 transition-all bg-purple-900 text-white max-[390px]:w-full px-2 py-1 cursor-pointer"
                     onClick={() => handleCookiesConsent('definedByUser')}
                  >
                     Salvar preferências
                  </button>
               </div>
            </div>
            <div className="flex flex-row flex-wrap gap-2 w-fit m-auto justify-center">
               <button
                  className="leading-8 h-10 w-62 min-w-62 text-center text-sm rounded-md hover:brightness-90 transition-all bg-gradient-to-r from-fuchsia-700 to-indigo-700 text-white max-[390px]:w-full px-2 py-1 cursor-pointer"
                  onClick={() => handleCookiesConsent('all')}
               >
                  Aceitar todos e otimizar experiência
               </button>
               <div className='text-center  w-62 min-w-62 max-[390px]:w-full'>
                  <button
                     className="leading-7 h-10 w-full text-center text-sm rounded-md hover:brightness-90 transition-all text-red-700 border border-red-700 bg-white  px-2 py-1 cursor-pointer"
                     onClick={() => handleCookiesConsent('essentials')}
                  >
                     Aceitar apenas cookeies essenciais
                  </button>
                  <p className='text-xs text-center'>Alguns recursos podem ficar indisponíveis</p>
               </div>
            </div>
         </div>
      </section>
   )
}