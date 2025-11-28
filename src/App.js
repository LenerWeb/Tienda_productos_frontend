import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Menu from './components/Menu';

// import './App.css'; predeterminado

function App() {
  return (
    
    <AuthProvider>
      <BrowserRouter>
        <Menu />
        <AppRoutes />   
        <div className="text-4xl bg-green-500 text-white p-4 rounded-xl">
  Tailwind funcionando ✔
</div>
  
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;