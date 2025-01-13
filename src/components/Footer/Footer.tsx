'use client';

import Icon from '@/helpers/Icon';
import styles from './Footer.module.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems, socialItems } from '@/data/data';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useEffect, useState } from 'react';

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryString = urlSearchParams.toString();
      setQuery(queryString ? `?${queryString}` : '');
    }
  }, []);

  const getLocaleFromPath = (pathname: string): string => {
    const pathSegments = pathname.split('/');
    return pathSegments[1] || 'uk';
  };

  const locale = getLocaleFromPath(pathname || '');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.menu_wrap}>
          <Link className={styles.logo_wrap} href={`/${locale}/${query}`}>
            <Icon name="icon-header_logo" width={40} height={33} />
            <span className={styles.logo_text}>{t('Header.home')}</span>
          </Link>
          <nav className={styles.nav}>
            <ul>
              {menuItems.map((item, index) => (
                <li className={styles.nav_item} key={index}>
                  <Link className={styles.nav_item_link} href={item.href}>
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.lang_wrap}>
            <LanguageSwitcher headerStyle={false} />
          </div>
          <ul className={styles.social}>
            {socialItems.map((item, index) => (
              <li key={index}>
                <a
                  className={styles.soc_item_link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={item.icon} width={32} height={32} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.policy_wrap}>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            {t('Footer.policy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
