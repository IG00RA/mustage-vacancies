'use client';

import styles from './Vacancies.module.css';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchVacancies, Vacancy } from '../../api/vacancies';
import Icon from '@/helpers/Icon';
import Link from 'next/link';

export default function Vacancies() {
  const t = useTranslations();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const locale = useLocale();

  useEffect(() => {
    fetchVacancies(locale).then(setVacancies).catch(setError);
  }, [locale]);

  if (error) {
    return (
      <p className={styles.error}>Error loading vacancies: {error.message}</p>
    );
  }

  return (
    <section className={styles.vacancies}>
      <div className={styles.container}>
        <h2 className={styles.header}>
          <span>{t('Vacancies.header.first')}</span>
          {t('Vacancies.header.second')}
          <span>{t('Vacancies.header.third')}</span>
          {t('Vacancies.header.fourth')}
          <span>{t('Vacancies.header.fifth')}</span>
          {t('Vacancies.header.sixth')}
          <span>{t('Vacancies.header.seventh')}</span>
        </h2>
        <ul className={styles.list}>
          {vacancies.map(vacancy => (
            <li key={vacancy.id} className={styles.item}>
              <div className={styles.title_wrap}>
                <h3 className={styles.title}>{vacancy.Title}</h3>
                <Link href={`/${vacancy.id}`} className={styles.link}>
                  <Icon name="icon-arrow" width={16} height={16} />
                </Link>
              </div>
              <p className={styles.description}>{vacancy.Description}</p>
              <div className={styles.skills}>
                {vacancy.Skills.map(skill => (
                  <span key={skill.id} className={styles.skill}>
                    {skill.Skill}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
