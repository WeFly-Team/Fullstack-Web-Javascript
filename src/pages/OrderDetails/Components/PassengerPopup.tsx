import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  GenderType,
  OrderDetailContext,
  PassengerPopProp,
  orderDetailContextType,
} from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';
import { Passenger } from '../../ProfileLayout/types';

const PassengerPopup = ({
  passenger,
  className,
  isClose,
}: PassengerPopProp) => {
  const [isgender, setIsGender] = useState<GenderType | undefined>('Mr');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const genders = ['Mr', 'Mrs', 'Miss'];

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value);
  };
  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value);
  };
  const handleGenderChange = (selectedGender: GenderType) => {
    setIsGender(selectedGender);
  };
  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'passenger-popup') {
      isClose();
    }
    return;
  };

  const handleSave = () => {
    if (passenger) {
      const updatedPassenger: Passenger = {
        ...passenger,
        firstName: newFirstName,
        lastName: newLastName,
        gender: isgender,
      };
      savePassenger(updatedPassenger);
      isClose();
    }
  };

  const { savePassenger } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  useEffect(() => {
    if (passenger) {
      setNewFirstName(
        passenger.firstName === 'Please insert this passenger information!'
          ? ''
          : passenger.firstName
      );
      setNewLastName(passenger.lastName ? passenger.lastName : '');
      setIsGender(passenger.gender);
    }
  }, [passenger]);
  return (
    <div
      id="passenger-popup"
      className={`passenger-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      onClick={handleShowPopUp}
    >
      <div className="bg-white px-[74px] rounded-[4px] w-[46%] max-w-[664px] pb-4 min-h-[200px]">
        <div className="top-poup py-4 grid w-full items-center">
          <AiOutlineLeft
            className="absolute  text-2xl cursor-pointer"
            onClick={isClose}
          />
          <h1 className="font-bold text-3xl justify-self-center">
            Passenger Details
          </h1>
        </div>
        <hr />
        <p className="font-semibold mt-5 text-md">Passenger Info</p>
        <div className="w-full mt-3">
          <div>
            <FormInput
              type="text"
              children="First Name"
              label="First Name"
              name="firstname"
              value={newFirstName}
              onChange={handleFirstName}
              placeholder="Enter your First Name"
              className="w-full "
            />
          </div>
          <div>
            <FormInput
              type="text"
              children="Last Name"
              label="Last Name"
              name="lastName"
              value={newLastName}
              onChange={handleLastName}
              placeholder="Enter your Last Name"
              className="w-full "
            />
          </div>

          <p className="relative font-normal text-md text-gray-400 top-[-16px]">
            *Corresponds to ID card
          </p>

          <div className="radio-button flex justify-between pb-4">
            {genders.map((genderOption) => (
              <React.Fragment key={genderOption}>
                <div className="flex gap-x-2 text-md font-semibold">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={isgender === genderOption}
                    onChange={() =>
                      handleGenderChange(genderOption as GenderType)
                    }
                  />
                  {genderOption}
                </div>
              </React.Fragment>
            ))}
          </div>

          <Button
            disabled={false}
            className="w-full"
            variant="primary"
            size="md"
            id="save"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PassengerPopup;
