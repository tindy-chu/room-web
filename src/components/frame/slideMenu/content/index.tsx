import { useFrameStore } from '../..';
import UserList from '../../../userList';
import styles from './index.module.scss';

export default function SlideMenuContent() {
  const frameSlideMenuType = useFrameStore((state) => state.slideMenuType);
  return (
    <div className={styles.container}>
      {frameSlideMenuType === 'userList' && <UserList />}
    </div>
  );
}
