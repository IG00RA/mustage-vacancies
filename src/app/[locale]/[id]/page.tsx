import { fetchVacancyById } from '@/api/vacancies';
import Header from '@/components/Header/Header';
import VacancyPage from '@/components/VacancyPage/VacancyPage';
import { Metadata } from 'next';
import Script from 'next/script';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { locale, id } = await params;
    const vacancy = await fetchVacancyById(id, locale, true);
    return {
      title:
        `${vacancy.Title} | Mustage Team` ||
        'Mustage Vacancy - Робота в digital-маркетингу',
      description: vacancy.Description || 'Explore vacancies on our platform.',
      twitter: {
        card: 'summary_large_image',
        title: `${vacancy.Title} | Mustage Team`,
        description: vacancy.Description,
        images: [
          {
            url: '/assets/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: `${vacancy.Title} | Mustage Team`,
          },
        ],
      },
      openGraph: {
        title: `${vacancy.Title} | Mustage Team`,
        description: vacancy.Description,
        type: 'website',
        images: [
          {
            url: '/assets/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: `${vacancy.Title} | Mustage Team`,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching vacancy metadata:', error);
    return {
      title: 'Mustage Vacancy',
      description: 'Explore vacancies on our platform.',
    };
  }
};
export default function Page() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-10954010722"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-10954010722');
        `}
      </Script>
      <Header headerStyle={true} />
      <main>
        <VacancyPage />
      </main>
    </>
  );
}
