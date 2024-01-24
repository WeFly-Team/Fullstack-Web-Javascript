import React, { ChangeEvent, useState } from 'react';
import { OrderPopProp } from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';

const Orderpopup = ({
  name,
  phoneNumber,
  email,
  className,
  gender,
  isClose,
}: OrderPopProp) => {
  const [isgender, setIsGender] = useState<string>(gender || '');
  const [newemail, setEmail] = useState('');
  const [newusername, setusername] = useState('');
  const [newphonenumber, setphonenumber] = useState('');
  const genders = ['Mr', 'Mrs', 'Miss'];
  console.log(newemail, newusername, newphonenumber);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(setEmail);
  };
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
    console.log(setEmail);
  };
  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setphonenumber(e.target.value);
    console.log(setEmail);
  };
  const handleGenderChange = (selectedGender: string) => {
    setIsGender(selectedGender);
  };
  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'order-popup') {
      isClose();
    }
    return;
  };
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
        <form className="w-full mt-3">
          <div>
            <p className="font-normal text-md text-gray-400">
              This data will be used for E-Ticket delivery
            </p>
            <FormInput
              type="text"
              children="Full name"
              label="Full name"
              name={name}
              value={name}
              onChange={handleUserName}
              placeholder="Enter your full name"
              className="w-full "
            />
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
                    onChange={() => handleGenderChange(genderOption)}
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
            name={phoneNumber}
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter your phone number"
            className="w-full"
          />
          <FormInput
            type="email"
            children="Email Address"
            label="Email Address"
            name={email}
            value={email}
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
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Orderpopup;
