import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  GenderType,
  OrderDetailContext,
  OrderDetailOrderer,
  OrderPopProp,
  orderDetailContextType,
} from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';
import { extractNames } from '../../../utils/functions';

const Orderpopup = ({ className, isClose }: OrderPopProp) => {
  const { orderer, saveOrderer } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  const [isgender, setIsGender] = useState<GenderType>('Mr');
  const [newEmail, setNewEmail] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newOrderer, setNewOrderer] = useState<OrderDetailOrderer>();
  const genders = ['Mr', 'Mrs', 'Miss'];

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };
  const handleFullname = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFullname(e.target.value);
  };
  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPhoneNumber(e.target.value);
  };
  const handleGenderChange = (selectedGender: GenderType) => {
    setIsGender(selectedGender);
  };
  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'order-popup') {
      isClose();
    }
    return;
  };

  const handleSave = () => {
    if (newOrderer) {
      saveOrderer(newOrderer);
      isClose();
    }
  };

  useEffect(() => {
    if (orderer) {
      setNewOrderer(orderer);
      setNewFullname(orderer.fullName);
      setNewEmail(orderer.email);
      setNewPhoneNumber(orderer.phoneNumber ? orderer.phoneNumber : '');
      setIsGender(orderer.type);
    }
  }, [orderer]);

  useEffect(() => {
    if (orderer) {
      const { firstName, lastName } = extractNames(newFullname);
      setNewOrderer({
        email: newEmail,
        fullName: newFullname,
        phoneNumber: newPhoneNumber,
        firstName,
        lastName,
        type: isgender,
      });
    }
  }, [newEmail, newFullname, newPhoneNumber, isgender]);
  return (
    <div
      id="order-popup"
      className={`order-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      onClick={handleShowPopUp}
    >
      <div className="bg-white pb-[53px] px-[74px] rounded-lg w-[47%] max-w-[664px] h-fit min-h-[200px]">
        <div className="top-poup grid w-full items-center">
          <AiOutlineLeft
            className="absolute  text-2xl cursor-pointer"
            onClick={isClose}
          />
          <h1 className="font-bold text-3xl  justify-self-center py-[27px]">
            Order Detail
          </h1>
        </div>
        <hr />
        <div className="w-full mt-3">
          <div>
            <p className="font-normal text-md text-gray-400">
              This data will be used for E-Ticket delivery
            </p>
            {orderer && (
              <FormInput
                type="text"
                children="Full name"
                label="Full name"
                name="fullname"
                value={newFullname}
                onChange={handleFullname}
                placeholder="Enter your full name"
                className="w-full "
              />
            )}
            <p className="relative font-normal text-md text-gray-400 top-[-16px]">
              *Corresponds to ID card
            </p>
          </div>

          <div className="radio-button flex justify-between pb-4">
            {genders.map((genderOption) => (
              <React.Fragment key={genderOption}>
                <div className="flex gap-x-2 text-xl font-semibold">
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
          <FormInput
            type="number"
            children="Phone number"
            label="Phone number"
            name="phoneNumber"
            value={newPhoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter your phone number"
            className="w-full"
          />
          <FormInput
            type="email"
            children="Email Address"
            label="Email Address"
            name="email"
            value={newEmail}
            onChange={handleEmail}
            placeholder="Enter your email address"
            className="w-full"
          />

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

export default Orderpopup;
