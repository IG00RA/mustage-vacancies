import styles from './Hero.module.css';
import { useTranslations } from 'next-intl';
import { heroItems } from '@/data/data';
import Icon from '@/helpers/Icon';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations();
  const BOT_URL = process.env.NEXT_PUBLIC_BOT_URL || '';

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.main_wrap}>
          <div className={styles.header_wrap}>
            <svg className={styles.logo}>
              <use href="../../img/hero/logo.svg" />
            </svg>
            <h1 className={styles.header}>
              <span className={styles.logo_text}>{t('Hero.header')}</span>
              {t('Hero.text')}
            </h1>
          </div>
        </div>
        <ul className={styles.list}>
          {heroItems.map((item, index) => (
            <li key={index}>
              <a className={styles.list_item} href={item.link} target="_blank">
                <Image
                  src={item.icon}
                  alt={item.text}
                  className={styles.icon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p className={styles.list_text}>{item.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
