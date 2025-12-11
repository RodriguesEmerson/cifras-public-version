import { CifrasList } from "@/components/cifraList/cifraList";
import { getCachedAuthors } from "@/lib/services/authorsGetter";
import { getAllAlbumCifras } from "@/lib/services/getAllAlbumCifras";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 864000; // Revalidate every 10 days

export async function generateStaticParams() {

   const authors = await getCachedAuthors();
   if (!authors) return [];

   const allAuthorsPagesParams = [...authors, { sanitized_name: 'todas' }];
   return allAuthorsPagesParams
      .filter(author => author.sanitized_name !== undefined)
      .map(author => ({
         author: author.sanitized_name
      }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
   const { author } = await params;

   return {
      title: `Cifras dos hinos ${author === 'avulsos' ? 'Avulsos' : 'do Hinário 5'} da CCB | CCB Cifras`,
      description: `Aprenda, toque e cante cifras da Congregação Cristã no Brasil no CCB Cifras.`,

      openGraph: {
         title: `Cifras dos hinos ${author === 'avulsos' ? 'Avulsos' : 'do Hinário 5'} CCB | CCB Cifras`,
         description: `Aprenda, toque e cante cifras da Congregação Cristã no Brasil no CCB Cifras.`,
         url: `https://ccbcifras.com/albuns/${author}`,
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
         title: `Cifras dos hinos ${author === 'avulsos' ? 'Avulsos' : 'do Hinário 5'} CCB | CCB Cifras`,
         description: `Aprenda, toque e cante cifras da Congregação Cristã no Brasil no CCB Cifras.`,
         images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`],
      },

      robots: {
         follow: true,
         index: true
      }
   }
}

export default async function AuthorPage({ params }: { params: Promise<{ author: string }> }) {
   const { author } = await params;

   const authorCifras = await getAllAlbumCifras(author);

   if (!authorCifras) return (
      <div className="flex w-full h-[80vh] items-center justify-center p-2">
         <div className="flex flex-col gap-2 items-center">
            <div className="w-fit">
               <Image src={'/images/oops-notfound-page.png'} width={250} height={70} alt="Oops - cifra não encontrada | CCB Cifras" />
            </div>
            <div className="flex flex-col items-center gap-3 text-[#3b3b3b] pb-2">
               <h2 className="md:text-lg font-semibold text-sm">Álbum não encrontrado.</h2>
               <p className="-mt-4 text-[#686868] text-xs md:text-sm">Não foi encontrado nenhum álbum com o nome "<strong>{author}</strong>".</p>
               <Link href={'/albuns'} className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 mt-1 w-fit rounded-md text-white'>
                  <span>Voltar para página de álbuns</span>
                  <OpenInNewIcon sx={{ fontSize: 16 }} />
               </Link>
            </div>
         </div>
      </div>
   );

   const albumName = () => {
      const authorName = authorCifras.authorData.length > 0 ? authorCifras.authorData[0].name : 'Autor';
      return authorName === 'CCB' ? 'Hinário' : authorName;
   }


   return (
      <div className="flex flex-col lg:max-w-[1224px] m-auto px-1 max-w-[100vw] overflow-hidden">
         <div className="flex flex-row gap-2 items-center bg-purple-100 p-2 rounded-md mx-1 mb-2">
            <div className="h-14 w-14 bg-gradient-to-r from-[#004aad] to-[#cb6ce6] rounded-[50%_50%_10%_50%] overflow-hidden">
               <Image
                  src={`${author === 'todas' ? '/images/ccb-logo-icon.png' : `/images/authors/${authorCifras.authorData[0].image}.avif`}`}
                  width={56}
                  height={56}
                  alt={`Ícone do CCB Cifras`}
               />
            </div>
            <div>
               <h2 className="text-black text-sm sm:text-base">
                  Álbum: <strong>{author === 'todas' ? 'Todas as Cifras' : albumName()}</strong>
               </h2>
               <p className="text-xs opacity-70">Cifras oranizadas por mais vistas.</p>
            </div>
         </div>
         <section className="flex flex-row gap-3 w-full">
            <CifrasList
               mostViewedCifras={authorCifras}
               showOnlyOrderByFilter={author === 'todas' ? false : true}
               author={author}
            />
         </section>
      </div>
   )
}