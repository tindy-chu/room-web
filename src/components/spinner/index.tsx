import styles from './index.module.scss';
import SpinnerLight from '../../assets/spinner-light.svg';
import SpinnerDark from '../../assets/spinner-dark.svg';
import { useAppStore } from '../../App';
export default function Spinner() {
  const appTheme = useAppStore((state) => state.theme);

  const spinnerImg = appTheme === 'light' ? SpinnerLight : SpinnerDark;
  return (
    <div className={styles.container}>
      <img src={spinnerImg} />
    </div>
  );
}
