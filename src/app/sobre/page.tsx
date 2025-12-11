import Link from "next/link";

export default function PageSobre() {
   return (
      <section className="flex flex-col gap-3 md:w-[85%] max-w-[1024px] m-auto w-full p-2 text-sm sm:text-base">
         <h1 className="text-2xl font-semibold">Sobre o CCB Cifras</h1>
         <p>Cifras e letras dos hinos da Congregação Cristã no Brasil, organizadas para estudo, ensaio e adoração.</p>
         <p>
            Projeto independente • Sem vínculo institucional com a Congregação Cristã no Brasil (CCB)
         </p>

         <div>
            <h2 className="font-semibold">Missão</h2>
            <p>
               O <strong>CCB Cifras</strong> nasceu para facilitar o acesso às cifras e letras dos hinos usados nas reuniões, ajudando irmãos e irmãs a estudarem e praticarem a música congregacional.
               Nosso foco é oferecer um repositório simples, rápido e respeitoso, com prioridade para o uso pessoal e litúrgico.
            </p>
         </div>

         <div>
            <h2 className="font-semibold">Quem faz</h2>
            <p>
               O site é mantido por <Link className="text-blue-700 hover:underline" href={'https://www.linkedin.com/in/emerson-rodrigues-6274b5147/'} target="_blank" rel="noreferrer">Emerson Rodrigues</Link>, músico violinista e entusiasta de tecnologia, um projeto pessoal focado em disponibilizar cifras da CCB.
               Se quiser saber mais sobre o responsável pelo projeto, sugestões ou parcerias, veja a seção de contato abaixo.
            </p>
         </div>

         <div>
            <h2 className="font-semibold">O que você encontra aqui</h2>
            <ul>
               <li>Cifras e letras dos hinos (organizadas para estudo e prática).</li>
               <li>Vídeos incorporados do YouTube que complementam as cifras.</li>
               <li>Busca por título e filtros para facilitar encontrar o hino desejado.</li>
            </ul>
         </div>

         <div>
            <h2 className="font-semibold">Recursos atuais e planejados</h2>
            <ul>
               <li><span className="badge">Atual</span> Vídeos do YouTube incorporados via iframe (observe que o YouTube pode atuar com cookies de terceiros).</li>
               <li><span className="badge">Futuro</span> Sistema de login (autenticação via Facebook e outros provedores OAuth) para recursos pessoais.</li>
               <li><span className="badge">Futuro</span> Cookies proprietários para preferências de usuário e, possivelmente, anúncios (será informado na Política de Privacidade).</li>
            </ul>
            <p className="meta">Todas as implementações futuras seguirão transparência com o usuário e conformidade com a LGPD.</p>
         </div>

         <div>
            <h2 className="font-semibold">Direitos autorais e uso do conteúdo</h2>
            <p>
               As letras e cifras publicadas neste site são de propriedade da Congregação Cristã no Brasil (ou de seus titulares). O <strong>CCB Cifras</strong> é apenas um repositório independente que organiza esse material para fins de estudo e adoração.
               Caso exista alguma exigência de remoção ou correção de direitos autorais, por favor entre em contato informando a solicitação.
            </p>
         </div>

         <div>
            <h2 className="font-semibold">Como contribuir ou sugerir correções</h2>
            <p>
               Sua ajuda é bem-vinda. Se você percebeu um erro numa cifra, quer sugerir uma melhoria de organização ou tem outro tipo de contribuição, envie uma mensagem explicando a sugestão. Entre em contato <Link className="text-blue-700 hover:underline" href="/contato">clicando aqui</Link>.
            </p>
         </div>

         <div>
            <h2 className="font-semibold">Transparência e privacidade</h2>
            <p>
               Este site é independente e <strong>não tem vínculo institucional</strong> com a Congregação Cristã no Brasil. Para detalhes sobre tratamento de dados, cookies e notificações futuras sobre anúncios ou login social, consulte:
            </p>
            <p>
               <Link className="text-blue-700 hover:underline" href="/politica-de-privacidade">Política de Privacidade</Link> • <Link className="text-blue-700 hover:underline" href="/termos-de-uso">Termos de Uso</Link>
            </p>
         </div>
      </section>
   )
}