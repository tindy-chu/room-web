import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import str from '../utils/str';

export default function useAuth() {
  const isLogin = false;

  useEffect(() => {
    if (!isLogin) {
      const backendUrl = str.getEnv('BACKEND_URL');
      const backendSsoUri = str.getEnv('BACKEND_LOGIN_URI');
      const href = `${backendUrl}/${backendSsoUri}`;

      window.location.href = href;
    }
  }, []);

  return { isLogin };
}
