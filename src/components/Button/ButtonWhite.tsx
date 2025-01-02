'use client';

import React, { useState } from 'react';
import styles from './Button.module.css';
import { useTranslations } from 'next-intl';
import Icon from '@/helpers/Icon';
import { toast } from 'react-toastify';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { ButtonProps } from './ButtonSec';

const ButtonWhite: React.FC<ButtonProps> = ({ link }) => {
  const [isLoading, setIsLoading] = useState(false);

  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';
  const t = useTranslations();

  const handleClick = async () => {
    setIsLoading(true);
    const message = { message: 'Користувач перейшов в бот', bot: true };

    try {
      await Promise.all([sendToGoogleScript(message), sendMessage(message)]);
      window.location.href = link;
    } catch {
      toast.error(t('Form.errors.sendError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    window.location.href = link;
  };

  const isTelegramLink = link === CHAT_URL;

  return (
    <button
      type="button"
      onClick={isTelegramLink ? handleRedirect : handleClick}
      className={`${styles.button_white}`}
    >
      {isLoading && !isTelegramLink ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {t('Main.buttonSecond')}
          <Icon name="icon-right-btn" width={24} height={24} />
        </>
      )}
    </button>
  );
};

export default ButtonWhite;
