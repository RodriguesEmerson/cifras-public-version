'use client';
import { CompleteInputText } from "@/components/UI/completeInputText";
import { CompleteTextArea } from "@/components/UI/completeTextArea";
import { Spinner } from "@/components/UI/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import SendIcon from '@mui/icons-material/Send';
import Script from "next/script";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "../schema/contactSchema";

type ContactFormType = {
   name: string, email: string, subject: string, message: string
}

export function ContactForm() {
   const [isSending, setIsSending] = useState<boolean>(false);
   const [wasEmailSent, setwasEmailSent] = useState<'y' | 'n' | null>(null);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ContactFormType>({
      resolver: zodResolver(contactSchema),
   });

   async function handleSendMessage(data: ContactFormType) {
      setIsSending(true);
      grecaptcha.ready(() => {
         grecaptcha.execute(`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`, { action: 'submit' })
            .then(async (token) => {
               await fetch('/api/contact/send', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...data, captchaToken: token })
               }).then(async res => {
                  if (res.status === 200) {
                     setwasEmailSent('y');
                     return reset();
                  }
                  setwasEmailSent('n');

               }).catch(e => {
                  setwasEmailSent('n');
               })
               setIsSending(false);

            })
      })
   }

   return (
      <section>
         <form className="flex flex-col gap-1 w-full sm:w-100" onSubmit={handleSubmit(handleSendMessage)}>
            <CompleteInputText label="Nome" {...register('name')} error={errors.name} />
            <CompleteInputText label="Assunto" {...register('subject')} error={errors.subject} />
            <CompleteInputText label="E-mail" {...register('email')} error={errors.email} />
            <CompleteTextArea label="Mensagem" {...register('message')} error={errors.message} />
            <button type="submit" className='w-full flex flex-row gap-4 items-center justify-center bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-2 m-auto mt-5 rounded-md text-white hover:cursor-pointer'>
               <span>Enviar</span>
               {!isSending
                  ? <SendIcon sx={{ fontSize: 16 }} />
                  : <Spinner size="small" />
               }
            </button>
         </form>
         {wasEmailSent &&
            <div className="text-center">
               {wasEmailSent === 'y'
                  ? <span className="text-xs text-green-700">Mensagem enviada. Agradecemos seu contado!</span>
                  : <span className="text-xs text-red-800">Erro ao enviar sua mensagem.</span>
               }
            </div>
         }

         <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`} />
      </section>
   )
}