import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Image from "next/image";
import Link from "next/link";


export default function Custom404() {
   return (
      <div className="min-h-[87Vh] flex flex-col items-center justify-center">
         <div>
            <Image src={'/images/oops-notfound-page.png'} width={250} height={70} alt="CCB Cifras - Opps - página não encontrada" />
         </div>
         <div className="text-center">
            <p className="md:text-lg font-semibold text-sm">Erro 404 - Página não encontrada.</p>
            <p className="text-[#686868] text-xs md:text-sm">A página que você procura pode ter sido removida ou estar indisponível temporariamente.</p>
            <Link href={'/'} className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 m-auto mt-5 w-fit rounded-md text-white'>
               <span>Voltar para a página inicial</span>
               <OpenInNewIcon sx={{fontSize: 16}}/>
            </Link>
         </div>
      </div>
   )
}