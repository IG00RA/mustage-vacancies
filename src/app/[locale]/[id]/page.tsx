import Header from '@/components/Header/Header';
import VacancyPage from '@/components/VacancyPage/VacancyPage';

export async function generateMetadata() {
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
