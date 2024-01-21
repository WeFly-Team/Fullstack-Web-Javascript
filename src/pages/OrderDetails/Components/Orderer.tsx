import { CiMail } from 'react-icons/ci';
import { FaAngleRight } from 'react-icons/fa6';
import { ImPhone } from 'react-icons/im';
import { OrdererProp } from './types';

const Orderer = ({ name, phoneNumber, email, className }: OrdererProp) => {
  return (
    <div className={`border-neutral-05 border rounded-lg p-3 ${className}`}>
      <div className="flex items-center ">
        <h1 className="font-semibold">Mr. {name}</h1>
        <FaAngleRight className="text-sm ml-auto cursor-pointer" />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <ImPhone className="text-black text-2xl " />
        <p className="text-neutral-06">{phoneNumber}</p>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <CiMail className="text-black text-2xl" />
        <p className="text-neutral-06">{email}</p>
      </div>
    </div>
  );
};

export default Orderer;
