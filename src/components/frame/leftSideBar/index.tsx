// import RoomList from '../../roomList';
import Header from '../header';

import styles from './index.module.scss';
import MoreLight from '../../../assets/more-light.svg';
import MoreDark from '../../../assets/more-dark.svg';
import UserLight from '../../../assets/user-light.svg';
import UserDark from '../../../assets/user-dark.svg';
import { useAppStore } from '../../../App';
import { useFrameStore } from '..';

export default function LeftSideBar() {
  const appTheme = useAppStore((state) => state.theme);
  const frameStore = useFrameStore();
  const UserSvg = appTheme === 'dark' ? UserDark : UserLight;
  const moreSvg = appTheme === 'dark' ? MoreDark : MoreLight;

  const handleFriendClick = () => {
    frameStore.toggleSlideMenuVisible();
  };

  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.headerContent}>
          <div className={styles.headerBtnGroup}>
            <button className={styles.headerBtn} onClick={handleFriendClick}>
              <img
                src={UserSvg}
                className={styles.headerIcon}
                draggable="false"
              />
            </button>
            <button className={styles.headerBtn}>
              <img
                src={moreSvg}
                className={styles.headerIcon}
                draggable="false"
              />
            </button>
          </div>
        </div>
      </Header>
      {/* <RoomList /> */}
    </div>
  );
}
