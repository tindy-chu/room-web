import React from 'react';
import str from '../../../utils/str';

import googleLogo from '../../../assets/google-logo.png';

import styles from './index.module.scss';

const SsoGoogle: React.FC = () => {
  const handleSuccess = async () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = `${str.getEnv('BACKEND_URL')}${str.getEnv(
      'BACKEND_SSO_URI'
    )}/google`;
    console.log(redirectUri);
    const params = {
      scope: 'openid',
      access_type: 'offline',
      include_granted_scopes: 'true',
      response_type: 'code',
      state: 'state_parameter_passthrough_value',
      redirect_uri: redirectUri,
      client_id: str.getEnv('GOOGLE_CREDENTIAL_CLIENT_ID'),
    };
    
    window.location.href = `${url}?${new URLSearchParams(params)}`;
  };

  return (
    <div className="btn" onClick={handleSuccess}>
      <img src={googleLogo} className={styles.logo} alt="google-logo" />
    </div>
  );
};

export default SsoGoogle;
