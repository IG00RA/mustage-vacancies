'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './Header.module.css';
import Icon from '@/helpers/Icon';
import MobMenu from '../MobMenu/MobMenu';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { menuItems } from '@/data/data';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  headerStyle: boolean;
}

export default function Header({ headerStyle = false }: HeaderProps) {
  const [query, setQuery] = useState<string>('');
  const pathname = usePathname();

  const t = useTranslations('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryString = urlSearchParams.toString();
      setQuery(queryString ? `?${queryString}` : '');
    }
  }, []);

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

  const getLocaleFromPath = (pathname: string): string => {
    const pathSegments = pathname.split('/');
    return pathSegments[1] || 'uk';
  };

  const locale = getLocaleFromPath(pathname || '');

  return (
    <>
      <MobMenu
        query={query}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        locale={locale}
      />
      <header
        className={`${styles.header} ${isMenuOpen && styles.mobile_menu_open} ${
          headerStyle && styles.scroll
        }`}
      >
        <Link className={styles.logo_wrap} href={`/${locale}/${query}`}>
          {!headerStyle ? (
            <Icon name="icon-header_logo" width={40} height={33} />
          ) : (
            <Icon name="icon-logo_dark" width={40} height={33} />
          )}
          <span className={styles.logo_text}>{t('Header.home')}</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  className={styles.nav_item}
                  href={`/${locale}/${query}${item.href}`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.lang_wrap}>
          <LanguageSwitcher headerStyle={headerStyle} />
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
