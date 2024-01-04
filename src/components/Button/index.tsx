import { ButtonProps } from './types';
import '../../index.css';

const Button = ({ children }: ButtonProps) => {
  return (
    <>
      <button className='text-base font-semibold text-white rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out bg-primary-brightBlue w-80 h-11'>{children}</button>
    </>
  )
}

export default Button;