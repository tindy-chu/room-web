import RoomList from '../../roomList';
import Header from '../header';

import styles from './index.module.scss';
import MoreLight from '../../../assets/more-light.svg';
import MoreDark from '../../../assets/more-dark.svg';
import PeopleLight from '../../../assets/people-light.svg';
import PeopleDark from '../../../assets/people-dark.svg';
import { useAppStore } from '../../../App';

export default function LeftSideBar() {
  const appStore = useAppStore();
  const peopleSvg = appStore.theme === 'dark' ? PeopleDark : PeopleLight;
  const moreSvg = appStore.theme === 'dark' ? MoreDark : MoreLight;

  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.headerContent}>
          <div className={styles.headerBtnGroup}>
            <button className={styles.headerBtn}>
              <img src={peopleSvg} className={styles.headerIcon} />
            </button>
            <button className={styles.headerBtn}>
              <img src={moreSvg} className={styles.headerIcon} />
            </button>
          </div>
        </div>
      </Header>
      <RoomList />
    </div>
  );
}
