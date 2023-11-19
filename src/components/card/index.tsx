import { ReactNode } from 'react';

import styles from './index.module.scss';

type CardProps = {
  title?: string;
  children?: ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      {title && <div className={styles.line} />}

      {children}
    </div>
  );
};

export default Card;
