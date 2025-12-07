# 🎵 Projeto Cifras CCB - OBS: Versão pública, não é a mesma do deploy.

Um site moderno e otimizado para exibição de **cifras e hinos da Congregação Cristã no Brasil (CCB)**, desenvolvido com **Next.js**, **TypeScript** e **Firebase**.  
O foco do projeto é oferecer **velocidade, acessibilidade e clareza**, com páginas estáticas geradas no build para os hinos mais acessados e carregamento dinâmico para os demais.

---

## 🚀 Tecnologias principais

| Categoria | Tecnologias |
|------------|--------------|
| **Frontend** | Next.js 15 • TypeScript • Tailwind CSS |
| **Backend / Dados** | Firebase Admin SDK • Firestore |
| **SEO e Performance** | Static Site Generation (SSG) • Incremental Static Regeneration (ISR) • Metadata dinâmico |
| **Outros** | Markdown All in One (documentação) |

---

## 📂 Estrutura básica

src/  
├─ app/  
│ ├─ cifras/  
│ │ ├─ [title]/   
│ │ │ └─ page.tsx   `# Página individual de cada hino`  
│ │ └─ page.tsx     `# Página principal de listagem`  
│ └─ layout.tsx  `#layout principal`  
│ └─ page.tsx `# Página home`  
│    
├─ features/ #Partes(componentes) de cada página   
├─ lib/  
│ ├─ firebase/ #Conexão  
│ │ └─ admin.ts # Inicialização do Firebase Admin SDK  
│ ├─ redis/ #Upstash  
│ ├─ services/  
├─ globalContext/ #Zustand    
├─ hooks/  
├─ types/  

## 🧩 Metadados e SEO

Cada página de cifra gera automaticamente:
- **Título** e **descrição** personalizados  
- **Open Graph** (imagem, título, descrição) para compartilhamento  

Isso é feito nas funções:
```ts
export async function generateMetadata({ params }: CifraPageProps): Promise<Metadata>
export async function generateStaticParams()  
```

## 📊 Futuras melhorias
   * Sistema de busca por hinos e acordes

   * Adição de favoritos (armazenamento local)

   * Cache inteligente para dados do Firebase

   * Página de estatísticas e histórico de acesso

   * Versão PWA (instalável em dispositivos móveis)

## 🧠 Observações técnicas
   * Cada cifra é buscada a partir de seu sanitized_title, armazenado no Firestore.

   * O conteúdo da cifra é processado no servidor, permitindo renderização completa no HTML gerado (ideal para SEO).

   * A função generateMetadata() é executada após generateStaticParams() no build.  
  
    
## 🪄 Execução local
### Instalar dependências
```
npm install
```

### Rodar ambiente de desenvolvimento
```
npm run dev
```

### Gerar build estático
```
npm run build
```

## 📜 Licença

Este projeto é de código fechado, de uso pessoal e educativo.
Não possui vínculo oficial com a Congregação Cristã no Brasil.

## ✨ Autor

Emerson Rodrigues
Desenvolvedor Full Stack em formação

