import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { handleLogin } = useAuth();

    const navigate = useNavigate()

    const schema = Yup.object().shape({
        username: Yup.string()
          .required("Username is a required field")
          .min(3, "Username must be at least 3 characters"),
        password: Yup.string()
          .required("Password is a required field")
          .min(4, "Password must be at least 4 characters"),
      });

    const handleSubmit = async (values) => {
        try {
          const response = await axios.post('http://localhost:8080/api/login', values);
          
          const userRole = response.data.role;

          if (userRole === 'admin') {
            setIsAdmin(true);
            toast.success('Admin Login Successful!', { autoClose: 3000 });
            handleLogin(values.username, response.data.token, response.data.role); 
          } else {
            setIsAdmin(false);
            toast.error('Only admin users are allowed!', { autoClose: 3000 });
          }
        } catch (error) {
          console.error('Login Failed:', error.response.data);
          toast.error(`Login Failed: ${error.response.data.error}!`, { autoClose: 3000 });
        }
    };  

    if (isAdmin) {
        // If admin, redirect to admin panel or return necessary admin component
         navigate('/admin/basvuru-listesi');
      }

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span style={{color:'red'}}>Admin Login</span>
                <hr />
                <input
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="🔒 Enter username"
                  className="form-control inp_text"
                  id="username"
                />
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="🔑 Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <hr />
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginAdmin