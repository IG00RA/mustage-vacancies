import '../../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { FacebookPixel } from '@/components/FacebookPixel/FacebookPixel';
import { ToastContainer } from 'react-toastify';
import { Metadata } from 'next';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font_mons',
  adjustFontFallback: false,
});

const ukraine = localFont({
  src: [
    { path: '../../fonts/e-Ukraine-Light.otf', weight: '300', style: 'normal' },
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
    { path: '../../fonts/e-Ukraine-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font_ukr',
});

export const localeMetadata: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  uk: {
    title: 'Вакансії в Mustage Team – Робота в digital-маркетингу',
    description:
      'Приєднуйтесь до Mustage Team – молодої української команди, що створює інноваційні рішення у digital-маркетингу та affiliate-індустрії.',
    keywords:
      'вакансії, робота, Mustage Team, digital-маркетинг, affiliate-маркетинг, кар’єра',
  },
  ru: {
    title: 'Вакансии в Mustage Team – Работа в digital-маркетинге',
    description:
      'Присоединяйтесь к Mustage Team – молодой украинской команде, создающей инновационные решения в digital-маркетинге и affiliate-индустрии.',
    keywords:
      'вакансии, работа, Mustage Team, digital-маркетинг, affiliate-маркетинг, карьера',
  },
  en: {
    title: 'Careers at Mustage Team – Jobs in Digital Marketing',
    description:
      'Join Mustage Team – a young Ukrainian team creating innovative solutions in digital marketing and the affiliate industry.',
    keywords:
      'jobs, careers, Mustage Team, digital marketing, affiliate marketing, opportunities',
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale } = await params;
  const metadataValues = localeMetadata[locale] || localeMetadata.uk;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://vacancies.mustage.team'
    ),
    title: metadataValues.title,
    description: metadataValues.description,
    keywords: metadataValues.keywords,
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataValues.title,
      description: metadataValues.description,
      images: [
        {
          url: '/assets/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: metadataValues.title,
        },
      ],
    },
    openGraph: {
      title: metadataValues.title,
      description: metadataValues.description,
      type: 'website',
      images: [
        {
          url: '/assets/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: metadataValues.title,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/assets/favicon.svg', type: 'image/svg+xml' },
        { url: '/assets/favicon.ico', type: 'image/x-icon' },
        { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    manifest: '/assets/site.webmanifest',
  };
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
      <body className={`${montserrat.variable} ${ukraine.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer />
          <Suspense fallback={null}>
            <FacebookPixel locale={locale} />
          </Suspense>
          <div id="__next"></div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
