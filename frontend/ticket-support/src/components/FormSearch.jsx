import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FormSearch = () => {
    const { axios } = useAuth();

    const navigate = useNavigate(); 

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
          <form onSubmit={handleSubmit} className="sendform">
            <div className="formsend" style={{ maxWidth: '415px' }}>
              <span>Search</span>
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
              <button type="submit" className='btn btn-primary'>Search</button>
            </div>
          </form>
          )}
        </Formik>
      );
    };

export default FormSearch