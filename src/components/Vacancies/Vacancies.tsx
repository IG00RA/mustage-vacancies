import styles from './Vacancies.module.css';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchVacancies, Vacancy } from '../../api/vacancies';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Vacancies() {
  const t = useTranslations();
  const pathname = usePathname();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  const getLocaleFromPath = (pathname: string): string => {
    const pathSegments = pathname.split('/');
    return pathSegments[1] || 'uk';
  };

  const locale = getLocaleFromPath(pathname || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryString = urlSearchParams.toString();
      setQuery(queryString ? `?${queryString}` : '');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchVacancies(locale)
      .then(data => {
        setVacancies(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [locale]);

  if (loading) {
    return (
      <section id="vacancies" className={styles.vacancies}>
        <div className={styles.container}>
          <div className={styles.dots_loading}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="vacancies" className={styles.vacancies}>
        <div className={styles.container}>
          <p className={styles.header}>{t('Vacancies.error')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="vacancies" className={styles.vacancies}>
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
                <Link
                  href={`/${locale}/${vacancy.documentId}/${query}`}
                  className={styles.link}
                >
                  <Icon name="icon-arrow" width={16} height={16} />
                </Link>
              </div>
              <p className={styles.description}>{vacancy.Description}</p>
              <div className={styles.skills}>
                {vacancy?.Skills?.map(skill => (
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
