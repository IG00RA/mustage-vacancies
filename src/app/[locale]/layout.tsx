import '../../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { FacebookPixel } from '@/components/FacebookPixel/FacebookPixel';
import { ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font_mons',
  adjustFontFallback: false,
});

const ukraine = localFont({
  src: [
    {
      path: '../../fonts/e-Ukraine-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/e-Ukraine-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/e-Ukraine-Medium.otf',
      weight: '500',
      style: 'normal',
    },

    {
      path: '../../fonts/e-Ukraine-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font_ukr',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: 'Mustage Vacancies',
  description: 'Mustage Vacancies',
  icons: {
    icon: [
      { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.ico', type: 'image/x-icon' },
      { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/assets/site.webmanifest',
  openGraph: {
    title: 'Mustage Vacancies',
    description: 'Mustage Vacancies',
    type: 'website',
    images: [
      {
        url: '/assets/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Mustage Vacancies',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={`${montserrat.variable} ${ukraine.variable}`}>
          {children}
          <ToastContainer />
          <Suspense fallback={null}>
            <FacebookPixel locale={locale} />
          </Suspense>
          <div id="__next"></div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
