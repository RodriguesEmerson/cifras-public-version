import { getCachedAuthors } from "@/lib/services/authorsGetter";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 864000; // Revalidate every 10 days

export async function generateMetadata(): Promise<Metadata> {

   return {
      title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil - CCB Cifras',
      description: 'Explore as cifras e letras dos hinos da CCB. Encontre rapidamente hinos do hinário, avulsos e os mais acessados.',

      openGraph: {
         title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil | CCB Cifras',
         description: 'Explore as cifras e letras dos hinos da CCB. Encontre rapidamente hinos do hinário, avulsos e os mais acessados.',
         url: "https://ccbcifras.com/albuns",
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
         description: 'Explore as cifras e letras dos hinos da CCB. Encontre rapidamente hinos do hinário, avulsos e os mais acessados.',
         images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`,],
      },

      robots: {
         follow: true,
         index: true
      }
   }
}

export default async function AlbunsPage() {
   const authors = await getCachedAuthors();

   if (!authors) return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center">
         <div className="w-fit">
            <Image src={'/images/oops-notfound-page.png'} width={250} height={70} alt="Oops - cifra não encontrada | CCB Cifras" />
         </div>
         <p>Não foi possível carregar a página corretamente</p>
         <p><strong>Atualize a página</strong></p>
      </div>
   );
   return (
      <>
         <div className="flex flex-col lg:max-w-[1224px] m-auto min-h-[86vh] px-2 max-w-[100vw]">
            <section className="flex flex-col gap-5 items-center justify-center w-full">
               <div className="relative flex flex-row gap-2 p-3 bg-purple-100 text-purple-950 rounded-md shadow-[0px_1px_18px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden">
                  <div className="-mt-3 -ml-3 mr-3">
                     <span className="absolute block bg-gradient-to-t from-[#004aad] to-[#cb6ce6] w-3 h-full"></span>
                  </div>
                  <div className="z-2">
                     <h1 className="font-semibold text-sm sm:text-lg mb-1">Aprenda e toque os seus hinos favoritos!</h1>
                     <p className="text-xs sm:text-sm">
                        Nesta seção, você encontrará uma lista especial de autores do nosso acervo de cifras do hinário e dos hinos avulsos da Congregação Cristã no Brasil. Cada autor, com dedicação e amor, busca o mesmo propósito: <strong>louvar a Deus e expressar seus sentimentos por meio de letras, melodias e harmonias que tocam a alma</strong>.
                     </p>
                  </div>
               </div>
               <div className="relative w-full flex-[1_1] border-t border-t-[var(--border-color)] py-2">
                  <ul>
                     <li>
                        <Link
                           href={`/albuns/todas`}
                           className="group min-w-50 hover:bg-[#7008d21b] hover:text-[#5f08b1] transition-all h-17 leading-8 p-1 px-2  rounded-md w-full flex flex-row gap-1 md:gap-3 items-center"
                        >
                           <div className="h-14 w-14 bg-gradient-to-r from-[#004aad] to-[#cb6ce6] rounded-[50%_50%_10%_50%] overflow-hidden">
                              <Image src={`/images/ccb-logo-icon.png`} width={56} height={56} alt={`Ícone do CCB Cifras`} />
                           </div>
                           <div className="flex flex-col justify-center gap-0 text-[var(--text-main-color)]">
                              <p className="h-5 leading-5 font-semibold">
                                 Todas as cifras
                              </p>
                              <span className="h-5 leading-5 text-xs sm:text-sm">Todas as cifras disponíveis no CCB Cifras</span>
                           </div>
                        </Link>
                     </li>
                     {authors.map(author => (
                        <li key={author.name}>
                           <Link
                              href={`/albuns/${author.sanitized_name}`}
                              className="group min-w-50 hover:bg-[#7008d21b] hover:text-[#5f08b1] transition-all h-17 leading-8 p-1 px-2  rounded-md w-full flex flex-row gap-1 md:gap-3 items-center"
                           >
                              <div className="h-14 w-14 bg-purple-800 rounded-[50%_50%_10%_50%] overflow-hidden">
                                 <Image src={`/images/authors/${author.image}.avif`} width={56} height={56} alt={`Cifras CCB compostas por ${author.name}`} />
                              </div>
                              <div className="flex flex-col justify-center gap-0 text-[var(--text-main-color)]">
                                 <p className="h-5 leading-5 font-semibold">
                                    {author.name === "CCB" ? "Hinário" : author.name}
                                 </p>
                                 <span className="h-5 leading-5 text-xs sm:text-sm">{`${author.total_cifras} cifras`}</span>
                              </div>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </section>
         </div>
      </>
   );
}