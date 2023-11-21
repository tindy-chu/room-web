import str from '../../utils/str';

import styles from './index.module.scss';

export default function OAuth2() {
  return (
    <div>
      <p className={styles.title}>OAuth2 {str.getEnv('VERSION')}</p>
    </div>
  );
}
