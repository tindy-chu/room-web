import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const isLogin = localStorage.getItem('accessToken') !== null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);
}
