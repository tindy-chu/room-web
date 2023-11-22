import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import str from '../utils/str';

export default function useAuth() {
  const navigate = useNavigate();
  const isLogin = false;
  useEffect(() => {
    if (!isLogin) {
      const realm = 'myrealm';
      const url = `http://localhost:8080/realms/${realm}/protocol/openid-connect/auth`;
      const redirectUri = `${str.getEnv('BACKEND_URL')}${str.getEnv(
        'BACKEND_SSO_URI'
      )}`;
      console.log(redirectUri);
      const params = {
        scope: 'openid',
        response_type: 'code',
        state: 'state_parameter_passthrough_value',
        redirect_uri: redirectUri,
        client_id: str.getEnv('IAM_CLIENT_ID'),
      };

      window.location.href = `${url}?${new URLSearchParams(params)}`;

      navigate('/login');
    }
  }, []);

  return { isLogin };
}
