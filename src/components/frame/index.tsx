import Main from './main';
import styles from './index.module.scss';
import LeftSideBar from './leftSideBar';
export default function Frame() {
  return (
    <div className={styles.container}>
      <LeftSideBar />
      <Main />
    </div>
  );
}
