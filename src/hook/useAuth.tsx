import { useEffect } from 'react';
// import str from '../utils/str';
// import { useGlobalSpinnerStore } from '../components/globalSpinner';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  // const globalSpinnerStore = useGlobalSpinnerStore();
  const isLogin = localStorage.getItem('accessToken') !== null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);
}
