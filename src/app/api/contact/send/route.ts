import { contactSchema } from "@/features/contato/schema/contactSchema";
import { validateCaptcha } from "@/lib/captcha/validateReCaptcha";
import { Resend } from 'resend';
import z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailHtmlModel = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato CCBCifras</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #6b46c1;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
    }
    .content p {
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .footer {
      background-color: #f4f4f7;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #999999;
    }
    .highlight {
      color: #6b46c1;
      font-weight: bold;
    }
    @media (max-width: 600px) {
      .container {
        width: 95%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      CCBCifras - Novo Contato
    </div>
    <div class="content">
      <p>Nome: <span class="highlight">{{name}}</span>,</p>
      <p>Mensagem recebida através do formulário de contato</p>
      <p><strong>Email:</strong> {{email}}</p>
      <p><strong>Assunto:</strong> {{subject}}</p>
      <p><strong>Mensagem:</strong></p>
      <p>{{message}}</p>
      <p>Atenciosamente,<br>Equipe CCBCifras</p>
    </div>
    <div class="footer">
    </div>
  </div>
</body>
</html>
`

export async function POST(req: Request) {
  if (req.method !== "POST") return Response.json({ ok: false, message: "Invalid method" }, { status: 400 });
  const body = await req.json();
  try {
    // Validate with zod. It is going to throw an error if is something wrong.
    const validetedBody = contactSchema.parse(body);

    if ((validetedBody.phone && validetedBody.phone.trim() !== "") || !validetedBody.captchaToken) {
      return Response.json({ ok: false, type: 'span', message: "Span" }, { status: 400 })
    }

    const isValidCaptcha = await validateCaptcha(validetedBody.captchaToken);
    if (!isValidCaptcha) {
      return Response.json({ ok: false, type: 'robot', message: 'Alta probabilidade de ser um robo' }, { status: 400 })
    }

    const emailHTML = emailHtmlModel
      .replace('{{name}}', `${validetedBody.name.replaceAll('<', '').replace('>', '')}`)
      .replace('{{email}}', `${validetedBody.email.replaceAll('<', '').replace('>', '')}`)
      .replace('{{subject}}', `${validetedBody.subject.replaceAll('<', '').replace('>', '')}`)
      .replace('{{message}}', `${validetedBody.message.replaceAll('<', '').replace('>', '')}`);

    const { data, error } = await resend.emails.send({
      from: 'consultarDOC@resend.dev', //Consutar DOC do Resend.
      to: 'email@domain.com',
      subject: 'Email do CCB Cifras',
      html: emailHTML
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ ok: true, message: `Email enviado` }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return Response.json({ ok: false, type: 'invalid fields', errors: e.issues }, { status: 400 });
    }

    return Response.json({ ok: false, type: 'server error', message: 'Erro interno' }, { status: 500 });
  }
}
