import { ContactForm } from "@/features/contato/components/contactForm";
import Image from "next/image";

export default function PageContato() {
   return (
      <section className="flex flex-col gap-3 md:w-[85%] min-h-[87vh] max-w-[1024px] m-auto w-full p-2 text-sm sm:text-base">
         <h1 className="text-2xl font-semibold">Contato</h1>
         <p>Sua ajuda é bem-vinda. Se você percebeu um erro numa cifra, quer sugerir uma melhoria de organização ou tem outro tipo de contribuição, envie uma mensagem explicando a sugestão.</p>
         <div className="m-auto w-full">
            <div className="flex flex-col justify-between sm:flex-row gap-2 lg:gap-5 items-stretch sm:items-end mt-3">
               <ContactForm />
               <div className="w-full max-w-100 m-auto sm:m-0">
                  <Image src={'/images/contact.jpg'} width={626} height={626} alt="CCB Cifras - Imagem contato" />
               </div>
            </div>
         </div>
      </section>
   )
}