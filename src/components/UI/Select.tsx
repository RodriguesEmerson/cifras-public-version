'use client'
import { useClickOutside } from '@/hooks/useClickOutside'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DoneIcon from '@mui/icons-material/Done'
import { memo, useRef, useState } from 'react'

type SelectProps = {
   options: { text: string, value: string }[];
   width: 'small' | 'mid' | 'large' | 'full' | 'fit';
   defaultOption?: number;
   name?: string;
   onClick: (value: string) => void;
}

/**
 * Select – A custom dropdown select component with animated toggle and visual feedback.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.options - Array of string options to display in the dropdown.
 * @param {'small' | 'mid' | 'large' | 'full'} [props.width='mid'] - Width size of the component.
 * Can be:
 * - `'small'`: `min-w-16 w-16`
 * - `'mid'`: `min-w-48 w-48` (default)
 * - `'large'`: `min-w-62 w-62`
 * - `'full'`: `w-full`
 * - `'fit'`: `w-fit`
 *
 * @example
 * <Select options={['Option 1', 'Option 2', 'Option 3']} width="large" />
 */
export const Select = memo(({ options, width = 'mid', defaultOption = 0, name, onClick }: SelectProps) =>  {
   const [isOpen, setIsOpen] = useState(false);
   const [current, setCurrent] = useState<string | null>(null);
   const defaultOptionIndex = defaultOption >= 0 ? defaultOption : 0;

   const sizes = {
      small: 'min-w-25 w-25',
      mid: 'min-w-40 w-40',
      large: 'min-w-62 w-62',
      full: 'w-full',
      fit: 'w-fit'
   }

   const selectModalRef = useRef<HTMLUListElement | null>(null);

   const clickOutside = useClickOutside(selectModalRef, setIsOpen);
   isOpen && clickOutside.setClickOutSide();

   return (
      <div
         className={`open-modal-button relative flex items-center justify-between h-8 border pl-2 text-sm text-[var(--text-secondary-color)] border-[var(--border-color)] rounded-md cursor-pointer min-w-16 ${sizes[width]} ${isOpen ? 'border-[var(--main-color)]' : ''}`}
         onClick={() => setIsOpen(!isOpen)}
         modalref-id={`select-${name ? name : options[0].value}`}
      >
         <p>{current ? current : options[defaultOptionIndex].text}</p>
         <ArrowDropDownIcon />
         <ul
            className={`modal absolute flex flex-col z-10 scale-0 origin-top-right right-0 top-8 p-2 px-3 overflow-hidden bg-white text-sm shadow-md shadow-gray-300 rounded-md border border-gray-200 transition-all ${isOpen && 'scale-100'} ${sizes[width]}`}
            modalref-id={`select-${name ? name : options[0].value}`}
            ref={selectModalRef}
         // onClick={(e) => e.stopPropagation()}
         >
            {options.map((option, index) => (
               <li
                  key={option.text}
                  className={`flex items-center justify-between h-7 hover:text-[var(--main-color)] ${(option.text === current) || (!current && index === defaultOptionIndex) ? 'text-[var(--main-color)]' : ''}`}
                  onClick={() => { setCurrent(option.text); onClick(option.value) }}
               >
                  <span>{option.text}</span>
                  {(option.text === current) || (!current && index === defaultOptionIndex)
                     ? <DoneIcon className="!text-base" />
                     : ''
                  }
               </li>
            ))}
         </ul>
      </div>
   )
})
