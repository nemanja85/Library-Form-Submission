// Form.tsx
import { createContext, useState, FormEvent, ReactNode, FC, Dispatch, SetStateAction } from 'react';

type FormData<T> = {
  [key: string]: string | number | T;
};

type FormSubmitHandler<T> = (formData: T) => void;

type FormProps<T> = {
  initialValues: T;
  children: ReactNode;
  onSubmit: FormSubmitHandler<T>;
};

type FormContext<T> = {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  onSubmit: Dispatch<SetStateAction<FormSubmitHandler<T>>>;
};

export const FormContext = createContext<FormContext<T> | null>(null);

export const Form: FC<FormProps<T>> = ({ initialValues, onSubmit, children }) => {
  const [formData, setFormData] = useState<FormData<T>>(initialValues);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, onSubmit }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};
