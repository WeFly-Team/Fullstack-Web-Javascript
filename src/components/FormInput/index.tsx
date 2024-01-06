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
      <div className='pb-4'>
        <label className="block text-left text-black text-sm font-semibold pb-3">
          {children}
        </label>
        <input
          className="shadow appearance-none border rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-blue transition w-[300px] h-11 px-4 py-3 mb-2"
          type={type}
          id={label}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {/* {error && <p className="error">Input filed can't be empty!</p>} */}
    </>
  );
};

export default FormInput;
