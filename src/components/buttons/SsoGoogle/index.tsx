import React from 'react';
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import axios, { type AxiosHeaders } from 'axios';
import http from '../../../hook/useApi';

const SsoGoogle: React.FC = () => {
  const clientId =
    '210873135797-bs8d64fgqeqe66v5qmcee3vv1ag3dt98.apps.googleusercontent.com';

  const popupError = () => {
    toast.error('Google login failed, try again');
  };

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      popupError();
      return;
    }

    await http.post(
      'http://localhost:8000/login',
      {
        token: response.credential,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Example header
          // Include other headers as needed
        },
      }
    );
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(response) => handleSuccess(response)}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default SsoGoogle;
