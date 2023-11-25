import Card from '../../components/card';
import { useGlobalSpinnerStore } from '../../components/globalSpinner';
import str from '../../utils/str';

import styles from './index.module.scss';
import Logo from '/logo.png';
export default function Login() {
  const globalSpinnerStore = useGlobalSpinnerStore();

  const handleClick = () => {
    const backendUrl = str.getEnv('BACKEND_URL');
    const backendSsoUri = str.getEnv('BACKEND_LOGIN_URI');
    const href = `${backendUrl}/${backendSsoUri}`;
    globalSpinnerStore.addId();
    window.location.href = href;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={Logo} />
        </div>
        <div className={styles.cardContainer}>
          <Card title="Sign Up or Log in">
            <div className="btn" onClick={handleClick}>
              <p className={styles.msg}>Let'sChat</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
