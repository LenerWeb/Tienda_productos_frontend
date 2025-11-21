import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import RoleRoute from './auth/RoleRoute';
import Menu from './components/Menu';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import logo from './logo.svg';
// import './App.css'; predeterminado

export default function App() {
  return (
    <><AuthProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    <div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
    </div></>
  );
}

