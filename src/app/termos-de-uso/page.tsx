import Link from "next/link";

export default function PageTermosDeUso() {
   return (
      <section className="flex flex-col gap-3 md:w-[85%] max-w-[1024px] m-auto w-full p-2 text-sm sm:text-base">
         <div>
            <h1 className="text-2xl font-semibold">Termos de Uso</h1>
            <p><strong>Última atualização:</strong> 24 de outubro de 2025</p>
         </div>

         <div>
            <h2 className="font-semibold">1. Aceitação dos Termos</h2>
            <p>Ao acessar o site <Link className="text-blue-700 hover:underline" href="https://ccbcifras.com" target="_blank">ccbcifras.com</Link>, você concorda com estes Termos de Uso e com a <Link className="text-blue-700 hover:underline" href={'/politica-de-privacidade'}>Política de Privacidade</Link>. Caso não concorde, pedimos que não utilize o site.</p>
         </div>

         <div>
            <h2 className="font-semibold">2. Descrição do Serviço</h2>
            <p>O <strong>CCB Cifras</strong> oferece cifras e letras dos hinos da Congregação Cristã no Brasil (CCB), além de vídeos incorporados do YouTube. Este site é um projeto independente, <strong>sem qualquer vínculo institucional</strong> com a Congregação Cristã no Brasil.</p>
         </div>

         <div>
            <h2 className="font-semibold">3. Uso Permitido</h2>
            <p>Você pode utilizar o conteúdo do site para fins pessoais e educacionais. É proibido:</p>
            <ul className="ml-4 list-disc">
               <li>Utilizar o site de forma que cause danos, sobrecarga ou comprometa seu funcionamento;</li>
               <li>Apresentar o conteúdo do site de forma que cause confusão com a Congregação Cristã no Brasil ou que indique vínculo oficial;</li>
               <li>Usar o site para fins ilegais, ofensivos ou contrários aos princípios cristãos.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">4. Propriedade Intelectual</h2>
            <p>O conteúdo, código e design do site pertencem ao <strong>CCB Cifras</strong>. As cifras e letras são disponibilizadas para estudo e uso pessoal, conforme previsto no art. 46 da Lei nº 9.610/98 (exceção de uso didático e sem fins comerciais).</p>
         </div>

         <div>
            <h2 className="font-semibold">5. Conteúdo de Terceiros</h2>
            <p>Os vídeos incorporados do YouTube são de responsabilidade dos canais que os publicaram. O CCB Cifras não hospeda vídeos nem controla os cookies usados por essas plataformas.</p>
         </div>

         <div>
            <h2 className="font-semibold">6. Login e Contas de Usuário (futuro)</h2>
            <p>Quando o sistema de login for implementado, o usuário poderá autenticar-se via Facebook ou outros provedores OAuth. Dados como nome e e-mail poderão ser armazenados com segurança. O usuário será responsável por manter sua conta segura.</p>
         </div>

         <div>
            <h2 className="font-semibold">7. Anúncios e Monetização (futuro)</h2>
            <p>O site poderá exibir anúncios ou parcerias que utilizem cookies de terceiros para personalização. O uso desses dados seguirá o que está descrito na Política de Privacidade.</p>
         </div>

         <div>
            <h2 className="font-semibold">8. Limitação de Responsabilidade</h2>
            <p>O CCB Cifras não garante a exatidão completa das cifras ou letras publicadas. O uso do conteúdo é de responsabilidade do usuário. Não nos responsabilizamos por danos resultantes do uso do site ou de links externos.</p>
         </div>

         <div>
            <h2 className="font-semibold">9. Alterações dos Termos</h2>
            <p>Os Termos de Uso podem ser atualizados periodicamente. A versão mais recente estará sempre disponível nesta página.</p>
         </div>

         <div>
            <h2 className="font-semibold">10. Lei Aplicável</h2>
            <p>Estes Termos são regidos pelas leis do Brasil.</p>
         </div>

         <div>
            <h2 className="font-semibold">11. Contato</h2>
            <ul className="ml-4 list-disc">
               <li>Para dúvidas sobre privacidade, entre em contato <Link className="text-blue-700 hover:underline" href={'/contato'}>clicando aqui</Link>.</li>
            </ul>
         </div>

      </section>
   )
}