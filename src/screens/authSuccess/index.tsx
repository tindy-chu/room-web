import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function AuthResult() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queries = new URLSearchParams(location.search);
    const accessToken = queries.get('access_token');
    const refreshToken = queries.get('refresh_token');

    if (!accessToken || !refreshToken) {
      toast.error('Ops! Occurring error. Please try again later.');
      navigate('/login');
      return;
    }

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    toast.success('Welcome');
    navigate('/');
  }, []);

  return <></>;
}
