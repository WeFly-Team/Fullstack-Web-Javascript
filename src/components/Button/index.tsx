import { ButtonProps } from './types';
import '../../index.css';

const Button = ({ children }: ButtonProps) => {
  return (
    <>
      <button className='text-base font-semibold text-white rounded-xl hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out bg-primary-brightBlue w-[300px] h-11 px-4 py-3'>{children}</button>
    </>
  )
}

export default Button;