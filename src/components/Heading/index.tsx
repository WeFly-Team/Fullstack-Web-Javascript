import { HeadingProps } from './types';
import '../../index.css';

const Heading = ({ children }: HeadingProps) => {
  return (
    <>
      <h1 className='font-extrabold uppercase text-4xl mb-3'>{children}</h1>
    </>
  )
}

export default Heading;