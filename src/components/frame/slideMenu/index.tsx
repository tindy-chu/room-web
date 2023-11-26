import { useFrameStore } from '..';
import Header from '../header';

import arrowLight from '../../../assets/arrow-light.svg';
import arrowDark from '../../../assets/arrow-dark.svg';
import styles from './index.module.scss';
import { useAppStore } from '../../../App';
// import SearchBar from '../../searchBar';
import UserList from '../../userList';
import SearchBar from '../../searchBar';

export default function SlideMenu() {
  const appTheme = useAppStore((state) => state.theme);
  const frameStore = useFrameStore();

  const handleHide = () => {
    frameStore.toggleSlideMenuVisible();
  };

  const arrowSvg = appTheme === 'dark' ? arrowDark : arrowLight;

  const containerClassName = [
    styles.container,
    frameStore.slideMenuVisible && styles.active,
  ].join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.subClassName}>
        <Header>
          <div className={styles.headerContent}>
            <div className={styles.headerBtn} onClick={handleHide}>
              <img
                src={arrowSvg}
                className={styles.headerIcon}
                draggable={false}
              />
            </div>
            <div>
              <p className={styles.headerTitle}>New Chat</p>
            </div>
          </div>
        </Header>

        <SearchBar />
        <UserList />
      </div>
    </div>
  );
}
