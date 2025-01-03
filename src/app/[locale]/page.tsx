import Offer from '@/components/Offer/Offer';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import Vacancies from '@/components/Vacancies/Vacancies';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Offer />
        <Vacancies />
        <Form />
      </main>
      <Footer />
    </>
  );
}
