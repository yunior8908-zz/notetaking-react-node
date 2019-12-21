import React, {useEffect, useState} from 'react';

const useValidationField = rules => {
    const [validate, setValidate]  = useState({});

    const {value, required, pattern, type, length} = rules;
    useEffect(() => {
        if(required && required === true && value === ''){
            setValidate({
                isValid: false,
                validationMessage: 'Este campo es obligatorio.'
            });
        }
        else if(pattern && !value.match(pattern)){
            setValidate({
                isValid: false,
                validationMessage: 'no cumple.'
            });
        }else if(length && value.length > length){
            setValidate({
                isValid: false,
                validationMessage: `A excedido el número máximo de caracteres. <= ${length}.`
            });
        }
        else {
            setValidate({
                isValid: true,
                validationMessage: ''
            });
        }
    },[value]);
    return [validate.isValid, validate.validationMessage];
};



export default useValidationField;