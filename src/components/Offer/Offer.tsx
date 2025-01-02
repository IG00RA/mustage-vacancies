import styles from './Offer.module.css';
import { useTranslations } from 'next-intl';
import { offerItems } from '@/data/data';
import Icon from '@/helpers/Icon';

export default function Offer() {
  const t = useTranslations();

  return (
    <section id="offer" className={styles.offer}>
      <div className={styles.container}>
        <span className={styles.headerText}>{t('Offer.headerText')}</span>
        <h2 className={styles.header}>{t('Offer.header')}</h2>
        <ul className={styles.list}>
          {offerItems.map((item, index) => (
            <li key={index}>
              <div className={styles.icon_wrap}>
                <Icon name={item.logo} width={32} height={32} />
              </div>
              <h3 className={styles.list_header}>{t(item.header)}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
