import { Spinner } from "@/components/UI/Spinner";



export function ShowMoreBtn({ onClick, isFething }: { onClick: () => void, isFething: boolean }) {
   return (
      <button
         className='flex flex-row gap-1 items-center justify-center cursor-pointer h-8 w-45 text-[var(--main-color)] rounded-md'
         onClick={onClick}
      >
         {isFething
            ? <>
               <span>Buscando...</span>
               <Spinner size="small" />
            </>
            : <span>Mostrar mais Cifras</span>
         }
      </button>
   )

}