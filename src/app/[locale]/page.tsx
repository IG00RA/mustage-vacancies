'use client';

import { useEffect, useRef, useState } from 'react';

import Offer from '@/components/Offer/Offer';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import Vacancies from '@/components/Vacancies/Vacancies';
import Header from '@/components/Header/Header';

export default function Home() {
  const [headerStyle, setHeaderStyle] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderStyle(false);
        } else {
          setHeaderStyle(true);
        }
      },
      {
        root: null,
        threshold: 0.02,
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <>
      <Header headerStyle={headerStyle} />
      <main>
        <Hero sectionRef={sectionRef} />
        <Offer />
        <Vacancies />
        <Form />
      </main>
      <Footer />
    </>
  );
}
