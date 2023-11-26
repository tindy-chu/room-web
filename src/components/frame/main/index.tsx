import ChatView, { useChatViewStore } from '../../chatView';
import Header from '../header';
import styles from './index.module.scss';

export default function Content() {
  const userEmail = useChatViewStore((state) => state.userEmail);
  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.headerContainer}>
          <p className={styles.title}>{userEmail}</p>
        </div>
      </Header>
      <ChatView />
    </div>
  );
}
