import { useContext, useEffect, useState } from 'react';
import {
  OrderDetailContext,
  PassengerCardProp,
  orderDetailContextType,
} from './types';
import { GoPencil } from 'react-icons/go';
import { extractNames } from '../../../utils/functions';

const PassengerCard = ({
  className,
  selectPassenger,
  passenger,
  asOrderer,
  isShow,
}: PassengerCardProp) => {
  // state
  const [sameOrderer, setSameOrderer] = useState<boolean>(false);

  const { savePassenger, orderer } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  const handleOpenPopUp = () => {
    if (passenger) {
      isShow();
      selectPassenger(passenger);
    }
  };

  useEffect(() => {
    if (sameOrderer) {
      if (orderer) {
        console.log(orderer);

        const { firstName, lastName } = extractNames(orderer.fullName);
        savePassenger({
          id: passenger.id,
          dateOfBirth: orderer.dateOfBirth,
          firstName,
          lastName,
          type: 'adult',
          gender: orderer.type,
        });
      }
    }
  }, [sameOrderer, orderer]);

  return (
    <div className={`border-neutral-05 border rounded-lg ${className}`}>
      {asOrderer && (
        <div className="flex items-start p-3 justify-between border-b border-b-neutral-05">
          <p className="text-neutral-05">Same as orderer</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={sameOrderer}
              onChange={() => setSameOrderer(!sameOrderer)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          </label>
        </div>
      )}
      <div className="flex items-center justify-between p-3">
        <h1 className="font-semibold">
          {passenger.gender ? passenger.gender + '.' : ''} {passenger.firstName}{' '}
          {passenger.lastName}
        </h1>
        <GoPencil
          className="text-primary-blue text-lg cursor-pointer"
          onClick={handleOpenPopUp}
        />
      </div>
    </div>
  );
};

export default PassengerCard;
