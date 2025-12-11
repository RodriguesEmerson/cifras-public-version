import Image from "next/image";
import Link from "next/link";

export function Footer() {
   return (
      <footer className="text-[#8e8e8e] bg-[#202020] h-fit min-h-15 w-full mt-5 p-2 py-4 text-sm max-[640px]:pb-17">
         <div className="md:w-[85%] gap-2 max-w-[1024px] flex flex-col items-center flex-wrap m-auto">
            <div>
               <Image src={'/images/logo-CCBCifras-black.png'} width={150} height={30} alt="CCB Cifras - Cifras dos Hinos da Congregação Cristã no Brasil - logo" className="opacity-50"/>
            </div>
            <p className="text-center">Site de cifras dedicado à irmandade da Congregação Cristã no Brasil, reunindo cifras, letras e hinos avulsos. <Link className="hover:text-white transition-all underline" href={"/sobre"}>Saiba mais sobre o CCB Cifras</Link></p>
            <div className="text-center">
               <p>Ao usar este site você concorda com a nossa <Link className="hover:text-white transition-all underline" href={"/politica-de-privacidade"}>Política de Privacidade</Link> e os nossos <Link className="hover:text-white transition-all underline" href={"/termos-de-uso"}>Termos de uso</Link>.</p>
               <p>CCBCifras 2025 - Todos os direitos reservados.</p>
            </div>
         </div>
      </footer>
   )
}