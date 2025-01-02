'use client';

import styles from './Confirm.module.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Icon from '@/helpers/Icon';
import { toast } from 'react-toastify';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { useEffect } from 'react';

export default function Confirm({ locale }: { locale: string }) {
  const t = useTranslations();
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';

  const handleSubmit = async () => {
    try {
      const message = {
        bot: true,
        message: 'Користувача перенаправлено в бот',
      };
      await Promise.all([sendToGoogleScript(message), sendMessage(message)]);
      window.location.href = CHAT_URL;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${t('Form.errors.sendError')} ${error.message}`);
      } else {
        toast.error(t('Form.errors.sendError'));
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.confirm}>
      <div className={styles.container}>
        <Link className={styles.logo_wrap} href={`/${locale}/`}>
          <Icon name="icon-logo" width={58} height={48} />
          <span className={styles.logo_text}>{t('Confirm.logo')}</span>
        </Link>
        <h2 className={styles.header}>{t('Confirm.header')}</h2>
        <p className={styles.text}>{t('Confirm.text')}</p>
        <Link className={styles.button} href={`/${locale}/`}>
          {t('Confirm.button')}
          <Icon name="icon-right-btn" width={24} height={24} />
        </Link>
      </div>
    </section>
  );
}
