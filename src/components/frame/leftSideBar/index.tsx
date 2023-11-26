// import RoomList from '../../roomList';
import Header from '../header';

import styles from './index.module.scss';
import MoreLight from '../../../assets/more-light.svg';
import MoreDark from '../../../assets/more-dark.svg';
import UserLight from '../../../assets/user-light.svg';
import UserDark from '../../../assets/user-dark.svg';
import { useAppStore } from '../../../App';
import { useFrameStore } from '..';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeftSideBar() {
  const appTheme = useAppStore((state) => state.theme);
  const frameStore = useFrameStore();
  const navigation = useNavigate();

  const UserSvg = appTheme === 'dark' ? UserDark : UserLight;
  const moreSvg = appTheme === 'dark' ? MoreDark : MoreLight;

  const [moreVisible, setMoreVisible] = useState(false);

  const toggleMoreVisible = () => {
    setMoreVisible((state) => !state);
  };

  const handleFriendClick = () => {
    frameStore.toggleSlideMenuVisible();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigation('/login');
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
            <div className={styles.moreParent}>
              <button className={styles.headerBtn} onClick={toggleMoreVisible}>
                <img
                  src={moreSvg}
                  className={styles.headerIcon}
                  draggable="false"
                />
              </button>
              {moreVisible && (
                <div className={styles.moreContainer} onClick={handleLogout}>
                  <p>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Header>
      {/* <RoomList /> */}
    </div>
  );
}
