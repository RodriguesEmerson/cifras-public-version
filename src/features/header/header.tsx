import { SearchArea } from "@/components/searchArea/searchArea";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./menu";
import { MenuMobile } from "./menuMobile";

export function Header() {
   return (
      <header className="h-15 mb-5 w-full border-b border-b-gray-300 bg-gradient-to-r from-violet-800 to-purple-900 z-20">
         <div className="flex items-center justify-between h-full lg:max-w-[1224px] lg:m-auto  px-2  max-w-[100vw] overflow-hidden">
            <div className="w-fit flex flex-row items-center gap-2">
               <div>
                  <Link href={'/'} aria-label="Página inicial - CCB Cifras">
                     <Image className="sm:min-w-35" src={'/images/CCBCifras-logo.png'} width={150} height={30} alt="logo - CCB Cifras - site de Cifras CCB" blurDataURL="/images/logo-CCBCifras.png" />
                  </Link>
               </div>
               <SearchArea />
            </div>
            <Menu />
            <MenuMobile />
         </div>
      </header>
   )
}