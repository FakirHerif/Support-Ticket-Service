import React, { useEffect }from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Register = () => {

  const navigate = useNavigate()
  const { user } = useAuth();

    const schema = Yup.object().shape({
        username: Yup.string()
          .required('Username is a required field')
          .min(3, 'Username must be at least 3 characters'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .required('Password is a required field')
          .min(4, 'Password must be at least 4 characters'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Password confirmation is required'),
      });

    const handleSubmit = async (values) => {
        try {
          const response = await axios.post('http://localhost:8080/api/user', values);
          console.log('Registration Successful:', response.data);
          toast.success('Registration Successful!', { autoClose: 3000 });
          navigate('/login')
        } catch (error) {
          console.error('Registration Failed:', error.response.data);
          toast.error(`Registration Failed: ${error.response.data.details}!`, { autoClose: 3000 });
        }
    };

    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);

    return (
        <>
          <Formik
            validationSchema={schema}
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
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
              <div className="register">
                <div className="form">
                  <form noValidate onSubmit={handleSubmit}>
                    <span>Register</span>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="🔒 Enter username"
                      className="form-control inp_text"
                    />
                    <p className="error">
                      {errors.username && touched.username && errors.username}
                    </p>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="💌 Enter email"
                      className="form-control"
                    />
                    <p className="error">
                      {errors.email && touched.email && errors.email}
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
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="🔑 Confirm password"
                      className="form-control"
                    />
                    <p className="error">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </p>
                    <button type="submit" className='btn btn-primary'>Register</button>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </>
      );
    };

export default Register