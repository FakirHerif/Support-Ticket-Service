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
import AdminFormlist from "./components/AdminFormlist";
import AdminFormDetail from "./components/AdminFormDetail";
import PrivateRoute from './components/PrivateRoute';
import NotFound from "./components/NotFound";


function App() {

  return (
    <div className="App">

    <BrowserRouter>
      <AuthProvider>
        <FormProvider>
          <Header />
          <ToastContainer />

          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<LoginAdmin />} />
            <Route path="/basvuru-olustur" element={<FormSend />} />
            <Route path="/basvuru-basarili" element={<FormSuccess />} />
            <Route path="/basvuru-sorgula" element={<FormSearch />} />
            <Route path="/basvuru/:referenceID" element={<FormDetail />} />
            <Route path="/admin/basvuru-listesi" element={<PrivateRoute Component={AdminFormlist} />} />
            <Route path="/admin/basvuru/:referenceID" element={<PrivateRoute Component={AdminFormDetail} />} />
          </Routes>
        </FormProvider>
      </AuthProvider>  
    </BrowserRouter>

    </div>
  );
}

export default App;
