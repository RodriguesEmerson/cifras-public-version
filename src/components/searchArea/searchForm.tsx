import SearchIcon from '@mui/icons-material/Search';
import { SimpleInputText } from '../UI/simpleInputText';

type SearchFormProps = {
   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   defaultText?: string;
}

export function SearchForm({ onSubmit, defaultText = '' }: SearchFormProps) {
   return (
      <div className="md:max-w-80 w-full  max-[370px]:min-w-49">
         <form
            className="flex flex-row gap-1"
            onSubmit={onSubmit}
         >
            <SimpleInputText type="text" name="q" placeholder="qual cifra você procura?" defaultValue={defaultText}/>
            <button type="submit" className="max-[440px]:w-10 w-15 h-8 bg-black text-white rounded-md cursor-pointer">
               <SearchIcon />
            </button>
         </form>
      </div>
   )
}