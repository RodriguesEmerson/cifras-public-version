import z from "zod";

const validsEmailProviders = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "yahoo.com",
  "yahoo.com.br",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "proton.me",
  "protonmail.com",
  "aol.com",
  "gmx.com",
  "zoho.com",
  "icloud.com",
  "me.com",
  "mac.com"
];
export const contactSchema = z.object({
   name: z.string()
      .regex(/^[^<>]*$/, { message: 'Não pode conter os caracteres < ou >' })
      .min(3, 'Mínimo 3 caracteres')
      .max(30, 'Máximo 30 caracteres'),
   email: z.email('Email inválido').refine(email => {
      const provider = email.split('@')[1];
      return validsEmailProviders.includes(provider);
   }, { message: "Domínio inválido! Insira um domínio vádio. Ex: gmail.com"}),
   message: z.string()
      .regex(/^[^<>]*$/, { message: 'Não pode conter os caracteres < ou >' })
      .min(20, 'Mínimo 20 caracteres')
      .max(500, 'Máximo 500 caracteres'),
   subject: z.string()
      .min(5, 'Mínimo 5 caracteres')
      .max(25, 'Máximo 25 caracteres'),
   phone: z.string().optional(),//honeypot
   captchaToken: z.string().optional()
});