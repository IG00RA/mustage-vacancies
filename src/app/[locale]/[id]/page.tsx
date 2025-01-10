import Header from '@/components/Header/Header';
import VacancyPage from '@/components/VacancyPage/VacancyPage';

export default function Home() {
  return (
    <>
      <Header headerStyle={true} />
      <main>
        <VacancyPage />
      </main>
    </>
  );
}
