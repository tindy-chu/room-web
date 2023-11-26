import styles from './index.module.scss';

type TSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function SearchBar({ value, onChange }: TSearchBarProps) {
  return (
    <div className={styles.container}>
      <input value={value} onChange={(evt) => onChange(evt.target.value)} />
    </div>
  );
}
