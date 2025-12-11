import { Cifra } from "@/features/cifra/cifraBody/components/cifra";
import { YoutubeVideo } from "@/features/cifra/cifraBody/components/youtubeVideo";
import { CifraHeader } from "@/features/cifra/cifraHeader/cifraHeader";
import { CifraOptionsAside } from "@/features/cifra/cifraOptionsAside/cifraOptionsAside";
import { getCifra } from "@/lib/services/getCifra";
import { getListToStaticParams } from "@/lib/services/getListToStaticParams";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface CifraPageProps {
   params: Promise<{ title: string }>;
}

export const revalidate = 2592000; // Revalidate every 30 days

export async function generateStaticParams() {

   const cifrasList = await getListToStaticParams();

   if (!cifrasList) return [];

   return cifrasList.cifrasTitlesList.map(item => ({
      title: item.title.replaceAll(':', ''),
      author: item.album
   }));
}

export async function generateMetadata({ params }: CifraPageProps): Promise<Metadata> {
   const { title } = await params;
   const hymn = await getCifra(title);

   return {
      title: hymn ? `Cifra do hino ${hymn.type === 'hinario' ? `${hymn.number} -` : 'avulso '} ${hymn.title} | CCB Cifras` : 'Hino não encontrado',
      description: hymn ? `Aprenda e toque a cifra do hino ${hymn.type === 'hinario' ? `${hymn.number}-` : 'avulso '}${hymn.title} da Congregação Cristã no Brasil no CCB Cifras.` : '',

      openGraph: {
         title: hymn ? `Cifra do hino ${hymn.type === 'hinario' ? `${hymn.number} -` : 'avulso '} CCB ${hymn.title}` : 'Hino não encontrado',
         description: hymn ? `Aprenda e toque a cifra do hino ${hymn.type === 'hinario' ? `${hymn.number}-` : 'avulso '}${hymn.title} da Congregação Cristã no Brasil no CCB Cifras.` : '',
         url: hymn ? `https://ccbcifras.com/albuns/${hymn.album}/${hymn.sanitized_title}` : 'https://ccbcifras.com/albuns',
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
         title: hymn ? `Cifra do hino ${hymn.type === 'hinario' ? `${hymn.number} -` : 'avulso '} ${hymn.title}` : 'Hino não encontrado',
         description:hymn ? `Aprenda e toque a cifra do hino ${hymn.type === 'hinario' ? `${hymn.number}-` : 'avulso '}${hymn.title} da Congregação Cristã no Brasil no CCB Cifras.` : '',
         images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`],
      },

      robots: {
         follow: true,
         index: true
      }
   }
}

export default async function CifraPage({ params }: CifraPageProps) {

   const { title } = await params;

   const hymn = await getCifra(title);

   if (!hymn) return (
      <div className="flex w-full h-[80vh] items-center justify-center p-2">
         <div className="flex flex-col gap-2 items-center">
            <div className="w-fit">
               <Image src={'/images/oops-notfound-page.png'} width={250} height={70} alt="Oops - cifra não encontrada | CCB Cifras" />
            </div>
            <div className="flex flex-col items-center gap-3 text-[#3b3b3b] pb-2">
               <h2 className="md:text-lg font-semibold text-sm">Cifra não encrontrada.</h2>
               <p className="-mt-4 text-[#686868] text-xs md:text-sm">A cifra "<strong>{title}</strong>" não foi encontrada ou não existe.</p>
               <Link href={'/albuns'} className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 mt-1 w-fit rounded-md text-white'>
                  <span>Voltar para página de álbuns</span>
                  <OpenInNewIcon sx={{ fontSize: 16 }} />
               </Link>
            </div>
         </div>
      </div>
   );

   return (
      <>
         <div className="flex flex-col lg:max-w-[1224px] lg:m-auto  px-2  max-w-[100vw] overflow-hidden">
            <CifraHeader hymn={hymn} />
            <div className="flex flex-row justify-between flex-wrap w-full">
               <div className="flex flex-row w-fit gap-3 flex-[1_auto] flex-wrap py-2">
                  <CifraOptionsAside />
                  <Cifra hymn={hymn} />
               </div>
               {hymn.video &&
                  <YoutubeVideo video={hymn.video} />
               }
            </div>
            <hr className="my-2 mt-3 text-gray-300 max-w-[98vw]" />
            <div className="relative flex flex-row gap-2 p-3 bg-purple-100 text-purple-950 rounded-md shadow-[0px_1px_18px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden">
               <div className="-mt-3 -ml-3 mr-3">
                  <span className="absolute block bg-gradient-to-t from-[#004aad] to-[#cb6ce6] w-3 h-full"></span>
               </div>
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 z-2">
                  <div>
                     <h3 className="font-semibold text-sm sm:text-lg mb-1">Há algo de errado na cifra?</h3>
                     <p className="text-xs sm:text-sm">
                        Se você encontrar qualquer erro na cifra, seja em acordes, letra, posições ou qualquer outro detalhe, por favor, entre em contato. Sua ajuda é muito importante para manter tudo correto e atualizado!.
                     </p>
                  </div>
                  <Link href={'/contato'} className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 min-w-45 w-fit h-fit rounded-md text-white'>
                     <span>Enivar mensagem</span>
                     <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </Link>
               </div>
            </div>
            <hr className="my-2 text-gray-300 max-w-[98vw]" />
         </div>
      </>
   );
}