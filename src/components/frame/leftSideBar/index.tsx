// import RoomList from '../../roomList';
import Header from '../header';

import styles from './index.module.scss';
import MoreLight from '../../../assets/more-light.svg';
import MoreDark from '../../../assets/more-dark.svg';
import FriendLight from '../../../assets/friend-light.svg';
import FriendDark from '../../../assets/friend-dark.svg';
import { useAppStore } from '../../../App';
import { useFrameStore } from '..';

export default function LeftSideBar() {
  const appStore = useAppStore();
  const frameStore = useFrameStore();
  const friendSvg = appStore.theme === 'dark' ? FriendDark : FriendLight;
  const moreSvg = appStore.theme === 'dark' ? MoreDark : MoreLight;

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
                src={friendSvg}
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
