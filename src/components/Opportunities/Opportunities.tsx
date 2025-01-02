import styles from './Opportunities.module.css';
import { useTranslations } from 'next-intl';
import { opportunitiesItems } from '@/data/data';
import Icon from '@/helpers/Icon';

export default function Opportunities() {
  const t = useTranslations();

  return (
    <section id="opportunities" className={styles.opportunities}>
      <div className={styles.container}>
        <span className={styles.headerText}>
          {t('Opportunities.headerText')}
        </span>
        <h2 className={styles.header}>{t('Opportunities.header')}</h2>
        <ul className={styles.list}>
          {opportunitiesItems.map((item, index) => (
            <li key={index}>
              <div className={styles.icon_wrap}>
                <Icon name={item.logo} width={32} height={32} />
              </div>
              <h3 className={styles.list_header}>{t(item.header)}</h3>
              <p className={styles.list_par}>
                {t(item.text.first)}
                <span>{t(item.text.second)}</span>
                {t(item.text.third)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
