import { FormProps } from './types';

const FormInput = ({
  children,
  type,
  label,
  value,
  name,
  placeholder,
  disabled,
  onChange,
}: FormProps) => {
  return (
    <>
      <label className="block text-left text-black text-sm font-medium mb-[6px]">
        {children}
      </label>
      <input
        className="shadow appearance-none border rounded-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full h-10 px-2 py-3"
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {/* {error && <p className="error">Input filed can't be empty!</p>} */}
    </>
  );
};

export default FormInput;
