import Main from './main';
import styles from './index.module.scss';
import LeftSideBar from './leftSideBar';
import { create } from 'zustand';
import SlideMenu from './slideMenu';

export type TFrameStore = {
  slideMenuVisible: boolean;
  slideMenuType: 'userList' | 'settingList';
  toggleSlideMenuVisible: () => void;
};

export const useFrameStore = create<TFrameStore>((set) => ({
  slideMenuVisible: false,
  slideMenuType: 'userList',
  toggleSlideMenuVisible: () => {
    set((state) => {
      return { slideMenuVisible: !state.slideMenuVisible };
    });
  },
}));

export default function Frame() {
  return (
    <div className={styles.container}>
      <SlideMenu />
      <LeftSideBar />
      <Main />
    </div>
  );
}
