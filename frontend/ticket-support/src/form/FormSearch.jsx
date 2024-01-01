import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

const FormSearch = () => {
    const { axios } = useAuth();
    const navigate = useNavigate(); 
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleSearch = async (values) => {
      const searchTerm = values.search;

        try {
          const response = await axios.get('/informations');
          const information = response.data.data;
      
          let foundInformation = information.find(info => info.referenceID === searchTerm);

          if (foundInformation) {
            navigate(`/basvuru/${foundInformation.referenceID}`, { state: { searchResult: foundInformation } });
          } else {
            navigate(`/basvuru/${foundInformation.referenceID}`);
          }
        } catch (error) {
          console.error('Error occurred while searching:', error);
          navigate(`/basvuru/${searchTerm}`);
        }
      };

      const initialValues = {
        search: '',
      };

      const validationSchema = Yup.object().shape({
        search: Yup.string().required('Reference ID required'),
      });

      const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
      };

      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSearch(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="search">
            <div className="form">
              <span>Search</span>
              <hr />
              <input
              type="text"
              id="search"
              name="search"
              onBlur={handleBlur}
              value={values.search}
              onChange={handleChange}
              placeholder="🔍  Enter Your Reference ID"
              className="form-control inp_text"
              />
              <p className="error">
                {errors.search && touched.search && <div>{errors.search}</div>}
              </p>
              <button type="submit" className='btn btn-primary' disabled={!captchaValue}>Search</button>
              <hr />
              <div className='recaptcha'>
                  <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleCaptchaChange}
                  onError={(err) => console.error('reCAPTCHA Error:', err)}
                  hl="en"
                  />
                </div>
            </div>
          </form>
          )}
        </Formik>
      );
    };

export default FormSearch