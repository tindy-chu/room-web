import { useFrameStore } from '..';
import Header from '../header';

import arrowLight from '../../../assets/arrow-light.svg';
import arrowDark from '../../../assets/arrow-dark.svg';
import styles from './index.module.scss';
import { useAppStore } from '../../../App';

export default function SlideMenu() {
  const appStore = useAppStore();
  const frameStore = useFrameStore();

  const handleHide = () => {
    frameStore.toggleSlideMenuVisible();
  };

  const arrowSvg = appStore.theme === 'dark' ? arrowDark : arrowLight;
  const containerClassName = [
    styles.container,
    frameStore.slideMenuVisible && styles.active,
  ].join(' ');

  return (
    <div className={containerClassName}>
      <Header>
        <div className={styles.headerBtn} onClick={handleHide}>
          <img src={arrowSvg} className={styles.headerIcon} draggable={false} />
        </div>
      </Header>
      <p>sss</p>
    </div>
  );
}
