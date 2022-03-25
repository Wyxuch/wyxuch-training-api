import { Field, FormikErrors, FormikTouched, FormikValues } from 'formik';
import { FC } from 'react';
import './style.scss'

export interface InputProps {
    label: string;
    name: string;
    placeholder: string;
    validator?: (value: string) => string | undefined;
    errors?: FormikErrors<FormikValues>;
    touched?: FormikTouched<FormikValues>;
}

export const GenericInput: FC<InputProps> = ({name, label, placeholder, errors, touched, validator}) => {
    return (
        <section className='form-section'>
            <label htmlFor={name} >{label}</label>
            <Field id={name} name={name} placeholder={placeholder} validate={validator}/>
            {touched?.[name] && errors?.[name] && <p className='error'>{errors[name]}</p>}
        </section>
    )
}