import Icon from '@/helpers/Icon';
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
      <Icon name="icon-local" width={24} height={24} />
      <button
        className={`${styles.button} ${
          locale === 'uk' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('uk')}
        type="button"
      >
        UA
      </button>
      <button
        className={`${styles.button} ${
          locale === 'ru' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('ru')}
        type="button"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
