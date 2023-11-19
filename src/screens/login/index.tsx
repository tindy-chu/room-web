import SsoGoogle from '../../components/buttons/SsoGoogle';
import Card from '../../components/card';
import styles from './index.module.scss';

export default function Login() {
  return (
    <div className={styles.container}>
      <Card title="Sign Up or Log in">
        <SsoGoogle />
      </Card>
    </div>
  );
}
