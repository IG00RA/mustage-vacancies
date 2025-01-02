import Offer from '@/components/Offer/Offer';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Offer />
        <Form />
      </main>
      <Footer />
    </>
  );
}
