import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/login';
import OAuth2 from './screens/autho2';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2" element={<OAuth2 />} />
      </Routes>
    </BrowserRouter>
  );
}
