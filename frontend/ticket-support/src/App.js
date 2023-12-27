import Home from "./components/Home";
import LoginUser from "./components/LoginUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Header from "./components/Header";
import LoginAdmin from "./components/LoginAdmin";
import { AuthProvider } from './components/AuthContext';
import FormSend from "./components/FormSend";
import { FormProvider } from './components/FormContext';
import FormSuccess from "./components/FormSuccess";
import FormSearch from "./components/FormSearch";
import FormDetail from "./components/FormDetail";

function App() {

  return (
    <div className="App">

    <BrowserRouter>
      <AuthProvider>
        <FormProvider>
          <Header />
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<LoginAdmin />} />
            <Route path="/basvuru-olustur" element={<FormSend />} />
            <Route path="/basvuru-basarili" element={<FormSuccess />} />
            <Route path="/basvuru-sorgula" element={<FormSearch />} />
            <Route path="/basvuru/:referenceID" element={<FormDetail />} />
          </Routes>
        </FormProvider>
      </AuthProvider>  
    </BrowserRouter>

    </div>
  );
}

export default App;
