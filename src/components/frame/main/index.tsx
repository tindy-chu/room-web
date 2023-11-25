import Header from '../header';
import styles from './index.module.scss';

export default function Content() {
  return (
    <div className={styles.container}>
      <Header />
      <p>Content</p>
    </div>
  );
}
