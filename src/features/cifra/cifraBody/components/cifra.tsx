'use client';
import "@/features/cifra/cifraBody/style/musicPageStyle.css";

import { CifraType } from "@/types/cifraTypes";

export function Cifra({ hymn }: { hymn: CifraType }) {
   return (
      <div className="flex flex-col gap-3 max-w-[100vw]">
            <>
               {hymn.capo &&
                  <div>
                     <p className="text-sm text-[var(--gray-text)]">Capotraste: <strong className="text-[var(--main-color)]">{hymn.capo}ª casa</strong></p>
                  </div>
               }
               <pre
                  className={`cifra p-2 cifra-descktop`}
                  dangerouslySetInnerHTML={{ __html: hymn.cifra }}
                  style={{ fontSize: `0.875rem` }}
               />
            </>
      </div>
   )
}