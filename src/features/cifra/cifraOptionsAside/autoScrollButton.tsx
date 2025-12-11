'use client';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRef, useState } from 'react';

type IntervalTimeType = 1 | 2 | 3 | 4 | 5 | 6;


export function AutoScrollButton() {
   const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
   const [intervalTime, setIntervalTime] = useState<IntervalTimeType>(1);
   const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

   const intervalTimeKeys = {
      '1': 100, '2': 80, '3': 60, '4': 40, '5': 20, '6': 10
   };

   function autoScroll(newTime: IntervalTimeType) {
      scrollInterval.current = setInterval(() => {
         const scrollHeight = document.body.scrollHeight;
         const currentScroll = window.scrollY;

         //Cleans the interval when gets at the end of the page.
         if ((currentScroll + window.innerHeight >= scrollHeight - 10) && scrollInterval.current) {
            clearInterval(scrollInterval.current);
            setIsAutoScrolling(false);
            return
         }

         window.scrollBy(0, 0.5);
      }, intervalTimeKeys[`${newTime}`]);
   }
   const handleControllIntervalTime = (action: 'increase' | 'decrease') => {
      let newTime = action === 'decrease' ? intervalTime - 1 : intervalTime + 1;
      newTime > 6 ? newTime = 6 : '';
      newTime < 1 ? newTime = 1 : '';

      if (scrollInterval.current) {
         clearInterval(scrollInterval.current);
      }
      setIntervalTime(newTime as IntervalTimeType);
      autoScroll(newTime as IntervalTimeType);

   }

   const handleAutoScroll = () => {
      if (!isAutoScrolling) {
         autoScroll(intervalTime);
         setIsAutoScrolling(true);
         return;
      }
      if (scrollInterval.current) {
         clearInterval(scrollInterval.current);
         setIsAutoScrolling(false);
      }
   }

   return (
      <div>
         <button
            className={`options-bar-button ${isAutoScrolling ? 'bg-black text-white border-black' : ''}`}
            onClick={() => handleAutoScroll()}
         >
            <KeyboardDoubleArrowDownIcon sx={{ fontSize: 16 }} />
            <span>Auto Rolagem</span>
         </button>
         {isAutoScrolling && (
            <div className='auto-scroll-control fixed bottom-18 left-4 flex flex-col shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] shadow-gray-300 rounded-md overflow-hidden border border-gray-300'>
               <div className='flex flex-row'>
                  <div className="flex flex-row items-center justify-between w-36 rounded-md bg-gray-200 text-white">
                     <button
                        className={`rounded-bl-md w-13 bg-[var(--main-color)] h-10 cursor-pointer transition-all`}
                        modalref-id="chords-modal"
                        onClick={() => { handleControllIntervalTime('decrease') }}
                     >
                        <RemoveIcon fontSize='small' />
                     </button>
                     <span className='text-base text-[var(--main-color)]'>{intervalTime}</span>
                     <button
                        className={` w-13 bg-[var(--main-color)] h-10 cursor-pointer  transition-all`}
                        modalref-id="chords-modal"
                        onClick={() => { handleControllIntervalTime('increase') }}
                     >
                        <AddIcon fontSize='small' />
                     </button>
                  </div>

                  <button
                     className='bg-black rounded-br-md w-13 text-white cursor-pointer'
                     onClick={() => handleAutoScroll()}
                  >
                     <CancelIcon />
                  </button>
               </div>
            </div>
         )}
      </div>

   )
}