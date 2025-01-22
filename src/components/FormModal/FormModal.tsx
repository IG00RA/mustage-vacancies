'use client';

import Icon from '@/helpers/Icon';
import styles from './FormModal.module.css';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { useRef } from 'react';

type FormModalProps = {
  closeModal: () => void;
};

export default function FormModal({ closeModal }: FormModalProps) {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);

  const initialFormData = {
    name: '',
    nickname: '',
    comment: '',
    resumeLink: '',
    resumeFile: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    name: '',
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
    setErrors({ ...errors, resumeLink: '', resumeFile: '' });
  };

  const handleFileClose = (e: MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    setFormData({ ...formData, resumeFile: null });
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.value = '';
    }
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

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const data = await response.json();
    return data.fileId;
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
      };

      const fileData = formData.resumeFile;
      setIsLoading(true);

      const fileId = fileData ? await uploadFile(fileData) : null;

      if (fileId) {
        message.resumeLink = `https://drive.google.com/file/d/${fileId}/view`;
      }

      await Promise.all([sendToGoogleScript(message), sendMessage(message)]);

      toast.success(t('Form.form.ok'));

      setFormData(initialFormData);
      setErrors({ name: '', resumeLink: '', resumeFile: '' });
      if (hiddenFileInputRef.current) {
        hiddenFileInputRef.current.value = '';
      }
    } catch {
      toast.error(t('Form.errors.sendError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacts" className={styles.form}>
      <button
        className={styles.close_button}
        type="button"
        onClick={closeModal}
      >
        <Icon name="icon-close_modal" width={24} height={24} />
      </button>
      <div className={styles.text_wrap}>
        <h2 className={styles.header}>{t('Form.headerPage')}</h2>
        <h4 className={styles.header_text}>{t('Form.headerPageText')}</h4>
      </div>
      <form className={styles.form_wrap} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.visually_hidden}>
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

        <label htmlFor="nickname" className={styles.visually_hidden}>
          {t('Form.form.nick')}
        </label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder={t('Form.form.nickPlaceHolder')}
          className={`${styles.input}`}
        />
        <label htmlFor="comment" className={styles.visually_hidden}>
          {t('Form.form.contentPage')}
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder={t('Form.form.contentPagePlaceHolder')}
          className={`${styles.input} ${styles.textarea} `}
        ></textarea>

        <span className={styles.resume_text}>{t('Form.form.resume')}</span>
        <div
          onClick={handleDivClick}
          className={`${styles.custom_file_input} ${
            formData.resumeFile && styles.active_file
          } ${errors.resumeLink ? styles.error_resume : ''}`}
        >
          {!formData.resumeFile && (
            <Icon name="icon-resume" width={16} height={16} />
          )}
          <span className={styles.file_input_text}>
            {formData.resumeFile
              ? formData.resumeFile.name
              : t('Form.form.resumePlaceHolder')}
          </span>
          {formData.resumeFile && (
            <span className={styles.close_icon} onClick={handleFileClose}>
              <Icon name="icon-close" width={24} height={24} />
            </span>
          )}

          <label htmlFor="resume" className={styles.visually_hidden}>
            {t('Form.form.resume')}
          </label>
          <input
            ref={hiddenFileInputRef}
            type="file"
            name="resume"
            onChange={handleFileChange}
            className={styles.hidden}
            accept="application/pdf"
          />
        </div>

        <span className={styles.or}>{t('Form.form.or')}</span>
        <label htmlFor="resumeLink" className={styles.visually_hidden}>
          {t('Form.form.resumeLink')}
        </label>
        <input
          type="text"
          name="resumeLink"
          value={formData.resumeLink}
          onChange={handleChange}
          placeholder={t('Form.form.resumeLinkPlaceHolder')}
          className={`${styles.input} ${errors.resumeLink ? styles.error : ''}`}
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
          </a>
        </div>
      </div>
    </section>
  );
}
