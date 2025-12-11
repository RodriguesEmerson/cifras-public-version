import { CookiesConsentModal } from "@/components/cookiesConsent/cookiesConsentModal";
import { Footer } from "@/features/footer/footer";
import { Header } from "@/features/header/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono, } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Site de Cifras e Letras dos hinos da CCB",
  description: "Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB",

  openGraph: {
    title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil | CCB Cifras',
    description: 'Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB.',
    url: "https://ccbcifras.com",
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
    title: 'Cifras e Letras dos hinos da CCB - Congregação Cristã no Brasil | CCB Cifras',
    description: 'Feito especialmente para a irmandade da Congregação Cristã no Brasil, o CCB Cifras reúne cifras e letras dos hinos do hinário e dos hinos avulsos da CCB. Simples, fiel e exclusivo para membros da CCB.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/share-image.png`],
  },

  robots: {
    follow: true,
    index: true
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/*Load gtag */}
         <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SZ0X87TQXZ" />

        {/*Run gtag datalayer with default consent*/}
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
            });
          `}
        </Script> 
      </head>
      <body
        className={`${robotoMono.variable}`}
      >
        <>
          <Header />
          {children}
          <CookiesConsentModal />
          <Footer />
        </>
      </body>
    </html>
  );
}
