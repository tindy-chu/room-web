import React from 'react';
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import system from '../../../utils/system';
import useApi from '../../../hook/useApi';

const SsoGoogle: React.FC = () => {
  const clientId =
    '210873135797-bs8d64fgqeqe66v5qmcee3vv1ag3dt98.apps.googleusercontent.com';
  const errorMsg = 'Google login failed, try again';

  const api = useApi({
    method: 'post',
    url: 'http://localhost:8000/login',
    isGlobalLoading: true,
  });

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      system.popupError(errorMsg);
      return;
    }

    await api.request({
      payload: {
        token1: response.credential,
      },
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(response) => handleSuccess(response)}
        onError={() => system.popupError(errorMsg)}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default SsoGoogle;
