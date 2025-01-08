'use client';

import Icon from '@/helpers/Icon';
import styles from './Form.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { useRef } from 'react';

export default function Form() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const nicknameRegex = /^@([a-zA-Z0-9_]{3,32})$/;

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    comment: '',
    resumeLink: '',
    resumeFile: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: '',
    nickname: '',
    resumeLink: '',
    resumeFile: '',
  });

  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, resumeFile: file });
    setErrors({ ...errors, resumeFile: '' });
  };

  const handleFileClose = (e: MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    setFormData({ ...formData, resumeFile: null });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      nickname: '',
      resumeLink: '',
      resumeFile: '',
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = t('Form.errors.required');
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = t('Form.errors.nameLength');
      isValid = false;
    }

    if (!formData.nickname) {
      newErrors.nickname = t('Form.errors.required');
      isValid = false;
    } else if (!nicknameRegex.test(formData.nickname)) {
      newErrors.nickname = t('Form.errors.nickFormat');
      isValid = false;
    }

    if (!formData.resumeFile && !formData.resumeLink) {
      newErrors.resumeFile = t('Form.errors.fileOrLinkRequired');
      newErrors.resumeLink = t('Form.errors.fileOrLinkRequired');
      isValid = false;
    }

    if (formData.resumeLink && !/^https?:\/\//.test(formData.resumeLink)) {
      newErrors.resumeLink = t('Form.errors.linkFormat');
      isValid = false;
    }

    if (formData.resumeFile && formData.resumeFile.type !== 'application/pdf') {
      newErrors.resumeFile = t('Form.errors.fileFormat');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t('Form.errors.validError'));
      return;
    }

    try {
      const message = {
        message: 'Користувач відправив форму',
        name: formData.name,
        username: formData.nickname,
        comment: formData.comment,
        resumeLink: formData.resumeLink,
        bot: false,
      };

      const fileData = formData.resumeFile;

      setIsLoading(true);
      await Promise.all([sendToGoogleScript(message), sendMessage(message)]);

      if (fileData) {
        const formDataToSend = new FormData();
        formDataToSend.append('resume', fileData);
      }

      toast.success(t('Form.form.ok'));

      const currentQueryParams = new URLSearchParams(window.location.search);
      const queryParams = currentQueryParams.toString();

      router.push(
        queryParams ? `/${locale}/confirm?${queryParams}` : `/${locale}/confirm`
      );
    } catch {
      toast.error(t('Form.errors.sendError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.form}>
      <div className={styles.container}>
        <h2 className={styles.header}>{t('Form.header')}</h2>
        <h4 className={styles.header_text}>{t('Form.headerText')}</h4>

        <form className={styles.form_wrap} onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.visuallyHidden}>
            {t('Form.form.name')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('Form.form.namePlaceHolder')}
            className={`${styles.input} ${errors.name ? styles.error : ''}`}
          />
          {errors.name && <p className={styles.error_text}>{errors.name}</p>}

          <label htmlFor="nickname" className={styles.visuallyHidden}>
            {t('Form.form.nick')}
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder={t('Form.form.nickPlaceHolder')}
            className={`${styles.input} ${errors.nickname ? styles.error : ''}`}
          />
          {errors.nickname && (
            <p className={styles.error_text}>{errors.nickname}</p>
          )}

          <label htmlFor="comment" className={styles.visuallyHidden}>
            {t('Form.form.content')}
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder={t('Form.form.contentPlaceHolder')}
            className={`${styles.input} ${styles.textarea} ${
              errors.name ? styles.error : ''
            }`}
          ></textarea>

          <span className={styles.resumeText}>{t('Form.form.resume')}</span>
          <div
            onClick={handleDivClick}
            className={`${styles.customFileInput} ${
              formData.resumeFile && styles.active_file
            } ${errors.resumeLink ? styles.errorResume : ''}`}
          >
            {!formData.resumeFile && (
              <Icon name="icon-resume" width={16} height={16} />
            )}
            <span className={styles.fileInputText}>
              {formData.resumeFile
                ? formData.resumeFile.name
                : t('Form.form.resumePlaceHolder')}
            </span>
            {formData.resumeFile && (
              <span className={styles.close_icon} onClick={handleFileClose}>
                <Icon name="icon-close" width={24} height={24} />
              </span>
            )}

            <label htmlFor="resume" className={styles.visuallyHidden}>
              {t('Form.form.resume')}
            </label>
            <input
              ref={hiddenFileInputRef}
              type="file"
              name="resume"
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
              accept="application/pdf"
            />
          </div>

          <span className={styles.or}>{t('Form.form.or')}</span>
          <label htmlFor="resumeLink" className={styles.visuallyHidden}>
            {t('Form.form.resumeLink')}
          </label>
          <input
            type="text"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder={t('Form.form.resumeLinkPlaceHolder')}
            className={`${styles.input} ${
              errors.resumeLink ? styles.error : ''
            }`}
          />
          {errors.resumeLink && (
            <p className={styles.error_text}>{errors.resumeLink}</p>
          )}

          <span
            className={`${styles.loader} ${!isLoading ? styles.hidden : ''}`}
          ></span>
          <button
            className={`${isLoading ? styles.hidden : styles.button}`}
            type="submit"
          >
            {t('Form.form.button')}
          </button>
        </form>
      </div>
      <div className={styles.question_wrap}>
        <h3 className={styles.question_text}>{t('Form.questionText')}</h3>
        <div className={styles.question_link_wrap}>
          <a className={styles.question_link} href="mailto:support@mustage.io">
            <div className={styles.question_link_icon}>
              <Icon name="icon-google" width={32} height={32} />
            </div>
            <div className={styles.question_link_icon_hover}>
              <Icon name="icon-google_hov" width={32} height={32} />
            </div>
            <span className={styles.question_link_text}>E-mail</span>
          </a>
          <a
            className={`${styles.question_link} ${styles.question_link_tg}`}
            href="https://t.me/usaffiliate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.question_link_icon}>
              <Icon name="icon-tg" width={32} height={32} />
            </div>
            <div className={styles.question_link_icon_hover}>
              <Icon name="icon-tg_hov" width={32} height={32} />
            </div>
            <span
              className={`${styles.question_link_text} ${styles.question_link_text_tg}`}
            >
              Telegram
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
