import { ReactNode } from 'react';
import styles from './index.module.scss';

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
export default Header;
