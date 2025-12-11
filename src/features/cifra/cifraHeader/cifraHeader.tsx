import "@/features/cifra/cifraBody/style/musicPageStyle.css";
import { CifraType } from "@/types/cifraTypes";
import VerifiedIcon from '@mui/icons-material/Verified';
import Image from "next/image";

export function CifraHeader({ hymn }: { hymn: CifraType }) {
   return (
      <div className="flex flex-row gap-2 sm:gap-3 items-center sm:items-center p-2 border-b border-b-[var(--border-color)] mb-1">
         <div className="rounded-[50%_50%_10%_50%] min-w-17 h-17 max-w-23 max-h-23 w-17 sm:h-25 sm:w-25  bg-[var(--main-color)] overflow-hidden">
            <Image
               width={100}
               height={100}
               src={`/images/authors/${hymn.author_image ? hymn.author_image : hymn.sanitized_author_name}.avif`}
               alt={`Imagem do autor da cifra - ${hymn.author}`}
               className="h-full object-cover"
            />
         </div>
         <div className="flex flex-col gap-1 h-fit w-full">
            <h1 className="text-base sm:text-xl font-bold text-[var(--title-p-color)]">
               {`${hymn.title} ${hymn.type === "hinario" ? ` - hino ${hymn.number}` : ''}`}
            </h1>
            <div className="flex flex-row gap-1 items-center -mt-1 mb-1 text-xs sm:text-sm">
               <p>Composto por: <span className="font-semibold text-[var(--main-color)]">{hymn.author}</span></p>
               {hymn.is_verified && <VerifiedIcon sx={{ color: 'var(--main-color)', fontSize: 17 }} />}
            </div>
         </div>
      </div>
   )
}