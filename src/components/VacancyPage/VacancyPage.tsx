'use client';

import { useLocale, useTranslations } from 'next-intl';
import styles from './VacancyPage.module.css';
import { useEffect, useState } from 'react';
import { Vacancy, fetchVacancyById } from '@/api/vacancies';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/helpers/Icon';
import Modal from 'react-modal';
import Form from '../Form/Form';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

export default function VacancyPage() {
  const locale = useLocale();
  const params = useParams();
  const [vacancy, setVacancies] = useState<Vacancy>(Object);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState<URLSearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('');

  useEffect(() => {
    const id = params?.id as string;
    if (id && (!vacancy || vacancy.documentId !== id)) {
      fetchVacancyById(id, locale).then(setVacancies).catch(setError);
    }
  }, [locale, params, vacancy]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      setQuery(urlSearchParams);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  };
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  if (error) {
    return (
      <section className={styles.vacancy}>
        <Link className={styles.link_wrap} href={`/${locale}/?${query}`}>
          <Icon name="icon-back" width={24} height={24} />
          <span className={styles.link_text}>{t('Page.back')}</span>
        </Link>
        <p>{t('Page.error')}</p>
      </section>
    );
  }

  return (
    <section className={styles.vacancy}>
      <Link className={styles.link_wrap} href={`/${locale}/?${query}`}>
        <Icon name="icon-back" width={24} height={24} />
        <span className={styles.link_text}>{t('Page.back')}</span>
      </Link>
      <div className={styles.main_wrap}>
        <div className={styles.head_container}>
          <h1 className={styles.header}>{vacancy.Title}</h1>
          <h3 className={styles.description}>{vacancy.DescriptionFull}</h3>
          <h3 className={styles.description}>
            {vacancy.DescriptionFullAdditional}
          </h3>
          <div className={styles.skills}>
            {vacancy?.Skills?.map(skill => (
              <span key={skill.id} className={styles.skill}>
                {skill.Skill}
              </span>
            ))}
          </div>
          <span
            className={`${styles.loader} ${!isLoading ? styles.hidden : ''}`}
          ></span>
          <button
            onClick={openModal}
            className={`${isLoading ? styles.hidden : styles.button}`}
            type="button"
          >
            {t('Page.button')}
          </button>
          <p className={styles.salary}>{t('Page.salary')}</p>
        </div>
        <div className={styles.description_container_wrap}>
          <div className={styles.description_container}>
            <h3 className={styles.description_header}>{t('Page.candidate')}</h3>
            <ul className={styles.description_list}>
              {vacancy?.Requirements?.map(requirement => (
                <li key={requirement.id} className={styles.description_item}>
                  <Icon name="icon-star" width={16} height={16} />
                  <p className={styles.description_text}>
                    {requirement.Requirement}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${styles.description_container} ${styles.description_container_second}`}
          >
            <h3 className={styles.description_header}>
              {t('Page.responsibilities')}
            </h3>
            <ul className={styles.description_list}>
              {vacancy?.Responsibilities?.map(responsibility => (
                <li
                  key={responsibility.id}
                  className={`${styles.description_item} ${styles.description_item_second}`}
                >
                  <Icon name="icon-star" width={16} height={16} />
                  <p className={styles.description_text}>
                    {responsibility.Responsibility}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${styles.description_container} ${styles.description_container_third}`}
          >
            <h3 className={styles.description_header}>{t('Page.offer')}</h3>
            <ul className={styles.description_list}>
              {vacancy?.Advantages?.map(advantage => (
                <li
                  key={advantage.id}
                  className={`${styles.description_item} ${styles.description_item_third}`}
                >
                  <Icon name="icon-star" width={16} height={16} />
                  <p className={styles.description_text}>
                    {advantage.Advantage}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Vacancy Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={closeModal}>Close Modal</button>
        <Form />
      </Modal>
    </section>
  );
}
