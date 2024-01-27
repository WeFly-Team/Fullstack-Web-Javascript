import { CiMail } from 'react-icons/ci';
import { FaAngleRight } from 'react-icons/fa6';
import { ImPhone } from 'react-icons/im';
import {
  OrderDetailContext,
  OrdererProp,
  orderDetailContextType,
} from './types';
import { useContext } from 'react';

const Orderer = ({ className, isShow }: OrdererProp) => {
  const { orderer } = useContext(OrderDetailContext) as orderDetailContextType;
  return (
    <div className={`border-neutral-05 border rounded-lg p-3 ${className}`}>
      <div className="flex items-center ">
        <h1 className="font-semibold">
          {orderer && orderer.type}. {orderer && orderer.fullName}
        </h1>
        <FaAngleRight
          className="text-sm ml-auto cursor-pointer"
          onClick={isShow}
        />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <ImPhone className="text-black text-2xl " />
        <p className="text-neutral-06">
          {orderer && orderer.phoneNumber
            ? orderer.phoneNumber
            : 'Not filled yet'}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <CiMail className="text-black text-2xl" />
        <p className="text-neutral-06">{orderer && orderer.email}</p>
      </div>
    </div>
  );
};

export default Orderer;
