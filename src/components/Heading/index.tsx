import { HeadingProps } from './types';
import '../../index.css';

const Heading = ({ children }: HeadingProps) => {
  return (
    <>
      <h1 className='font-extrabold uppercase text-4xl mb-3'>{children}</h1>
      <p className='text-neutral-07 font-medium mb-10'>Please enter your details.</p>
    </>
  )
}

export default Heading;