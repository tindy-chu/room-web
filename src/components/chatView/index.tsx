import { create } from 'zustand';
import styles from './index.module.scss';
import { useAppStore } from '../../App';

import SendLight from '../../assets/send-light.svg';
import SendDark from '../../assets/send-dark.svg';

export type TChatViewState = {
  roomId: string;
  userId: string;
  userEmail: string;
  setRoomId: (roomId: string) => void;
  setUserId: (useId: string) => void;
  setUserEmail: (useId: string) => void;
};

export const useChatViewStore = create<TChatViewState>((set) => ({
  roomId: '',
  userId: '',
  userEmail: '',
  setRoomId: (roomId: string) => set(() => ({ roomId })),
  setUserId: (userId: string) => set(() => ({ userId })),
  setUserEmail: (userEmail: string) => set(() => ({ userEmail })),
}));

export default function ChatView() {
  const appTheme = useAppStore((state) => state.theme);
  const roomId = useChatViewStore((state) => state.roomId);
  const useId = useChatViewStore((state) => state.userId);

  return (
    <>
      {roomId || useId ? (
        <div className={styles.container}>
          <div className={styles.conversation}>ss</div>
          <div className={styles.sender}>
            <input
              type="text"
              placeholder="Type a message"
              className={styles.input}
            />
            <div className={styles.sendBtn}>
              <img
                src={appTheme === 'dark' ? SendDark : SendLight}
                className={styles.sendImg}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
