import { HeadingProps } from './types';
import '../../index.css';

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <>
      <h1
        className={`font-extrabold uppercase text-4xl mb-3 ${
          className ? className : ''
        }`}
      >
        {children}
      </h1>
    </>
  );
};

export default Heading;
