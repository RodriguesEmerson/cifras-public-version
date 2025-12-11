'use client';

import { Dispatch, RefObject, SetStateAction } from "react";

/**
 * Custom hook to detect clicks outside of a given modal element.
 * 
 * This hook listens for `mousedown` events on the document and closes
 * the modal if the user clicks outside of it. It also prevents closing
 * if the user clicks on the button that toggles the same modal.
 *
 * @param modalRef - A React ref pointing to the modal DOM element.
 * @param setIsOpen - State setter to control the modal's open/close state.
 * 
 * @returns An object with a `setClickOutSide` method to start listening for outside clicks.
 *
 * @example
 * const modalRef = useRef<HTMLDivElement | null>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * const { setClickOutSide } = useClickOutside(modalRef, setIsOpen);
 * 
 */

export function useClickOutside(
   modalRef: RefObject<HTMLElement | null>,
   setIsOpen: Dispatch<SetStateAction<boolean>>,
) {
   /**
    * Handles click events and determines if the user clicked outside the modal.
    * 
    * @param e - The mouse event triggered by user interaction.
    */
   function onClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!(target instanceof Element)) return;
      const isModal = target.closest('.modal');
      const isOpenModalButton = target.closest('.open-modal-button');
      const isBTag = target.tagName === 'B';
      
      if (modalRef?.current) {
         const modalId = modalRef.current.getAttribute('modalref-id');
         document.removeEventListener('mousedown', onClickOutside);

         //Avoid to close the chord modal when another chord is clicked
         if((modalId === 'chord-modal' && isBTag) || isModal){
            document.addEventListener('mousedown', onClickOutside);
            return;
         }
         
         if (isOpenModalButton) {
            const buttonId = isOpenModalButton.getAttribute('modalref-id');
            if (modalId == buttonId) return;
         }
         return setIsOpen(false);
      }

      return document.removeEventListener('mousedown', onClickOutside);
   }

   /**
    * Enables the outside click detection by attaching the event listener.
    */
   function setClickOutSide() {
      document.addEventListener('mousedown', onClickOutside);
   }

   return { setClickOutSide }
}

