import React from 'react'
import { useFormContext } from './FormContext';

const FormSuccess = () => {

  const { formValues, referenceID } = useFormContext();

    return (
        <div>
          {formValues && (
            <>
            <h1>BAŞVURUNUZ İÇİN TEŞEKKÜRLER.</h1>
              <p>Firstname: {formValues.firstName}</p>
              <p>Lastname: {formValues.lastName}</p>
              <p>referenceID: {referenceID}</p>
              <h2>Başvuru sonucunuzu takip etmek için referans numaranızı kaydetmeyi unutmayın.</h2>
              <h3>referans numaranız ile sonucu sorgulayabilirsiniz.</h3>

              <h2>BAŞVURUNUZUN DURUMUNU SORGULAMAK İÇİN TIKLAYINIZ.</h2>
            </>
          )}
        </div>
      );
    };

export default FormSuccess