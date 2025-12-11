import { MostViewdList } from "@/features/home/components/mostViewedList";
import { getCachedAuthors } from "@/lib/services/authorsGetter";
import { getCachedLastAddedCifras } from "@/lib/services/getLastAddedCifras";
import { getCachedMostViewedCifras } from "@/lib/services/getMostViewedCifras";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Image from "next/image";
import Link from "next/link";

export const revalidate = 864000; // Revalidate every 10 days

export async function generateMetadata() {

   return {
      title: 'Site de Cifras e Letras dos hinos da CCB',
      description: 'Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB.',

      openGraph: {
         title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil | CCB Cifras',
         description: 'Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB.',
         url: "https://ccbcifras.com",
         siteName: "CCB Cifras",
         images: [
            {
               url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`,
               width: 210,
               height: 210,
               alt: "Prévia do Site",
            },
         ],
         locale: "pt_BR",
         type: "website",
      },

      twitter: {
         card: "summary_large_image",
         title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil | CCB Cifras',
         description: 'Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB.',
         images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`],
      },

      robots: {
         follow: true,
         index: true
      }
   }
}

export default async function Home() {
   const [mostViewdCifras, mostViewdAuthors, lastAddedCifras] = await Promise.all([
      getCachedMostViewedCifras(), 
      getCachedAuthors(), 
      getCachedLastAddedCifras()
   ])

   if (!mostViewdCifras || !lastAddedCifras) return;

   return (
      <div className="flex flex-col gap-7 lg:max-w-[1450px] lg:m-auto  px-2  max-w-[100vw] overflow-hidden">

         {/* Banner */}
         <div className="relative flex flex-row items-center max-[400px]:items-end justify-center h-52 sm:h-65 w-full md:w-[85%] overflow-hidden m-auto text-white bg-[#06182e] rounded-md p-2">
            <div className="absolute w-full bottom-0 overflow-hidden opacity-50">
               <Image className="object-bottom object-cover" src={'/images/banner.png'} width={2110} height={640} alt="Cifras CCB - banner" priority/>
            </div>
            <div className="max-w-[70%] z-10">
               <h1 className="text-sm sm:text-xl lg:text-2xl font-semibold text-shadow-sm shadow-black mb-3">
                  Cifras e Letras dos Hinos da Congregação Cristã no Brasil - CCB
               </h1>
               <p className="text-xs sm:text-sm font-thin">
                  Explore as cifras e letras dos hinos do hinário e de hinos avulsos da CCB de forma simples e fiel. No CCB Cifras, você encontra todos os hinos da Congregação Cristã no Brasil, sempre organizados e prontos para aprender, tocar e cantar.
               </p>
            </div>
         </div>

         {/* Barra com Link para página Cifras */}
         <div className="flex items-center px-2 h-12 w-full md:w-[85%] m-auto bg-gray-300 rounded-md">
            <div className="w-full">
               <Link
                  href={'/albuns/todas'}
                  className="block h-8 w-50 leading-8 text-center rounded-md hover:brightness-90 transition-all bg-gradient-to-r from-fuchsia-700 to-indigo-700 text-white max-[400px]:w-full"
               ><span>Ver todas as cifras</span> <OpenInNewIcon sx={{ fontSize: 16 }} /></Link>
            </div>
         </div>

         {/* Seção com cifras mais acessadas */}
         <section className="w-full md:w-[85%] m-auto text-[var(--text-main-color)]">

            <h2 className="text-xl sm:text-2xl font-semibold">Cifras CCB mais acessadas</h2>

            <div className="flex flex-row flex-wrap sm:flex-col lg:flex-row gap-2">
               {/* 10 cifras mais vistas */}
               <MostViewdList mostViewdCifras={mostViewdCifras} />

               {/* 5 albuns mais vistos */}
               <div className="relative w-full flex-[1_1]">
                  <h2 className="font-semibold mb-2 border-b border-b-[var(--border-color)]">Álbuns de cifras</h2>
                  <ul>
                     {mostViewdAuthors?.map(author => (
                        <li key={author.name}>
                           <Link
                              href={`albuns/${author.sanitized_name}`}
                              className="group min-w-50 hover:bg-[#7008d21b] hover:text-[#5f08b1] transition-all h-17 leading-8 p-1 px-2  rounded-md w-full flex flex-row gap-1 md:gap-3 items-center"
                           >
                              <div className="h-14 w-14 bg-purple-800 rounded-[50%_50%_10%_50%] overflow-hidden">
                                 <Image src={`/images/authors/${author.image}.avif`} width={56} height={56} alt={`Cifras CCB compostas por ${author.name}`} />
                              </div>
                              <div className="flex flex-col justify-center gap-0 text-[var(--text-main-color)]">
                                 <p className="h-5 leading-5 font-semibold">
                                    {author.name === "CCB" ? "Hinário" : author.name}
                                 </p>
                                 <span className="h-5 leading-5 text-sm">{`${author.total_cifras} cifras`}</span>
                              </div>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </section>
         <section className="w-full md:w-[85%] m-auto text-[var(--text-main-color)]">
            <hr className="border-[var(--border-color)]  mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold">Últimas Cifras adicionadas</h2>

            <div className="flex flex-row flex-wrap sm:flex-col lg:flex-row gap-2">
               {/*Últimas 10 cifras adicionadas */}
               <MostViewdList mostViewdCifras={lastAddedCifras.reverse()} />
            </div>

            <div className="relative flex flex-row gap-2 p-3 bg-purple-100 text-purple-950 rounded-md shadow-[0px_1px_18px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden mt-10">
               <div className="-mt-3 -ml-3 mr-3">
                  <span className="absolute block bg-gradient-to-t from-[#004aad] to-[#cb6ce6] w-3 h-full"></span>
               </div>
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 z-2">
                  <div>
                     <h3 className="font-semibold text-sm sm:text-lg mb-1">Quando serão adicionadas novas cifras?</h3>
                     <p className="text-xs sm:text-sm">
                        Estamos em constante expansão do nosso acervo de cifras da Congregação Cristã no Brasil (CCB), adicionando novas cifras de hinos avulsos regularmente para oferecer um conteúdo cada vez mais completo. As cifras do hinário já estão todas disponíveis. Sinta-se convidado a retornar sempre que desejar e acompanhar as atualizações.
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
