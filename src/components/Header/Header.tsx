'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Icon from '@/helpers/Icon';
import MobMenu from '../MobMenu/MobMenu';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { menuItems } from '@/data/data';

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<URLSearchParams | null>(null);

  const t = useTranslations('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      setQuery(urlSearchParams);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${lang}/${path}?${query}`);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  };
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };
  return (
    <>
      <MobMenu
        query={query}
        locale={locale}
        handleLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
      />
      <header
        className={`${styles.header} ${isMenuOpen && styles.mobile_menu_open}`}
      >
        <Link className={styles.logo_wrap} href={`/${locale}/?${query}`}>
          <Icon name="icon-header_logo" width={40} height={33} />
          <span className={styles.logo_text}>{t('Header.home')}</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link className={styles.nav_item} href={item.href}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.lang_wrap}>
          <LanguageSwitcher
            locale={locale}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
        <div
          className={`${styles.burger_wrap} ${
            isMenuOpen ? styles.burger_open : ''
          }`}
          onClick={isMenuOpen ? closeMenu : openMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </header>
    </>
  );
}
