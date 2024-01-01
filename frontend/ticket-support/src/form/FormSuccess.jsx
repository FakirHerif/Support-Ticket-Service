import React from 'react'
import { useFormContext } from '../context/FormContext';
import '../style/form.css';
import Confetti from '../helper/Confetti';
import { useNavigate } from 'react-router-dom';

const FormSuccess = () => {

  const { formValues, referenceID } = useFormContext();
  const navigate = useNavigate()

    return (
        <div>
          {formValues && (
            <>
            <Confetti /> 
            <div className="sendform">
              <div className="formsend">
                <h1>Dear, <span>{formValues.firstName} {formValues.lastName}</span></h1>
                <hr />
                <h4>Thank you for your application &#x1F389;</h4>
                <br />
                <p>We've received your form. We'll respond as soon as possible. Please make sure to <u>save your reference number</u> to track the progress of your application.</p>
                <hr />
                <h4 style={{fontWeight: "bold"}}>Your Reference ID :</h4>
                <h5>{referenceID}</h5> 
                <hr />
                <h5>Click
                <p style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px', color: 'red', display: 'inline', whiteSpace: 'nowrap'}} onClick={() => navigate(`/basvuru/${referenceID}`)}>
                <u> here </u>
                </p> 
                to check the status of your application
                </h5>
              </div>
            </div>
            </>
          )}
        </div>
      );
    };

export default FormSuccess