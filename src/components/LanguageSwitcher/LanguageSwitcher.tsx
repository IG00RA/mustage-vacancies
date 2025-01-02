import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  handleLanguageChange: (language: string) => void;
  locale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  handleLanguageChange,
  locale,
}) => {
  return (
    <div className={styles.language}>
      <button
        className={`${styles.button} ${
          locale === 'ru' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('ru')}
        type="button"
      >
        RU
      </button>
      <span>/</span>
      <button
        className={`${styles.button} ${
          locale === 'uk' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('uk')}
        type="button"
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
