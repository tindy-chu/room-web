import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/login';
import AuthSuccess from './screens/authSuccess';
import Home from './screens/home';
import PageNotFound from './screens/pageNotFound';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
