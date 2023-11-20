import React from 'react';

const SsoGoogle: React.FC = () => {
  const handleSuccess = async () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = {
      scope: 'openid',
      access_type: 'offline',
      include_granted_scopes: 'true',
      response_type: 'code',
      state: 'state_parameter_passthrough_value',
      redirect_uri: 'http://localhost:8000/oauth2/sso/google',
      client_id:
        '210873135797-bs8d64fgqeqe66v5qmcee3vv1ag3dt98.apps.googleusercontent.com',
    };
    const href = `${url}?${new URLSearchParams(params)}`;
    console.log(href);
    window.location.href = `${url}?${new URLSearchParams(params)}`;
  };

  return <button onClick={handleSuccess} />;
};

export default SsoGoogle;
