import Home from "./layouts/Home";
import LoginUser from "./user/LoginUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./layouts/Register";
import Header from "./layouts/Header";
import LoginAdmin from "./admin/LoginAdmin";
import { AuthProvider } from './context/AuthContext';
import FormSend from "./form/FormSend";
import { FormProvider } from './context/FormContext';
import FormSuccess from "./form/FormSuccess";
import FormSearch from "./form/FormSearch";
import FormDetail from "./form/FormDetail";
import AdminFormlist from "./admin/AdminFormlist";
import AdminFormDetail from "./admin/AdminFormDetail";
import PrivateRoute from './route/PrivateRoute';
import NotFound from "./layouts/NotFound";
import UserFormlist from "./user/UserFormlist";


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
            <Route path="/user/basvuru-listesi" element={<UserFormlist />} />
          </Routes>
        </FormProvider>
      </AuthProvider>  
    </BrowserRouter>

    </div>
  );
}

export default App;
