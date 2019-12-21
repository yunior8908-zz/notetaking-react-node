import React, {useState, useEffect} from 'react';

export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('');

   useEffect(()=> {
      const handler = setTimeout(()=>{
          setValueDebounce(value);
      }, delay) ;

       return ()=>{
          clearTimeout(handler);
       }
   }, [value]);

   return valueDebounce;
};