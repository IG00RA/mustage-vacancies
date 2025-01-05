import styles from './Button.module.css';
const Button = ({ text }: string) => {
  return (
    <button type="button" className={`${styles.button}`}>
      {text}
    </button>
  );
};

export default Button;
