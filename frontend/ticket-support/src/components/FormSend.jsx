import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from './FormContext';
import '../components/basicstyle/form.css';

const FormSend = () => {

    const { updateFormValues, updateReferenceID } = useFormContext();
    const { user, axios } = useAuth();
    const navigate = useNavigate(); 

    const initialValues = {
        firstName: '',
        lastName: '',
        age: '',
        identificationNo: '',
        address: '',
        city: '',
        town: '',
        phone: '',
        title: '',
        content: '',
        attachments: null,
      };

      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Firstname is required'),
        lastName: Yup.string().required('Lastname is required'),
        age: Yup.number().required('Age is required').positive('Age must be a positive number').min(18, 'Age must be at least 18').max(99, 'Age must be at most 99'),
        identificationNo: Yup.number().typeError('Identity number must be a number').required('Identity number is required').positive('Identity number must be a positive number').integer('Identity number must be an integer').test('len', 'Identity number must be at least 11 digits', (val) => (val + '').length === 11),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        town: Yup.string().required('Town is required'),
        phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Enter your 10-digit phone number without zeros'),
        title: Yup.string().required('Complaint title is required'),
        content: Yup.string().required('Complaint content is required'),
      });
    
      const handleSubmit = async (values) => {
        try {
          if (user === "" || user === null) {
            values.informationsOwner = null;
          } else {
            values.informationsOwner = user;
          }
        
          let base64Data = null;

          if (values.attachments && values.attachments.length > 0) {
            const selectedFile = values.attachments[0];
            const reader = new FileReader();
    
            const readPromise = new Promise((resolve, reject) => {
              reader.onload = () => {
                base64Data = reader.result.split(',')[1];
                resolve();
              };
              reader.onerror = reject;
            });
    
            reader.readAsDataURL(selectedFile);
    
            await readPromise;
          }

        const jsonData = {
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
          identificationNo: values.identificationNo,
          address: values.address,
          city: values.city,
          town: values.town,
          phone: values.phone,
          title: values.title,
          content: values.content,
          informationsOwner: user,
          attachments: base64Data, // Assign base64 data to attachments field
        };

            const formData = new FormData();
            formData.append('jsonData', JSON.stringify(jsonData));

            const response = await axios.post('/informations', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
              toast.success('Form submitted successfully!', { autoClose: 3000 });
              updateFormValues(values);
              updateReferenceID(response.data.referenceID);
              navigate(`/basvuru-basarili/`);
            } catch (error) {
                console.error('Form submission failed:', error);
                console.log('Failed form values:', values);
                toast.error('Form submission failed!', { autoClose: 3000 });
              }
        };  
    
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
          <div className='sendform'>
            <div className='formsend'>
              <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                <span>Send Form</span>

                <div className="grid-container">
                  <div className="grid-item-name">
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="💬 Enter Firstname"
                    className="form-control inp_text"
                    />
                    <p className="error">{errors.firstName && touched.firstName && <div>{errors.firstName}</div>}</p>
                  </div>
                  <div className="grid-item-lastname">
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="💬 Enter Lastname"
                    className="form-control inp_text"
                    />
                    <p className="error">{errors.lastName && touched.lastName && <div>{errors.lastName}</div>}</p>
                  </div>
                </div>

                <div className="grid-containerTwo">
                  <div className="grid-item-identification">
                    <input
                    type="number"
                    id="identificationNo"
                    name="identificationNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.identificationNo}
                    placeholder="📝 Enter Identity No"
                    className="form-control inp_number"
                    />
                    <p className="error">{errors.identificationNo && touched.identificationNo && <div>{errors.identificationNo}</div>}</p>
                  </div>
                  <div className="grid-item-age">
                    <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    placeholder="📆 Enter Age"
                    className="form-control inp_number"
                    />
                    <p className="error">{errors.age && touched.age && <div>{errors.age}</div>}</p>
                  </div>
                </div>

                <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                placeholder="💒 Enter Address"
                className="form-control inp_text"
                />
                <p className="error">{errors.address && touched.address && <div>{errors.address}</div>}</p>

                <div className="grid-container">
                  <div className="grid-item-city">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      placeholder="🏴 Enter City"
                      className="form-control inp_text"
                    />
                    <p className="error">{errors.city && touched.city && <div>{errors.city}</div>}</p>
                  </div>
                  <div className="grid-item-town">
                    <input
                    type="text"
                    id="town"
                    name="town"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.town}
                    placeholder="🏲 Enter Town"
                    className="form-control inp_text"
                    />
                    <p className="error">{errors.town && touched.town && <div>{errors.town}</div>}</p>
                  </div>
                </div>
                
                <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="📞 Enter Phone Number"
                className="form-control inp_text"
                />
                <p className="error">{errors.phone && touched.phone && <div>{errors.phone}</div>}</p>
                
                <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="📌 Enter Form Title"
                className="form-control inp_text"
                />
                <p className="error">{errors.title && touched.title && <div>{errors.title}</div>}</p>

                <textarea
                type='text'
                id="content"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                placeholder="💭 Enter Form Content"
                className="form-control inp_text"
                ></textarea>
                <p className="error">{errors.content && touched.content && <div>{errors.content}</div>}</p>

                <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={(event) => {
                  const selectedFile = event.target.files[0]; // Get only the first selected file
                  if (event.target.files.length > 1) {
                    event.target.value = null; // Reset input value if more than one file is selected
                    setFieldValue('attachments', null); // Make Attachments value null
                  } else {
                    setFieldValue('attachments', selectedFile ? [selectedFile] : null); // If a single file is selected, add it to attachments, otherwise set it to null
                  }
                }}
                multiple
                className="form-control inp_file"
                />
                
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          )}
        </Formik>
      );
    };

export default FormSend