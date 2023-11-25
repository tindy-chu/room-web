import styles from './index.module.scss';

type TAvatarProps = {
  src: string;
};
export default function Avatar({ src }: TAvatarProps) {
  return (
    <div className={styles.container}>
      <img src={src} className={styles.img} draggable="false" />
    </div>
  );
}
