import './App.css';
import { FieldProvider } from './context/FieldContext';
import Index from './pages/Index';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <FieldProvider>
      <Router>
        <Routes>
          <Route path = '/login' element ={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path = '/' element = {<Index />} /> 
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </FieldProvider>
  );
}

export default App;
