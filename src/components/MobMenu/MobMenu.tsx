import { useTranslations } from 'next-intl';
import { menuItems, socialItems } from '@/data/data';
import styles from './MobMenu.module.css';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Button from '../Button/Button';

type MobMenuProps = {
  isMenuOpen: boolean;
  closeMenu: () => void;
  locale: string;
  handleLanguageChange: (lang: string) => void;
};

export default function MobMenu({
  isMenuOpen,
  closeMenu,
  locale,
  handleLanguageChange,
}: MobMenuProps) {
  const t = useTranslations('');

  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';

  return (
    <div
      onClick={closeMenu}
      className={`${styles.mobile_wrap} ${
        isMenuOpen && styles.mobile_menu_open
      }`}
    >
      <div
        className={styles.burger_menu}
        onClick={event => event.stopPropagation()}
      >
        <p>{t('Footer.menu.menu')}</p>
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((item, index) => (
              <li
                className={styles.mobile_link}
                key={index}
                onClick={closeMenu}
              >
                <Link href={item.href}>{t(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className={styles.social}>
          {socialItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Icon name={item.icon} width={32} height={32} />
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.lang_wrap}>
          <LanguageSwitcher
            locale={locale}
            handleLanguageChange={handleLanguageChange}
          />
        </div>

        <div className={styles.button_wrap}>
          <Button link={CHAT_URL} />
        </div>
      </div>
    </div>
  );
}
