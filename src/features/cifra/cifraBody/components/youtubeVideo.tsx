'use client';
import { useCookiesConsentContext } from "@/globalContexts/cookiesConsentContext";
import { useGlobalModalsVisibility } from "@/globalContexts/globalModalsVisibility";
import { YoutubeVideoType } from "@/types/YouTubeTypes";
import { YouTube } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export function YoutubeVideo({ video }: { video: YoutubeVideoType }) {
   const playerRef = useRef<YT.Player | null>(null);
   const [videoLoaded, setVideoLoaded] = useState<boolean | 'Error' | 'cookiesNotAllowed'>(false);
   const cookiesConsent = useCookiesConsentContext(state => state.cookiesConsent);
   const setIsCookiesConsentModalVisibility = useGlobalModalsVisibility(state => state.setIsCookiesConsentModalVisibility);
   if (!video) return;

   useEffect(() => {
      if(!cookiesConsent?.youtubeCookies) return setVideoLoaded('cookiesNotAllowed');
      setVideoLoaded(false);

      const initPlayer = (videoId: string) => {
         try {
            playerRef.current = new window.YT.Player('player', {
               height: 160,
               width: 290,
               videoId: videoId,

               events: {
                  onReady: () => {
                     setVideoLoaded(true);
                  },
                  onError: (e) => {
                     setVideoLoaded('Error');
                  },
               }
            });
         } catch (e) {
            setVideoLoaded('Error')
         }
      }

      if (window.YT) {
         return initPlayer(video.id);
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => {
         initPlayer(video.id)
      }
   }, [cookiesConsent?.youtubeCookies])

   return (
      <div className="flex flex-col w-fit flex-[1] mt-2">
         {!videoLoaded && (
            <div className="flex flex-col mx-auto gap-1">
               <span className="w-50 h-5 bg-gray-300 animate-pulse rounded-md"></span>
               <span className={`w-[290px] h-[160px] bg-gray-300 animate-pulse rounded-md`}></span>
            </div>
         )}
         {(videoLoaded !== 'Error' && cookiesConsent?.youtubeCookies) &&
            <div className="flex flex-col mx-auto">
               {videoLoaded && (
                  <div className="flex flex-row gap-1 items-center pr-2">
                     <YouTube color="error" />
                     <span className="text-xs">Vídeo do canal: <span className="font-semibold">
                        {video.channelTitle.slice(0, 20)}{video.channelTitle.length > 20 ? '...' : ''}
                     </span></span>
                  </div>
               )}
               <div className={`w-[290px] h-[160px] text-xs overflow-hidden rounded-md bg-gray-300 opacity-0 ${videoLoaded ? 'opacity-100' : ''}`}>
                  <div id="player" />
               </div>
            </div>
         }
         {videoLoaded === 'Error' &&
            <div className={`flex items-center justify-center w-[290px] h-[160px] bg-gray-200  rounded-md`}>
               <p className="text-gray-500 p-2 text-sm">Não foi possível carregar o vídeo.</p>
            </div>
         }
         {videoLoaded === 'cookiesNotAllowed' &&
            <div className={`flex flex-col items-center justify-center w-[290px] h-[160px] bg-gray-200  rounded-md`}>
               <p className="text-gray-500 text-center p-2 text-xs">
                 Para reproduzir este vídeo, precisamos do seu consentimento para carregar conteúdo do YouTube. Habilite os cookies necessários para visualizá-lo.
               </p>
                <button
                  className="leading-8 h-10 w-62 min-w-62 text-center text-sm rounded-md hover:brightness-90 transition-all bg-gradient-to-r from-fuchsia-700 to-indigo-700 text-white max-[390px]:w-full px-2 py-1 cursor-pointer"
                  onClick={() => setIsCookiesConsentModalVisibility(true)}
               >
                  Habilitar Cookies
               </button>
            </div>
         }
      </div>
   )
}