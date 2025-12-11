import Link from "next/link";

export default function PagePolicyPrivacy() {
   return (
      <section className="flex flex-col gap-3 md:w-[85%] max-w-[1024px] m-auto w-full p-2 text-sm sm:text-base">
         <div>
            <h1 className="text-2xl font-semibold">Política de Privacidade</h1>
            <p><strong>Última atualização:</strong> 24 de outubro de 2025</p>
         </div>

         <p>O site <strong>CCB Cifras</strong> (acessível em <Link className="text-blue-700 hover:underline" href="https://ccbcifras.com" target="_blank">ccbcifras.com</Link>) é um projeto independente, sem vínculo institucional com a <strong>Congregação Cristã no Brasil (CCB)</strong>. Esta Política de Privacidade explica como os dados pessoais são coletados, usados e protegidos neste site. As letras e cifras publicadas neste site são de propriedade da Congregação Cristã no Brasil (ou de seus titulares). O <strong>CCB Cifras</strong> é apenas um repositório independente que organiza esse material para fins de estudo e adoração.</p>

         <div>
            <h2 className="font-semibold">1. Coleta de Dados</h2>
            <p>Atualmente, o site não coleta dados pessoais diretamente dos usuários. No entanto, futuramente poderá coletar informações por meio de:</p>
            <ul className="ml-4 list-disc">
               <li>Cadastro ou login via <strong>Facebook</strong> ou outros provedores OAuth;</li>
               <li>Cookies próprios, usados para lembrar preferências e melhorar a navegação;</li>
               <li>Formulários de contato ou sugestões.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">2. Cookies e Tecnologias Similares</h2>
            <p>O site utiliza <strong>cookies de terceiros</strong>, especialmente do <strong>YouTube</strong>, que podem coletar informações quando vídeos incorporados são reproduzidos.</p>
            <p>Futuramente, poderemos usar cookies próprios para:</p>
            <ul className="ml-4 list-disc">
               <li>Salvar preferências do usuário;</li>
               <li>Exibir anúncios personalizados;</li>
               <li>Analisar o tráfego e o desempenho do site.</li>
            </ul>
         </div>

         <p><i>O usuário pode gerenciar ou excluir cookies nas configurações do seu navegador.</i></p>

         <div>
            <h2 className="font-semibold">3. Finalidade do Uso de Dados</h2>
            <p>As informações coletadas serão utilizadas para:</p>
            <ul className="ml-4 list-disc">
               <li>Melhorar a experiência de navegação;</li>
               <li>Exibir anúncios e medir seu desempenho;</li>
               <li>Permitir login e personalização da conta;</li>
               <li>Garantir a segurança e o funcionamento adequado do site.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">4. Compartilhamento de Dados</h2>
            <p>Os dados poderão ser compartilhados com:</p>
            <ul className="ml-4 list-disc">
               <li>Serviços de autenticação (Facebook, Google, etc.);</li>
               <li>Serviços de análise e publicidade (Google Analytics, Google AdSense, etc.);</li>
               <li>Plataformas de vídeo (YouTube, por meio de iframes incorporados).</li>
            </ul>
         </div>

         <p><i>Não vendemos ou compartilhamos dados pessoais com terceiros fora dessas finalidades.</i></p>

         <div>
            <h2 className="font-semibold">5. Direitos do Usuário</h2>
            <p>De acordo com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>, o usuário pode solicitar:</p>
            <ul className="ml-4 list-disc">
               <li>Acesso aos seus dados;</li>
               <li>Correção ou exclusão de informações;</li>
               <li>Revogação de consentimento para uso de cookies ou login;</li>
               <li>Informações sobre o tratamento de seus dados.</li>
            </ul>
         </div>

         <p><i>Para exercer esses direitos, entre em contato.</i></p>

         <div>
            <h2 className="font-semibold">6. Segurança das Informações</h2>
            <ul className="ml-4 list-disc">
               <li>Os dados serão armazenados em ambiente seguro, com acesso restrito. Em logins via OAuth, o site não armazena senhas, apenas tokens criptografados fornecidos pelas plataformas.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">7. Alterações nesta Política</h2>
            <ul className="ml-4 list-disc">
               <li>Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">8. Contato</h2>
            <ul className="ml-4 list-disc">
               <li>Para dúvidas sobre privacidade, entre em contato <Link className="text-blue-700 hover:underline" href={'/contato'}>clicando aqui</Link>.</li>
            </ul>
         </div>
      </section>
   )
}