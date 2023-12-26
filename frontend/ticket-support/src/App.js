import Home from "./components/Home";
import LoginUser from "./components/LoginUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Header from "./components/Header";
import LoginAdmin from "./components/LoginAdmin";
import { AuthProvider } from './components/AuthContext';

function App() {

  return (
    <div className="App">

    <BrowserRouter>
      <AuthProvider>
        <Header />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<LoginAdmin />} />
        </Routes>
      </AuthProvider>  
    </BrowserRouter>

    </div>
  );
}

export default App;
