import { AutoScrollButton } from './autoScrollButton';
import { SharePageButton } from './sharePageButton';
export function CifraOptionsAside() {

   return (
      <div className={`cifra-options-bar`}>
         <AutoScrollButton />
         <SharePageButton />
      </div>
   )
}