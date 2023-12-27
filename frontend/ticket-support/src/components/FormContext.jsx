import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(null);
  const [referenceID, setReferenceID] = useState(null);

  const updateFormValues = (values) => {
    setFormValues(values);
  };

  const updateReferenceID = (id) => {
    setReferenceID(id);
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        referenceID,
        updateFormValues,
        updateReferenceID,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
