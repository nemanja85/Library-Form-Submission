import { ChangeEvent, FC, useContext } from 'react';
import { FormContext } from './Form';

type FormInputProps = {
  type: string;
  name?: string;
  placeHolder?: string;
  required?: boolean;
  value?: string
};

export const FormInput: FC<FormInputProps> = ({ type, name, placeHolder }) => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }

  const { formData, setFormData } = formContext;

  console.log('Data', name)

  let value = '';

  if (name?.includes(".")) {
    const [obj, property] = name!.split(".");
    value = formData[obj][property];
  } else {
    value = formData[name];
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    //@ts-expect-error TODO: finished later
    setFormData(prevData => ({
      ...prevData,
      [name!]: value
    }));
    console.log("Updated", value)
  };

  return (
    <input
      type={type}
      name={name}
      placeholder={placeHolder!}
      value={value}
      onChange={handleChange}
    />
  );
};
