import styles from './Offer.module.css';
import { useTranslations } from 'next-intl';
import { offerItems } from '@/data/data';
import Icon from '@/helpers/Icon';

export default function Offer() {
  const t = useTranslations();

  return (
    <section id="offer" className={styles.offer}>
      <h2 className={styles.header}>{t('Offer.header')}</h2>
      <div className={styles.main_wrap}>
        <div className={styles.back}></div>
        <div className={styles.main_container_wrap}>
          <div className={styles.container_wrap}>
            <div className={styles.first_container}>
              <p className={styles.container_text}>
                {t('Offer.blockText.first.first')}
                <span>{t('Offer.blockText.first.second')}</span>
                {t('Offer.blockText.first.third')}
              </p>
            </div>
            <div className={styles.second_container}>
              <p className={styles.container_text}>
                <span>{t('Offer.blockText.second.first')}</span>
                {t('Offer.blockText.second.second')}
              </p>
            </div>
          </div>
          <div className={styles.third_container}>
            <p className={styles.container_text}>
              <span>{t('Offer.blockText.third.first')}</span>
              {t('Offer.blockText.third.second')}
            </p>
          </div>
        </div>
      </div>

      <h3 className={styles.list_text}>{t('Offer.headerText')}</h3>
      <ul className={styles.list}>
        {offerItems.map((item, index) => (
          <li className={styles.list_item} key={index}>
            <div className={styles.list_icon}>
              <Icon name={item.logo} width={24} height={24} />
            </div>
            <div className={styles.list_icon_hover}>
              <Icon name={item.logo_hov} width={24} height={24} />
            </div>

            <h3 className={styles.list_header}>{t(item.header)}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
