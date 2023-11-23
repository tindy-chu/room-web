import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import str from '../utils/str';
import { useGlobalSpinnerStore } from '../components/globalSpinner';

export default function useAuth() {
  const globalSpinnerStore = useGlobalSpinnerStore();
  const isLogin = localStorage.getItem('accessToken') !== null;

  useEffect(() => {
    if (!isLogin) {
      const backendUrl = str.getEnv('BACKEND_URL');
      const backendSsoUri = str.getEnv('BACKEND_LOGIN_URI');
      const href = `${backendUrl}/${backendSsoUri}`;

      globalSpinnerStore.addId();
      window.location.href = href;
    }
  }, []);

  return { isLogin };
}
