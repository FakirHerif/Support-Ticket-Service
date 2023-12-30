import React, { useState, useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginUser = () => {

  const [isUser, setIsUser] = useState(false);
  const { handleLogin, user, axios } = useAuth();
  const navigate = useNavigate(); 
  const [captchaValue, setCaptchaValue] = useState(null);

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
          const response = await axios.post('/login', values);

          const userRole = response.data.role;

          if (userRole === 'user') {
            setIsUser(true);
            toast.success('Login Successful!', { autoClose: 3000 });
            handleLogin(values.username, response.data.token, response.data.role); 
          } else {
            setIsUser(false);
            toast.error('Only users are allowed! If you are an admin, use the admin login panel!', { autoClose: 3000 });
            navigate('/admin');
          }
        } catch (error) {
          console.error('Login Failed:', error.response.data);
          toast.error(`Login Failed: ${error.response.data.error}!`, { autoClose: 3000 });
        }
    };  

    useEffect(() => {
      if (isUser) {
        navigate('/');
      }
    }, [isUser, navigate]);
  
    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);

    const handleCaptchaChange = (value) => {
      setCaptchaValue(value);
    };

  return (
<>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
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
           {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                <hr />
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
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
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>
                 {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="🔑 Enter password"
                  className="form-control"
                />
                 {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit" className='btn btn-primary' disabled={!captchaValue}>Login</button>
                <hr />
                <div className='recaptcha'>
                  <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleCaptchaChange}
                  onError={(err) => console.error('reCAPTCHA Error:', err)}
                  hl="en"
                  />
                </div>
                <div className="text-center mt-3">
                <hr />
                  <p style={{fontSize: '14px'}}>
                    Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 underlin hover:text-red-700" style={{fontWeight: 'bold', fontSize: '16px'}}>
                    <br />
                    Sign up here
                  </Link>{" "}
                  </p>
                <hr />
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default LoginUser