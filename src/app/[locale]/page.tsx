import Offer from '@/components/Offer/Offer';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import Vacancies from '@/components/Vacancies/Vacancies';
import Header from '@/components/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
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
