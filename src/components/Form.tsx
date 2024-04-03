// Form.tsx
import { createContext, useContext, useState, FormEvent, ReactNode, FC, Dispatch, SetStateAction } from 'react';

type FormData = {
  [key: string]: string;
}

type FormHandler = (data: FormData) => void;

type FormContextProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  handleSubmit?: FormHandler;
};

type FormProps = {
  children: ReactNode;
  onSubmit: FormHandler;
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <FormContext.Provider value={{ formData, setFormData }}>
        <form onSubmit={handleSubmit}>{children}</form>
      </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  return context ? context : (() => { throw new Error('useFormContext must be used within a Form')});
};
