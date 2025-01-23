import { fetchVacancyById } from '@/api/vacancies';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import VacancyPage from '@/components/VacancyPage/VacancyPage';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params)?.id;

  if (id) {
    try {
      const vacancy = await fetchVacancyById(id, 'uk');
      return {
        title: `Mustage Vacancy | ${vacancy?.Title}` || 'Mustage Vacancy',
        description: vacancy?.Description || 'Mustage Vacancy Description',
      };
    } catch {
      return {
        title: 'Error',
        description: 'Failed to load vacancy details.',
      };
    }
  }

  return {
    title: 'Mustage Vacancy',
    description: 'Explore vacancies on our platform.',
  };
}

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
