import { useState } from "react";

const useForm = (callback, initialState ) => {
    const [ values, setValues ] = useState(initialState);

    const onChange = ( event ) => {
        setValues({
            ...values,
            [event.target.name] : event.target.value,
        });
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        setValues(initialState);
        callback();
    }

    return [values,onChange,onSubmit];
}

export default useForm;