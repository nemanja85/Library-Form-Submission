import { ChangeEvent, FC, useContext } from 'react';
import { FormContext } from './Form';

type FormInputProps = {
  type: string;
  name?: string;
  placeHolder?: string;
  required?: boolean;
  value?: string;
};

export const FormInput: FC<FormInputProps> = ({ type, name, placeHolder }) => {
  const Context = () => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('Form Context must be used within a FormProvider');
    }
    return context;
  };

  const { formData, setFormData } = Context();

  let value = '';

  if (name?.includes('.')) {
    const [obj, property] = name!.split('.');
    value = formData[obj][property];
  } else {
    value = formData[name];
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: updatedValue } = e.target;

    if (name?.includes('.')) {
      const [obj, property] = name.split('.');

      setFormData((prevData: any) => ({
        ...prevData,
        [obj]: {
          ...prevData[obj],
          [property]: updatedValue,
        },
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name!]: updatedValue,
      }));
    }
  };

  return <input type={type} name={name} placeholder={placeHolder!} value={value} onChange={handleChange} />;
};
