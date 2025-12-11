

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
   label?: string;
   width?: 'xs' | 'small' | 'large' | 'mid' | 'xl' | 'full';
   textsize?: 'xs' | 'small' | 'large' | 'mid';
}



export function SimpleInputText({ label, width = 'full', textsize = 'small', ...props }: InputProps) {
   const sizes = {
      xs: 'w-12',
      small: 'w-20',
      mid: 'w-30',
      large: 'w-45',
      full: 'w-full',
      xl: 'w-67'
   }
   const textsizes = {
      xs: 'text-xs',
      small: 'text-sm',
      mid: 'text-base',
      large: 'text-lg',
   }

   return (
      <div className={`flex flex-col gap-0 ${sizes[width]}`}>
         {label &&
            <label className={`pl-1 ${textsizes[textsize]}`} htmlFor={`field-${label}`}>{label}</label>
         }
         <input
            className={`h-8 p-1 border border-gray-200 rounded-md ${sizes[width]}  focus-within:outline-purple-800 focus-within:outline-1 ${textsizes[textsize]} bg-white`}
            id={`field-${label}`}
            {...props}
         />
      </div>
   )
}
