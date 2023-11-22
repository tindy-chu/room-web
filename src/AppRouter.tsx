import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/login';
import OAuth2 from './screens/oauth2';
import Home from './screens/home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2" element={<OAuth2 />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
