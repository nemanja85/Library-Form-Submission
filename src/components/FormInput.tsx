// FormInput.tsx
import { ChangeEvent, FC } from 'react';
import { useFormContext } from './Form';

type FormInputProps = {
  name?: string;
  type: string;
  placeHolder?: string;
  required?: boolean;
  value?: string
};

export const FormInput: FC<FormInputProps> = ({ name,type, placeHolder }) => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <input
      type={type}
      name={name}
      placeholder={placeHolder}
      value={formData[name] || ''}
      onChange={handleChange}
    />
  );
};
