import React, { ChangeEvent, useState } from 'react';
import { PassengerPopProp } from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';

const PassengerPopup = ({
  name,
  className,
  id,
  gender,
  isShow,
  isClose,
}: PassengerPopProp) => {
  const [isgender, setIsGender] = useState<string>(gender || '');
  const [newusername, setusername] = useState('');
  const genders = ['Mr', 'Mrs', 'Miss'];

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
    console.log(newusername);
  };
  const handleGenderChange = (selectedGender: string) => {
    setIsGender(selectedGender);
  };
  if (!isShow) return null;
  return (
    <div
      id={id}
      className={`order-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
    >
      <div className="bg-white px-[74px] rounded-[4px] w-[46%] max-w-[664px] lg:h-[67%] md:h-[90%] min-h-[200px]">
        <div className="top-poup py-4 grid w-full items-center">
          <AiOutlineLeft
            className="absolute  text-2xl cursor-pointer"
            onClick={isClose}
          />
          <h1 className="font-bold text-3xl  justify-self-center">
            Passenger Details
          </h1>
        </div>
        <hr />
        <form className="w-full mt-3">
          <div>
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
                    onChange={() => handleGenderChange(genderOption)}
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
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PassengerPopup;
