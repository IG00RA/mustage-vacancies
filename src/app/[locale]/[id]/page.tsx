import { fetchVacancyById } from '@/api/vacancies';
import Header from '@/components/Header/Header';
import VacancyPage from '@/components/VacancyPage/VacancyPage';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { locale, id } = await params;
    const vacancy = await fetchVacancyById(id, locale);

    return {
      title: `${vacancy.Title} | Mustage Team` || 'Mustage Vacancy',
      description: vacancy.Description || 'Explore vacancies on our platform.',
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
      <Header headerStyle={true} />
      <main>
        <VacancyPage />
      </main>
    </>
  );
}
