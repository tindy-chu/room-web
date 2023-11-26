import { ReactNode } from 'react';
import styles from './index.module.scss';

type TInfoRowProps = {
  leftComponent: ReactNode;
  onClick?: () => void;
  title?: string;
  desc?: string;
};

export default function InfoRow({
  leftComponent: LeftComponent,
  onClick,
  title,
  desc,
}: TInfoRowProps) {
  const containerName = [styles.container, onClick && styles.hover].join(' ');

  return (
    <div className={containerName} onClick={onClick}>
      <div className={styles.leftComponent}>{LeftComponent}</div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.descContainer}>
          <p className={styles.desc}>{desc}</p>
        </div>
      </div>
    </div>
  );
}
