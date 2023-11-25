import { ReactNode } from 'react';

import styles from './index.module.scss';

type CardProps = {
  title?: string;
  children?: ReactNode;
  containerStyle?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      {title && (
        <>
          <p className={styles.title}>{title}</p>
          <div className={styles.line} />
        </>
      )}

      {children}
    </div>
  );
};

export default Card;
