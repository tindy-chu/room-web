import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import str from '../utils/str';

export default function useAuth() {
  // const navigate = useNavigate();
  const isLogin = false;
  useEffect(() => {
    if (!isLogin) {
      const iamUrl = str.getEnv('IAM_URL');
      const realm = str.getEnv('IAM_REALM');
      const backendUrl = str.getEnv('BACKEND_URL');
      const backendSsoUri = str.getEnv('BACKEND_SSO_URI');
      const url = `${iamUrl}/realms/${realm}/protocol/openid-connect/auth`;
      const redirectUri = `${backendUrl}${backendSsoUri}`;

      // console.log(redirectUri);
      const params = {
        scope: 'openid',
        response_type: 'code',
        state: 'state_parameter_passthrough_value',
        redirect_uri: redirectUri,
        client_id: str.getEnv('IAM_CLIENT_ID'),
      };

      const href = `${url}?${new URLSearchParams(params)}`;
      console.log(
        `*****START 374e55 ${Math.random().toString(32)} href*****\n`,
        JSON.stringify(href),
        '\n***** END ****'
      );
      // window.location.href = `${url}?${new URLSearchParams(params)}`;

      // navigate('/login');
    }
  }, []);

  return { isLogin };
}
